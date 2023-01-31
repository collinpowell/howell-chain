const hre = require("hardhat");

async function main() {
    await hre.run("verify:verify", {
          contract:"contracts/SheerCoin.sol:Sheer",
          address: '0x1c86738cAbcd4E37910468119ddF78817dC2125d',
     });
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

