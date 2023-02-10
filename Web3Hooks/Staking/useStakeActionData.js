import useSWR from "swr";
import useKeepSWRDataLiveAsBlocksArrive from "../useKeepSWRDataLiveAsBlocksArrive";
import useContract from "../useContract";
import ABI from "../../artifacts/contracts/SHRFStaking.sol/Staking.json";
import { parseBalance } from "../../Util/util";

function getRecord(contract,account) {
    return async (_,) => {
      const balance = await contract.addressMap(account);
      return balance;
    };
  }
  
  function getEarning(contract,account) {
    return async (_,) => {
      const balance = await contract.presentEarning(account);
      return balance;
    };
  }


export default function useStakeActionData(account,suspense = false) {
  const contractAddress = process.env.NEXT_PUBLIC_STAKING;
  const contract = useContract(contractAddress, ABI.abi, true);

  const shouldFetch =
    typeof account === "string" &&
    !!contract;

  const resultEarning = useSWR(
    shouldFetch ? ["presentEarning", account] : null,
    getEarning(contract,account),
    {
      suspense,
    }
  );

  const resultRecord = useSWR(
    shouldFetch ? ["addressMap", account] : null,
    getRecord(contract,account),
    {
      suspense,
    }
  );

  useKeepSWRDataLiveAsBlocksArrive(resultEarning.mutate);
  useKeepSWRDataLiveAsBlocksArrive(resultRecord.mutate);

  return { 
    earning: parseBalance(resultEarning.data ?? 0,18,7),
    rawEarn: resultEarning.data ?? 0,
    records: resultRecord.data ?? null,
    rawStakeAmt: resultEarning?.data?.stakeAmt,
    stakeAmt: parseBalance(resultEarning?.data?.stakeAmt ?? 0,18,7)
   };
}
