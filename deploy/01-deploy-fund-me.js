const { network } = require("hardhat");
const {
  networkConfig,
  developmentChains,
} = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");

module.exports = async (hre) => {
  const { deployments, getNamedAccounts } = hre;
  const { deploy, get, log } = deployments;
  const chainId = network.config.chainId;

  const { deployer } = await getNamedAccounts();

  // Switch from a local dev chain to a testnet (or mainnet)
  let priceFeedAddress;

  if (developmentChains.includes(network.name)) {
    const ethUsdPriceFeed = await get("MockV3Aggregator");
    priceFeedAddress = ethUsdPriceFeed.address;
  } else {
    // if chain X then use address A
    // if chain Y then use address B
    priceFeedAddress = networkConfig[chainId]["ethToUsdPriceFeed"];
  }

  // what happens when we change chains?
  // we want to use a mock enviroment when testing with localhost or hardhat

  const args = [priceFeedAddress];
  const fundMe = await deploy("FundMe", {
    from: deployer,
    args, // price feed addresses here
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });

  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    // verify contract on etherscan
    await verify(fundMe.address, args);
  }
  log(
    `Contract deployed successfully on the ${network.name.toUpperCase()} network!`
  );
  log("------------------------------------");
};

module.exports.tags = ["all", "fundme"];
