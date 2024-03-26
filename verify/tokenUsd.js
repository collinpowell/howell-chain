const hre = require("hardhat");

async function main() {
    await hre.run("verify:verify", {
        contract: "contracts/USDCoin.sol:USDCoin",
        address: '0x02B2538770234e3CBac919aC29896D1a23Cf816A',
        constructorArguments: [
           '0xB66c138ED3484A11EeF7F040352D0b1D7F5466E8'
        ],
    });
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

