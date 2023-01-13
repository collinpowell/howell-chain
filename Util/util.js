import { formatUnits } from "@ethersproject/units";

export function shortenHex(hex, length = 4) {
  return `${hex.substring(0, length + 2)}…${hex.substring(
    hex.length - length
  )}`;
}

const ETHERSCAN_PREFIXES = {
  1: "",
  3: "ropsten.",
  4: "rinkeby.",
  5: "goerli.",
  56: "bscscan.com",
  42: "kovan.",
  97: "bscscantestnet.com",
};

export function formatEtherscanLink(
  type,
  data
) {
  switch (type) {
    case "Account": {
      const [chainId, address] = data;
      return chainId == 56 ? `https://bscscan.com/address/${address}`:`https://${ETHERSCAN_PREFIXES[chainId]}etherscan.io/address/${address}`;
    }
    case "Transaction": {
      const [chainId, hash] = data;
      return chainId == 56 ? `https://bscscan.com/address/${hash}`:`https://${ETHERSCAN_PREFIXES[chainId]}etherscan.io/tx/${hash}`;
    }
  }
}

export const parseBalance = (
  value,
  decimals = 18,
  decimalsToDisplay = 3
) => parseFloat(formatUnits(value, decimals)).toFixed(decimalsToDisplay);
