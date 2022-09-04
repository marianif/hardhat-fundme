const { getNamedAccounts, ethers } = require("hardhat");

async function main() {
  const { deployer } = await getNamedAccounts();
  const fundMe = await ethers.getContract("FundMe", deployer);
  console.log("Withdrawing...");
  const txResponse = await fundMe.withdraw();
  const txReceipt = await txResponse.wait(1);
  console.log("Withdrew!");
  console.log(txReceipt);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
