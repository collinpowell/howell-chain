import useSWR from "swr";
import useKeepSWRDataLiveAsBlocksArrive from "../useKeepSWRDataLiveAsBlocksArrive";
import useContract from "../useContract";
import ABI from "../../artifacts/contracts/SHRFStaking.sol/Staking.json";
import { parseBalance } from "../../Util/util";

function getTotalWithdraws(contract) {
  return async (_) => {
    const result = await contract.totalWithdrawals();
    return result;
  };
}

function getTotalStaked(contract) {
  return async (_) => {
    const result = await contract.totalStakedAmount();
    return result;
  };
}
function getTotalInterest(contract) {
  return async (_) => {
    const result = await contract.totalAccumulatedInterest();
    return result;
  };
}

function getStakingToken(contract) {
  return async (_) => {
    const result = await contract.stakingToken();
    return result;
  };
}
function getStakingAddresses(contract) {
  return async (_) => {
    const result = await contract.stakingAddresses();
    return result;
  };
}

function getAPR(contract) {
  return async (_) => {
    const result = await contract.apr();
    return result;
  };
}

export default function useStakeData(suspense = false) {
  const contractAddress = process.env.NEXT_PUBLIC_STAKING;
  const contract = useContract(contractAddress, ABI.abi, false);

  const resultTotalWithdraws = useSWR(
    [contractAddress, "totalWithdrawals", ""],
    getTotalWithdraws(contract),
    {
      suspense,
    }
  );
  const resultTotalInterest = useSWR(
    [contractAddress, "totalAccumulatedInterest", ""],
    getTotalInterest(contract),
    {
      suspense,
    }
  );

  const resultTotalStaked = useSWR(
    [contractAddress, "totalStakedAmount", ""],
    getTotalStaked(contract),
    {
      suspense,
    }
  );

  const resultStakingToken = useSWR(
    [contractAddress, "stakingToken", ""],
    getStakingToken(contract),
    {
      suspense,
    }
  );
  const resultAddresses = useSWR(
    [contractAddress, "stakingAddresses", ""],
    getStakingAddresses(contract),
    {
      suspense,
    }
  );

  const resultAPR = useSWR(
    [contractAddress, "apr", ""],
    getAPR(contract),
    {
      suspense,
    }
  );

  useKeepSWRDataLiveAsBlocksArrive(resultTotalWithdraws.mutate);
  useKeepSWRDataLiveAsBlocksArrive(resultTotalStaked.mutate);
  useKeepSWRDataLiveAsBlocksArrive(resultStakingToken.mutate);
  useKeepSWRDataLiveAsBlocksArrive(resultAddresses.mutate);
  useKeepSWRDataLiveAsBlocksArrive(resultAPR.mutate);
  useKeepSWRDataLiveAsBlocksArrive(resultTotalInterest.mutate);

  return {
    cumWithdraws: parseBalance(resultTotalWithdraws.data ?? 0, 18, 3),
    cumStake: parseBalance(resultTotalStaked.data ?? 0, 18, 1),
    tokenAddress: resultStakingToken.data ?? 0,
    numAddresses: parseBalance(resultAddresses.data ?? 0, 0, 0),
    apr: parseBalance(resultAPR.data ?? 0, 0, 0),
    totalReward: parseBalance(resultTotalInterest.data ?? 0, 18, 3)
  };
}
