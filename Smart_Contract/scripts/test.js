const { Network, Alchemy } = require('alchemy-sdk');
const dotenv  = require("dotenv"); 

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

// get all the sent transactions from given address
const sentTransactions = alchemy.core.getAssetTransfers({
  fromBlock: "0x0",
  fromAddress: "0x994b342dd87fc825f66e51ffa3ef71ad818b6893",
  category: ["erc721", "external", "erc20"],
}).then(console.log);