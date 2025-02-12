// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// Import thư viện từ OpenZeppelin để hỗ trợ các chức năng ERC721 (NFT)
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol"; // Dùng để debug trong môi trường Hardhat

contract NFTMarketplace is ERC721URIStorage {
    // Sử dụng Counters từ OpenZeppelin để quản lý bộ đếm
    using Counters for Counters.Counter;
    // Đếm tổng số NFT được tạo
    Counters.Counter private _tokenIds;
    // Đếm số NFT đã bán
    Counters.Counter private _itemSold;
 
    uint256 public listingPrice = 0.0015 ether;  // Phí đăng bán NFT
    address payable owner; // Chủ sở hữu marketplace
    // Struct để lưu thông tin của NFT trên marketplace
    mapping(uint256 => MarketItem) private idMarketItem;

    // Mapping lưu thông tin NFT theo tokenId
    struct MarketItem {
        uint256 tokenId; 
        address payable seller; // Người bán NFT
        address payable owner; // Chủ sở hữu hiện tại
        uint256 price; // Giá bán NFT
        bool sold; // Trạng thái đã bán hay chưa
    }
// Sự kiện thông báo khi NFT được tạo và đăng bán trên marketplace
    event idMarketItemCreated(
        uint256 indexed tokenId,
        address seller,
        address owner, // ✅ Sửa uint256 -> address
        uint256 price,
        bool sold
    );

    // Modifier để giới hạn chỉ chủ sở hữu mới có quyền thực hiện một số hành động
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can change the listing price");
        _;
    }

    // Constructor: Khởi tạo marketplace và đặt chủ sở hữu là người triển khai hợp đồng
    constructor() ERC721("NFT Metaverse Token", "MYNFT") {
        owner = payable(msg.sender);
    }

    // Cập nhật phí đăng bán NFT (chỉ chủ sở hữu marketplace có thể thực hiện)
    function updateListingPrice(uint256 _listingPrice) public payable onlyOwner {
        listingPrice = _listingPrice;
    }
    // Trả về phí đăng bán hiện tại
    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    // Tạo và mint một NFT mới
    function createToken(string memory tokenURI, uint256 price) public payable returns (uint256) {
        _tokenIds.increment(); // Tăng ID cho NFT mới
        uint256 newTokenId = _tokenIds.current(); // Lấy ID mới

        _mint(msg.sender, newTokenId); // Mint NFT cho người gọi hàm
        _setTokenURI(newTokenId, tokenURI); // Gán metadata (URI) cho NFT

        createMarketItem(newTokenId, price); // Đăng bán NFT trên marketplace
        return newTokenId;
    }

    // Tạo một item mới trên marketplace
    function createMarketItem(uint256 tokenId, uint256 price) private {
        require(price > 0, "Price must be at least 1 wei"); // Giá bán phải lớn hơn 0
        require(msg.value == listingPrice, "Price must be equal to listing price"); // Người bán phải trả phí đăng bán
        
        // Lưu thông tin NFT vào mapping
        idMarketItem[tokenId] = MarketItem(
            tokenId,
            payable(msg.sender), // Người bán
            payable(address(this)), // NFT được giữ bởi marketplace
            price,
            false  // Chưa bán
        );

        _transfer(msg.sender, address(this), tokenId);
    // Kích hoạt sự kiện khi NFT được niêm yết trên marketplace
        emit idMarketItemCreated(tokenId, msg.sender, address(this), price, false); // ✅ Đã sửa lỗi
    }

    // Người bán có thể bán lại NFT trên marketplace
    function reSellToken(uint256 tokenId, uint256 price) public payable {
        require(idMarketItem[tokenId].owner == msg.sender, "Only owner can perform this operation");  // Kiểm tra quyền sở hữu NFT
        require(msg.value == listingPrice, "Price must be equal to listing price"); // Phí đăng bán phải được thanh toán
    // Cập nhật thông tin NFT trong marketplace
        idMarketItem[tokenId].sold = false;
        idMarketItem[tokenId].price = price;
        idMarketItem[tokenId].seller = payable(msg.sender);
        idMarketItem[tokenId].owner = payable(address(this));

        _itemSold.increment(); // Tăng bộ đếm NFT đã bán
    }

    // Mua NFT từ marketplace
    function createMarketSale(uint256 tokenId) public payable {
        uint256 price = idMarketItem[tokenId].price;
        require(msg.value == price, "Please submit the asking price in order to complete the purchase");  // Kiểm tra số tiền thanh toán

        idMarketItem[tokenId].owner = payable(msg.sender); // Cập nhật chủ sở hữu NFT
        idMarketItem[tokenId].sold = true; // Đánh dấu là đã bán

        _itemSold.increment(); // Tăng số lượng NFT đã bán

        payable(owner).transfer(listingPrice); // Chuyển phí marketplace cho chủ sở hữu
        payable(idMarketItem[tokenId].seller).transfer(msg.value); // Thanh toán cho người bán
    }

    // Lấy danh sách NFT chưa bán trên marketplace
    function fetchMarketItem() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _tokenIds.current(); // Tổng số NFT đã tạo
        uint256 unsoldItemCount = _tokenIds.current() - _itemSold.current(); // Số NFT chưa bán
        uint256 currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](unsoldItemCount); // Mảng lưu NFT chưa bán

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idMarketItem[i + 1].sold == false) { // Lọc NFT chưa bán
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items; // Trả về danh sách NFT chưa bán
    }

   // Lấy danh sách NFT thuộc quyền sở hữu của người dùng hiện tại
    function fetchMyNFT() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

    // Đếm số NFT thuộc quyền sở hữu của người gọi hàm
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idMarketItem[i + 1].owner == msg.sender) {
                itemCount += 1;
            }
        }

        // Tạo mảng chứa NFT của người dùng
        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idMarketItem[i + 1].owner == msg.sender) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items; // Trả về danh sách NFT của người dùng
    }
}
