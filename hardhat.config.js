require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }

  },
  etherscan: {
    apiKey: {
      bsc:  process.env.BSC_KEY,
      bscTestnet: process.env.BSC_KEY,
      polygonMumbai: process.env.POLYGON_KEY,
      polygon: process.env.POLYGON_KEY
    }
  },
  networks: {

    bsctestnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      gasPrice: 20000000000,
      accounts: [
        process.env.PRIVATE_KEY,
      ],
    },
    bscmainnet: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      gasPrice: 20000000000,
      accounts: [
        process.env.PRIVATE_KEY,
      ],
    },
    polygonTestnet: {
      url: "https://matic-mumbai.chainstacklabs.com",
      chainId: 80001,
      gasPrice: 20000000000,
      accounts: [
        process.env.PRIVATE_KEY,
      ],
    },
    polygonMainnet: {
      url: "https://polygon-rpc.com",
      chainId: 137,
      gasPrice: 20000000000,
      accounts: [
        process.env.PRIVATE_KEY,
      ],
    } 
  }
};

//npx hardhat run --network bscmainnet deploy/token.js
//npx hardhat run --network bsctestnet deploy/token.js

//npx hardhat run --network bsctestnet deploy/presale.js

//npx hardhat run --network bsctestnet verify/presale.js

