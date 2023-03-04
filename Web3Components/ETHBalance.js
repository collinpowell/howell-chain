import useETHBalance from "../Web3Hooks/useETHBalance";
import { parseBalance } from "../Util/util";

const ETHBalance = ({symbol}) => {
  const { data } = useETHBalance();

  return <span>{parseBalance(data ?? 0)}&nbsp;{symbol}</span>;
};

export default ETHBalance;
