import { createThirdwebClient } from "thirdweb";
import { inAppWallet, createWallet } from "thirdweb/wallets";
import dotenv from "dotenv";

dotenv.config();

class WalletConnectController {
  constructor() {
    this.clientId = process.env.CLIENT_SECRET_KEY;
    
    if (!this.clientId) {
      console.error("❌ CLIENT_SECRET_KEY is missing in .env file");
    }

    this.client = null;
    this.wallets = [];

    this.setClient();
    this.setWallets();
  }

  setClient() {
    this.client = createThirdwebClient({ clientId: this.clientId });
  }

  setWallets() {
    this.wallets = [
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
      createWallet("io.metamask"),
      createWallet("com.coinbase.wallet"),
      createWallet("me.rainbow"),
      createWallet("io.rabby"),
      createWallet("io.zerion.wallet"),
    ];
  }

  getClient() {
    return this.client;
  }

  getWallets() {
    return this.wallets;
  }

  // 🔥 Fix lỗi `undefined this.clientId`
  connect = (req, res) => {
    if (!this.clientId) {
      console.error("❌ CLIENT_SECRET_KEY is missing in .env file");
      return res.status(500).json({ error: "Server Error: Missing CLIENT_SECRET_KEY" });
    }

    return res.json({
      clientId: this.clientId,
      wallets: this.wallets,
    });
  };
}

export default new WalletConnectController();
