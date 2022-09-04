const { getNamedAccounts, ethers } = require("hardhat");

async function main() {
  const { deployer } = await getNamedAccounts();
  const fundMe = await ethers.getContract("FundMe", deployer);
  console.log("Funding contract ...");
  const txResponse = await fundMe.fund({
    value: ethers.utils.parseEther("0.1"),
  });
  const txReceipt = await txResponse.wait(1);
  console.log("Funded!");
  console.log(txReceipt);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
