import useSWR from "swr";
import useKeepSWRDataLiveAsBlocksArrive from "../useKeepSWRDataLiveAsBlocksArrive";
import useContract from "../useContract";
import ABI from "../../artifacts/contracts/Presale.sol/Presale.json";
import { parseBalance } from "../../Util/util";

function getContribution(contract,account) {
    return async (_, address) => {
      const balance = await contract.checkContribution(account);
      return balance;
    };
  }
  
  function getTokens(contract,account) {
    return async (_, address) => {
      const balance = await contract.checkTokens(account);
      return balance;
    };
  }


export default function useSaleData(account,suspense = false) {
  const contractAddress = process.env.NEXT_PUBLIC_PREICO_CONTRACT;
  const contract = useContract(contractAddress, ABI.abi, true);

  const shouldFetch =
    typeof account === "string" &&
    !!contract;

  const resultContribution = useSWR(
    shouldFetch ? ["checkContribution", account] : null,
    getTokens(contract,account),
    {
      suspense,
    }
  );

  const resultTokens = useSWR(
    shouldFetch ? ["checkTokens", account] : null,
    getContribution(contract,account),
    {
      suspense,
    }
  );

  console.log(resultContribution)
  console.log(resultTokens)

  useKeepSWRDataLiveAsBlocksArrive(resultContribution.mutate);
  useKeepSWRDataLiveAsBlocksArrive(resultTokens.mutate);

  return { 
    contribution: parseBalance(resultContribution.data ?? 0,18,1),
    tokens: parseBalance(resultTokens.data ?? 0,18,1),
   };
}
