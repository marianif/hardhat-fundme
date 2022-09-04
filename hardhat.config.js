require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-gas-reporter");
require("hardhat-deploy");
require("dotenv").config();
require("solidity-coverage");

/** @type import('hardhat/config').HardhatUserConfig */

const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "";
const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;
const GOERLI_CHAIN_ID = parseInt(process.env.GOERLI_CHAIN_ID);
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.7",
      },
      {
        version: "0.6.6",
      },
    ],
  },
  defaultNetwork: "hardhat",
  networks: {
    goerli: {
      url: GOERLI_RPC_URL,
      chainId: GOERLI_CHAIN_ID,
      accounts: [PRIVATE_KEY],
      blockConfirmations: 6,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    outputFile: "gas-report.txt",
    noColors: true,
    coinmarketcap: COINMARKETCAP_API_KEY,
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
      1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
      5: 0,
    },
    // feeCollector: {
    //   default: 1, // here this will by default take the second account as feeCollector (so in the test this will be a different account than the deployer)
    //   1: "0xa5610E1f289DbDe94F3428A9df22E8B518f65751", // on the mainnet the feeCollector could be a multi sig
    //   4: "0xa250ac77360d4e837a13628bC828a2aDf7BabfB3", // on rinkeby it could be another account
    // },
  },
};
