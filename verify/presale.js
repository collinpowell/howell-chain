const hre = require("hardhat");

async function main() {
    await hre.run("verify:verify", {
        contract: "contracts/Presale.sol:Presale",
        address: '0x94eFB5B2C7130988b526922de3A19a5a0C58b5d3',
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

