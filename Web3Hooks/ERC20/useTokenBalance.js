import useSWR from "swr";
import useKeepSWRDataLiveAsBlocksArrive from "../useKeepSWRDataLiveAsBlocksArrive";
import useContract from "../useContract";
import ABI from '../../artifacts/contracts/SheerCoin.sol/Sheer.json'
import { useWeb3React } from "@web3-react/core";
import { parseBalance } from "../../Util/util";

function balance(contract, account,chainId) {
  return async (_, ) => {
    const env = process.env.NODE_ENV
    if (env == "development" && chainId == 97) {
      // do something
      // do something
      const balance = await contract.balanceOf(account);
      return balance;
    }
    else if (env == "production" && chainId == 56) {
      // do something
      const balance = await contract.balanceOf(account);
      return balance;
    }
    return null

  };
}

export default function useTokenBalance(
  suspense = false
) {
  const { account, chainId } = useWeb3React();
  const tokenAddress = process.env.NEXT_PUBLIC_DEPLOYED_TOKEN
  const contract = useContract(tokenAddress, ABI.abi, true);

  const shouldFetch =
    typeof account === "string" &&
    typeof tokenAddress === "string" &&
    !!contract;

  const resultTokens = useSWR(
    shouldFetch ? ["balanceOf", account] : null,
    balance(contract, account,chainId),
    {
      suspense,
    }
  );

  useKeepSWRDataLiveAsBlocksArrive(resultTokens.mutate);

  return {
    symbol: 'SHRF',
    tokens: parseBalance(resultTokens.data ?? 0, 18, 1)
  };
}
