import BSC from "../UIKit/assets/Chain/ic-bsc.png";
import MATIC from "../UIKit/assets/Chain/ic-matic.png";
import ETH from "../UIKit/assets/Chain/ic-eth.svg";
import ALVEY from "../UIKit/assets/Chain/ic-alvey.svg";
import ARBITRUM from "../UIKit/assets/Chain/ic-arbitrum.svg";
import AVAX from "../UIKit/assets/Chain/ic-avax.svg";
import CRONOS from "../UIKit/assets/Chain/ic-cronos.svg";
import FANTOM from "../UIKit/assets/Chain/ic-fantom.svg";
import DOGE from "../UIKit/assets/Chain/ic_doge.png";
import LOOP from "../UIKit/assets/Chain/loop.png";

export const chains = [
    {
        chainId: 56,
        slug: 'BSC',
        chainName: 'BNB Smart Chain',
        tokenDeployFee:'0.15', // 45
        poolCreationFee: '0.5',// 150
        poolFee:'2', // percent of raised funds
        chainLogo: BSC.src,
        rpc: 'https://bsc-dataseed.binance.org',
        default: true,
        symbol:'BNB',
        main: true,
        explorer: 'https://bscscan.com',
        decimals: 18
    },
    {
        chainId: 97,
        slug: 'BSC-test',
        chainName: 'BNB Smart Chain',
        tokenDeployFee:'0.01',
        poolCreationFee: '0.01',
        poolFee:'2', // percent of raised funds
        chainLogo: BSC.src,
        symbol:'tBNB',
        rpc: 'https://data-seed-prebsc-1-s1.binance.org:8545',
        explorer: 'https://testnet.bscscan.com',
        decimals: 18
    },
    {
        chainId: 80001,
        slug: 'Mumbai',
        chainName: 'Matic (Mumbai-Test)',
        tokenDeployFee:'0.01',
        poolCreationFee: '0.01',
        poolFee:'2',  // percent of raised funds
        chainLogo: MATIC.src,
        symbol:'tMATIC',
        rpc: 'https://matic-mumbai.chainstacklabs.com',
        explorer: 'https://mumbai.polygonscan.com',
        decimals: 18
    },
    {
        chainId: 137,
        slug: 'Matic',
        chainName: 'Matic (Polygon)',
        tokenDeployFee:'25',
        poolCreationFee: '100',
        poolFee:'2', // percent of raised funds
        main:true,
        chainLogo: MATIC.src,
        symbol:'MATIC',
        rpc: 'https://polygon-mainnet.infura.io/v3/59db66a6f450458293081aa9fbb8c526', //'https://polygon-rpc.com',
        explorer: 'https://polygonscan.com',
        decimals: 18
    },
    {
        chainId: 1,
        slug: 'ETH',
        chainName: 'Ethereum Mainnet',
        tokenDeployFee:'0.008',
        poolCreationFee: '0.1',
        poolFee:'2', // percent of raised funds
        main:true,
        chainLogo: ETH.src,
        symbol:'ETH',
        rpc: 'https://mainnet.infura.io/v3/59db66a6f450458293081aa9fbb8c526',
        explorer: 'https://etherscan.io',
        decimals: 18
    },
    {
        chainId: 15551,
        slug: 'LOOP',
        chainName: 'Loop Network',
        tokenDeployFee:'500',
        poolCreationFee: '1500',
        poolFee:'2', // percent of raised funds
        main:true,
        chainLogo: LOOP.src,
        symbol:'$LOOP',
        rpc: 'https://api.mainnetloop.com',
        explorer: 'https://explorer.mainnetloop.com',
        decimals: 18
    },
    {
        chainId: 25,
        slug: 'cro',
        chainName: 'Cronos',
        tokenDeployFee:'450',
        poolCreationFee: '1000',
        poolFee:'2', // percent of raised funds
        main:true,
        chainLogo: CRONOS.src,
        symbol:'CRO',
        rpc: 'https://evm.cronos.org',
        explorer: 'https://cronoscan.com',
        decimals: 18
    },
    {
        chainId: 250,
        slug: 'Fantom',
        chainName: 'Fantom Opera',
        tokenDeployFee:'50',
        poolCreationFee: '100',
        poolFee:'2', // percent of raised funds
        main:true,
        chainLogo: FANTOM.src,
        symbol:'FTM',
        rpc: 'https://rpcapi.fantom.network',
        explorer: 'https://ftmscan.com',
        decimals: 18
    },

]