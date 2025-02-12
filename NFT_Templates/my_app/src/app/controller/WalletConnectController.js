import { createThirdwebClient } from "thirdweb"; // Import hàm tạo client từ thư viện thirdweb
import { inAppWallet, createWallet } from "thirdweb/wallets";  // Import các hàm tạo ví thirdweb
import dotenv from "dotenv"; // Import dotenv để quản lý biến môi trường
// Load các biến môi trường từ file `.env`
dotenv.config();

class WalletConnectController {
  constructor() {
    this.clientId = process.env.CLIENT_SECRET_KEY; // Lấy clientId từ biến môi trường
     
    if (!this.clientId) {
      console.error("❌ CLIENT_SECRET_KEY is missing in .env file"); // Cảnh báo nếu thiếu clientId
    }

    this.client = null; // Biến lưu trữ client Thirdweb
    this.wallets = []; // Danh sách ví có thể kết nối

    this.setClient(); // Gọi hàm khởi tạo client
    this.setWallets(); // Gọi hàm khởi tạo danh sách ví
  } 

  setClient() {
    this.client = createThirdwebClient({ clientId: this.clientId });  // Tạo Thirdweb client với clientId
  }

  setWallets() {
    this.wallets = [
    // Ví tích hợp trong ứng dụng hỗ trợ nhiều phương thức xác thực
      inAppWallet({
        auth: {
          options: [
            "google",
            "discord",
            "telegram",
            "farcaster",
            "email",
            "x",
            "passkey",
            "phone",
          ],
        },
      }),
      createWallet("io.metamask"), // Ví MetaMask
      createWallet("com.coinbase.wallet"), // Ví Coinbase Wallet
      createWallet("me.rainbow"), // Ví Rainbow
      createWallet("io.rabby"), // Ví Rabby
      createWallet("io.zerion.wallet"), // Ví Zerion
    ];
  }

  getClient() {
    // Trả về client Thirdweb hiện tại
    return this.client;
  }

  getWallets() {
     // Trả về danh sách các ví có thể kết nối
    return this.wallets;
  }

  connect = (req, res) => {
    // Kiểm tra nếu clientId chưa được thiết lập
    if (!this.clientId) {
      console.error("❌ CLIENT_SECRET_KEY is missing in .env file");
      return res.status(500).json({ error: "Server Error: Missing CLIENT_SECRET_KEY" });
    }

    return res.json({
      clientId: this.clientId, // Trả về clientId
      wallets: this.wallets, // Trả về danh sách ví có thể kết nối
    });
  };
}

export default new WalletConnectController();
