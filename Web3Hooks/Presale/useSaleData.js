import useSWR from "swr";
import useKeepSWRDataLiveAsBlocksArrive from "../useKeepSWRDataLiveAsBlocksArrive";
import useContract from "../useContract";
import ABI from "../../artifacts/contracts/Presale.sol/Presale.json";
import { parseBalance } from "../../Util/util";

function getMinBuy(contract) {
  return async (_) => {
    const result = await contract.minPurchase();
    return result;
  };
}

function getMaxBuy(contract) {
  return async (_) => {
    const result = await contract.maxPurchase();
    return result;
  };
}
function getRate(contract) {
  return async (_) => {
    const result = await contract.getRate();
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
    const result = await contract.endICO();
    return result;
  };
}

function getWeiRaised(contract) {
  return async (_) => {
    const result = await contract.weiRaised();
    return result;
  };
}

function getAvaTokens(contract) {
  return async (_) => {
    const result = await contract.availableTokensICO();
    return result;
  };
}

export default function useSaleData(suspense = false) {
  const contractAddress = process.env.NEXT_PUBLIC_PREICO_CONTRACT;
  const contract = useContract(contractAddress, ABI.abi, false);

  const resultMinBuy = useSWR(
    [contractAddress, "minPurchase", ""],
    getMinBuy(contract),
    {
      suspense,
    }
  );
  const resultMaxBuy = useSWR(
    [contractAddress, "maxPurchase", ""],
    getMaxBuy(contract),
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
    [contractAddress, "weiRaised", ""],
    getWeiRaised(contract),
    {
      suspense,
    }
  );

  const resultRate = useSWR(
    [contractAddress, "getRate", ""],
    getRate(contract),
    {
      suspense,
    }
  );

  const resultAvaTokens = useSWR(
    [contractAddress, "availableTokensICO", ""],
    getAvaTokens(contract),
    {
      suspense,
    }
  );

  const resultEndICO = useSWR(
    [contractAddress, "endICO", ""],
    getEndICO(contract),
    {
      suspense,
    }
  );

  useKeepSWRDataLiveAsBlocksArrive(resultMinBuy.mutate);
  useKeepSWRDataLiveAsBlocksArrive(resultMaxBuy.mutate);
  useKeepSWRDataLiveAsBlocksArrive(resultSoftCap.mutate);
  useKeepSWRDataLiveAsBlocksArrive(resultHardCap.mutate);
  useKeepSWRDataLiveAsBlocksArrive(resultFundsRaised.mutate);
  useKeepSWRDataLiveAsBlocksArrive(resultRate.mutate);
  useKeepSWRDataLiveAsBlocksArrive(resultAvaTokens.mutate);

  return { 
    minBuy: parseBalance(resultMinBuy.data ?? 0,18,1),
    maxBuy: parseBalance(resultMaxBuy.data ?? 0,18,1),
    hardCap: resultHardCap.data ?? 0,
    softCap: resultSoftCap.data ?? 0,
    avaTokens: parseBalance(resultAvaTokens.data ?? 0,18,0),
    fundsRaised: parseBalance(resultFundsRaised.data ?? 0,18,1),
    rate: resultRate.data ?? 0,
    endTime: resultEndICO.data ?? 0
   };
}
