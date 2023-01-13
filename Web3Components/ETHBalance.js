import { useWeb3React } from "@web3-react/core";
import useETHBalance from "../Web3Hooks/useETHBalance";
import { parseBalance } from "../Util/util";

const ETHBalance = () => {
  const { account } = useWeb3React();
  const { data } = useETHBalance(account);

  return <span>{parseBalance(data ?? 0)} BNB</span>;
};

export default ETHBalance;
