const hre = require("hardhat");

async function main() {
    await hre.run("verify:verify", {
        contract: "contracts/Presale.sol:Presale",
        address: '0xBd3297529350C69ccaFE6e54B5f0be54Db1D18f0',
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

