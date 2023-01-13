// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
require("dotenv").config();

async function main() {

  const Presale = await hre.ethers.getContractFactory("Presale");
  const presale = await Presale.deploy(process.env.FUND_ADDRESS,process.env.DEPLOYED_TOKEN)

  await presale.deployed();

  console.log(
    `Pre-ICO Contract deployed to ${presale.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
