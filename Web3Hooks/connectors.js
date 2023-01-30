import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";

export const RPC_URLS = {
  1: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
  4: `https://rinkeby.infura.io/v3/${process.env.INFURA_KEY}`,
  97: 'https://data-seed-prebsc-1-s1.binance.org:8545',
  56: 'https://bsc-dataseed.binance.org'
}

export const injected = new InjectedConnector({
  supportedChainIds: [1,, 4, 56, 97],
});


const walletconnect = new WalletConnectConnector({
  //infuraId: process.env.INFURA_KEY,
  rpc: { 1: RPC_URLS[1], 4: RPC_URLS[4], 97: RPC_URLS[97], 56: RPC_URLS[56] },
  //chainId:97,
  bridge: "https://bridge.walletconnect.org",
  qrcode: true
});

const walletlink = new WalletLinkConnector({
  urls: { 1: RPC_URLS[1], 4: RPC_URLS[4], 97: RPC_URLS[97], 56: RPC_URLS[56] },
  appName: "Howrea"
});

export const connectors = {
  injected: injected,
  walletConnect: walletconnect,
  coinbaseWallet: walletlink
};