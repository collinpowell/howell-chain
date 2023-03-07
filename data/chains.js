import BSC from "../UIKit/assets/Chain/ic-bsc.png";
import MATIC from "../UIKit/assets/Chain/ic-matic.png";

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
        rpc: 'https://polygon-rpc.com',
        explorer: 'https://polygonscan.com',
        decimals: 18
    },

]