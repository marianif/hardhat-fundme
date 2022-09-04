const { run } = require("hardhat");

const verify = async (contractAddress, args) => {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
    console.log("Contract verified successfully on etherscan!");
  } catch (error) {
    if (error.message.toLowerCase().includes("already verified")) {
      console.warn("Contract has already been verified!");
    } else {
      console.warn(error);
    }
  }
};

module.exports = { verify };
