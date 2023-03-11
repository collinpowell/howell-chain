import useSWR from "swr";
import useKeepSWRDataLiveAsBlocksArrive from "../useKeepSWRDataLiveAsBlocksArrive";
import useContract from "../useContract";
import ABI from "../../artifacts/contracts/StandardICO.sol/Presale.json";
import { parseBalance } from "../../Util/util";

function getCurrentRate(contract) {
  return async (_) => {
    const result = await contract.getCurrentRate();
    return result;
  };
}

function getOwner(contract) {
  return async (_) => {
    const result = await contract.owner();
    return result;
  };
}


function getRefund(contract) {
  return async (_) => {
    const result = await contract.getRefund();
    return result;
  };
}

function getTotalRefund(contract) {
  return async (_) => {
    const result = await contract.getTotalRefund();
    return result;
  };
}

function getStatus(contract) {
  return async (_) => {
    const result = await contract.getStatus();
    return result;
  };
}

function getToken(contract) {
  return async (_) => {
    const result = await contract.getToken();
    return result;
  };
}

function getPresaleTokens(contract) {
  return async (_) => {
    const result = await contract.getPresaleTokens();
    return result;
  };
}

function getContributors(contract) {
  return async (_) => {
    const result = await contract.getContributors();
    return result;
  };
}

function getAffiliatePercentage(contract) {
  return async (_) => {
    const result = await contract.getAffiliatePercentage();
    return result;
  };
}

function getAnticipatedRate(contract) {
  return async (_) => {
    const result = await contract.getAnticipatedRate();
    return result;
  };
}

function getReferrerCount(contract) {
  return async (_) => {
    const result = await contract.getReferrerCount();
    return result;
  };
}

function getCurrentRewards(contract) {
  return async (_) => {
    const result = await contract.getCurrentRewards();
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

  const contract = useContract(contractAddress, ABI.abi, false);

  const resultRate = useSWR(
    [contractAddress, "getCurrentRate", ""],
    getCurrentRate(contract),
    {
      suspense,
    }
  );

  const resultRefund = useSWR(
    [contractAddress, "getRefund", ""],
    getRefund(contract),
    {
      suspense,
    }
  );

  const resultTotalRefund = useSWR(
    [contractAddress, "getTotalRefund", ""],
    getTotalRefund(contract),
    {
      suspense,
    }
  );

  const resultStatus = useSWR(
    [contractAddress, "getStatus", ""],
    getStatus(contract),
    {
      suspense,
    }
  );

  const resultToken = useSWR(
    [contractAddress, "getToken", ""],
    getToken(contract),
    {
      suspense,
    }
  );

  const resultPresaleTokens = useSWR(
    [contractAddress, "getPresaleTokens", ""],
    getPresaleTokens(contract),
    {
      suspense,
    }
  );

  const resultContributors = useSWR(
    [contractAddress, "getContributors", ""],
    getContributors(contract),
    {
      suspense,
    }
  );

  const resultAffiliatePercentage = useSWR(
    [contractAddress, "getAffiliatePercentage", ""],
    getAffiliatePercentage(contract),
    {
      suspense,
    }
  );

  const resultAnticipatedRate = useSWR(
    [contractAddress, "getAnticipatedRate", ""],
    getAnticipatedRate(contract),
    {
      suspense,
    }
  );

  const resultReferrerCount = useSWR(
    [contractAddress, "getReferrerCount", ""],
    getReferrerCount(contract),
    {
      suspense,
    }
  );

  const resultCurrentRewards = useSWR(
    [contractAddress, "getCurrentRewards", ""],
    getCurrentRewards(contract),
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

  const resultFundsRaised = useSWR(
    [contractAddress, "getRaised", ""],
    getWeiRaised(contract),
    {
      suspense,
    }
  );

  const resultOwner = useSWR(
    [contractAddress, "owner", ""],
    getOwner(contract),
    {
      suspense,
    }
  );


  useKeepSWRDataLiveAsBlocksArrive(resultRate.mutate);
  useKeepSWRDataLiveAsBlocksArrive(resultRefund.mutate);
  useKeepSWRDataLiveAsBlocksArrive(resultTotalRefund.mutate);
  useKeepSWRDataLiveAsBlocksArrive(resultStatus.mutate);
  useKeepSWRDataLiveAsBlocksArrive(resultPresaleTokens.mutate);
  useKeepSWRDataLiveAsBlocksArrive(resultContributors.mutate);
  useKeepSWRDataLiveAsBlocksArrive(resultAffiliatePercentage.mutate);
  useKeepSWRDataLiveAsBlocksArrive(resultAnticipatedRate.mutate);
  useKeepSWRDataLiveAsBlocksArrive(resultReferrerCount.mutate);
  useKeepSWRDataLiveAsBlocksArrive(resultCurrentRewards.mutate);
  useKeepSWRDataLiveAsBlocksArrive(resultHardCap.mutate);
  useKeepSWRDataLiveAsBlocksArrive(resultSoftCap.mutate);
  useKeepSWRDataLiveAsBlocksArrive(resultStartICO.mutate);
  useKeepSWRDataLiveAsBlocksArrive(resultEndICO.mutate);
  useKeepSWRDataLiveAsBlocksArrive(resultFundsRaised.mutate);

  return {
    currentRate: parseBalance(resultRate.data ?? 0, 0, 0),
    refund: resultRefund.data ?? false,
    totalRefunds: parseBalance(resultTotalRefund.data ?? 0, 0, 0),
    status: parseBalance(resultStatus.data ?? 0, 0, 0),
    tokenAddress: resultToken.data ?? 0,
    owner: resultOwner.data ?? 0,
    icoSaleTokens: parseBalance(resultPresaleTokens.data ?? 0, 0, 0),
    totalContributors: parseBalance(resultContributors.data ?? 0, 0, 0),
    affiliatePercent: parseBalance(resultAffiliatePercentage.data ?? 0, 0, 0),
    anticipatedRate: parseBalance(resultAnticipatedRate.data ?? 0, 0, 0),
    totalReferrers: parseBalance(resultReferrerCount.data ?? 0, 0, 0),
    currentRewards: parseBalance(resultCurrentRewards.data ?? 0, 18, 5),
    hardCap: parseBalance(resultHardCap.data ?? 0, 0, 0),
    softCap: parseBalance(resultSoftCap.data ?? 0, 18, 2),
    startTime: parseBalance(resultStartICO.data ?? 0, 0, 0),
    endTime: parseBalance(resultEndICO.data ?? 0, 0, 0),
    fundsRaised: parseBalance(resultFundsRaised.data ?? 0, 18, 5),
  };
}
