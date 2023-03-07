import useSWR from "swr";
import useKeepSWRDataLiveAsBlocksArrive from "../useKeepSWRDataLiveAsBlocksArrive";
import useContract from "../useContract";
import ABI from "../../artifacts/contracts/StandardICO.sol/Presale.json"
import { parseBalance } from "../../Util/util";

function getContribution(contract, account) {
  return async (_, address) => {
    const balance = await contract.getContribution(account);
    return balance;
  };
}

function getReward(contract, account) {
  return async (_, address) => {
    const balance = await contract.getReward(account);
    return balance;
  };
}


export default function useSaleData(account,contractAddress, suspense = false) {
  const contract = useContract(contractAddress, ABI.abi, true);

  const shouldFetch =
    typeof account === "string" &&
    !!contract;

  const resultContribution = useSWR(
    shouldFetch ? ["getContribution", account] : null,
    getContribution(contract, account),
    {
      suspense,
    }
  );

  const resultReward = useSWR(
    shouldFetch ? ["getReward", account] : null,
    getReward(contract, account),
    {
      suspense,
    }
  );

  useKeepSWRDataLiveAsBlocksArrive(resultContribution.mutate);
  useKeepSWRDataLiveAsBlocksArrive(resultReward.mutate);

  return {
    contribution: parseBalance(resultContribution.data ?? 0, 18, 5),
    reward: parseBalance(resultReward.data ?? 0, 18, 5),
  };
}
