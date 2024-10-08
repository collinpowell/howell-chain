import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";

export const RPC_URLS = {
  1: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
  4: `https://rinkeby.infura.io/v3/${process.env.INFURA_KEY}`,
  56: 'https://bsc-dataseed.binance.org',
  97: 'https://data-seed-prebsc-1-s1.binance.org:8545',
}

const supported = [1, 4, 56, 97];

export const injected = new InjectedConnector({
  supportedChainIds: supported,
});


const walletconnect = new WalletConnectConnector({
  rpc: RPC_URLS,
  supportedChainIds: supported,
  infuraId:'c5ab0a30cdc547dcb40d82373a34acee',
  bridge: "https://bridge.walletconnect.org",
  qrcode: true
});

const walletlink = new WalletLinkConnector({
  urls: RPC_URLS,
  appName: "Howrea",
  supportedChainIds: supported
});

export const connectors = {
  injected: injected,
  walletConnect: walletconnect,
  coinbaseWallet: walletlink
};