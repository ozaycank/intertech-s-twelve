import { ethers } from "hardhat";

async function main() {
    const Ledger = await ethers.getContractFactory("Ledger");

    console.log("Deploying ledger contract...")
    const ledger = await Ledger.deploy();
    await ledger.deployed();

    console.log(`Ledger contract deployed to address: ${ledger.address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });