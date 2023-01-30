const hre = require("hardhat");

async function main() {
    await hre.run("verify:verify", {
        contract: "contracts/Presale.sol:Presale",
        address: '0x39494DFedFb85f9De7338CB0aE6364732F889bA4',
        constructorArguments: [
            process.env.FUND_ADDRESS, process.env.DEPLOYED_TOKEN
        ],
    });
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

