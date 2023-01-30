import { useWeb3React } from "@web3-react/core";
import useSWR from "swr";
import useKeepSWRDataLiveAsBlocksArrive from "./useKeepSWRDataLiveAsBlocksArrive";

function getETHBalance(library,account) {
  return async () => {
    const balance = await library.getBalance(account,'latest');
    return balance;
  };
}

export default function useETHBalance(address, suspense = false) {
  const { library, account } = useWeb3React();

  const shouldFetch = typeof account === "string" && !!library;

  const result = useSWR(
    shouldFetch ? ["getBalance", account,'latest'] : null,
    getETHBalance(library,account),
    {
      suspense,
    }
  );
  useKeepSWRDataLiveAsBlocksArrive(result.mutate);

  return result;
}