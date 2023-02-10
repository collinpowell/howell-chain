const hre = require("hardhat");

async function main() {
    await hre.run("verify:verify", {
        contract: "contracts/SHRFStaking.sol:Staking",
        address: '0x610a4A4FE3B6c5Ab6a21F029A1cA7F2fC0cF1A67',
        constructorArguments: [
           '0xaa294C0BB72156C976baFD78B5F3cf06487091B0'
        ],
    });
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

