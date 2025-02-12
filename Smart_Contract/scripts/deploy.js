const hre = require("hardhat");

async function main() {
  // Lấy contract factory
  const NFTMarketplace = await hre.ethers.getContractFactory("NFTMarketplace");

  // Deploy contract
  const nftMarketplace = await NFTMarketplace.deploy();

  // Đợi contract được deploy xong
  await nftMarketplace.waitForDeployment();

  // Lấy địa chỉ contract
  const contractAddress = await nftMarketplace.getAddress();
  console.log("Contract deployed at:", contractAddress);
  console.log("Transaction confirmed!");
}

// Gọi hàm main() và bắt lỗi
main().catch((error) => {
  console.error(error);
  process.exit(1);
});
