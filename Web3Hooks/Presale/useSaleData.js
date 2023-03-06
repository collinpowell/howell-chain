import useSWR from "swr";
import useKeepSWRDataLiveAsBlocksArrive from "../useKeepSWRDataLiveAsBlocksArrive";
import useContract from "../useContract";
import ABI from "../../artifacts/contracts/StandardICO.sol/Presale.json";
import { parseBalance } from "../../Util/util";

function getRate(contract) {
  return async (_) => {
    const result = await contract.getCurrentRate();
    return result;
  };
}

function getHardCap(contract) {
  return async (_) => {
    const result = await contract.getHardCap();
    return result;
  };
}
function getSoftCap(contract) {
  return async (_) => {
    const result = await contract.getSoftCap();
    return result;
  };
}

function getEndICO(contract) {
  return async (_) => {
    const result = await contract.getEndTime();
    return result;
  };
}

function getStartICO(contract) {
  return async (_) => {
    const result = await contract.getStartTime();
    return result;
  };
}

function getWeiRaised(contract) {
  return async (_) => {
    const result = await contract.getRaised();
    return result;
  };
}

export default function useSaleData(contractAddress, suspense = false) {
  //console.log(address)
  const contract = useContract(contractAddress, ABI.abi, false);
  
  const resultRate = useSWR(
    [contractAddress, "getCurrentRate", ""],
    getRate(contract),
    {
      suspense,
    }
  );

  const resultHardCap = useSWR(
    [contractAddress, "getHardCap", ""],
    getHardCap(contract),
    {
      suspense,
    }
  );

  const resultSoftCap = useSWR(
    [contractAddress, "getSoftCap", ""],
    getSoftCap(contract),
    {
      suspense,
    }
  );

  const resultFundsRaised = useSWR(
    [contractAddress, "getRaised", ""],
    getWeiRaised(contract),
    {
      suspense,
    }
  );

  const resultEndICO = useSWR(
    [contractAddress, "getEndTime", ""],
    getEndICO(contract),
    {
      suspense,
    }
  );

  const resultStartICO = useSWR(
    [contractAddress, "getStartTime", ""],
    getStartICO(contract),
    {
      suspense,
    }
  );

  useKeepSWRDataLiveAsBlocksArrive(resultStartICO.mutate);
  useKeepSWRDataLiveAsBlocksArrive(resultEndICO.mutate);
  useKeepSWRDataLiveAsBlocksArrive(resultSoftCap.mutate);
  useKeepSWRDataLiveAsBlocksArrive(resultHardCap.mutate);
  useKeepSWRDataLiveAsBlocksArrive(resultFundsRaised.mutate);
  useKeepSWRDataLiveAsBlocksArrive(resultRate.mutate);

  return {
    hardCap: resultHardCap.data ?? 0,
    softCap: resultSoftCap.data ?? 0,
    fundsRaised: parseBalance(resultFundsRaised.data ?? 0, 18, 1),
    rate: resultRate.data ?? 0,
    endTime: resultEndICO.data ?? 0,
    startTime: resultEndICO.data ?? 0
  };
}
