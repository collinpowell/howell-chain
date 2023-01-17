const hre = require("hardhat");

async function main() {
    await hre.run("verify:verify", {
          contract:"contracts/SheerCoin.sol:Sheer",
          address: '0x3B1255226cF80f1e239b4f33DfaE738955c4b125',
     });
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

