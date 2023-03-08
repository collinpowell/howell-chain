const hre = require("hardhat");

async function main() {
    await hre.run("verify:verify", {
        contract: "contracts/StandardICO.sol:Presale",
        address: '0x91f1a3d5dE34aCA33F41D4501CAd08A51626289E',
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

