import useETHBalance from "../Web3Hooks/useETHBalance";
import { parseBalance } from "../Util/util";

const ETHBalance = () => {
  const { data } = useETHBalance();

  return <span>{parseBalance(data ?? 0)} BNB</span>;
};

export default ETHBalance;
