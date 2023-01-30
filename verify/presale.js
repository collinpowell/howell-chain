const hre = require("hardhat");

async function main() {
    await hre.run("verify:verify", {
          contract:"contracts/Presale.sol:Presale",
          address: '0x570B943cD8fDB2CD1D14CB3e172aB3991EE38F4a',
     });
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

