import useSWR from "swr";
import useContract from "../useContract";
import ABI from "../../artifacts/contracts/StandardToken.sol/Standard.json";
import { parseBalance } from "../../Util/util";

function getName(contract) {
  return async (_) => {
    const result = await contract.name();
    return result;
  };
}

function getSymbol(contract) {
  return async (_) => {
    const result = await contract.symbol();
    return result;
  };
}
function getDecimals(contract) {
  return async (_) => {
    const result = await contract.decimals();
    return result;
  };
}

function totalSupply(contract) {
  return async (_) => {
    const result = await contract.totalSupply();
    return result;
  };
}
export default function useTokenData(contractAddress, suspense = false) {
  const contract = useContract(contractAddress, ABI.abi, false);

  const resultName = useSWR(
    [contractAddress, "name", ""],
    getName(contract),
    {
      suspense,
    }
  );
  const resultSymbol = useSWR(
    [contractAddress, "symbol", ""],
    getSymbol(contract),
    {
      suspense,
    }
  );

  const resultDecimals = useSWR(
    [contractAddress, "decimals", ""],
    getDecimals(contract),
    {
      suspense,
    }
  );

  const resultTotalSupply = useSWR(
    [contractAddress, "totalSupply", ""],
    totalSupply(contract),
    {
      suspense,
    }
  );

  return {
    name: resultName.data,
    symbol: resultSymbol.data,
    decimals: resultDecimals.data,
    totalSupply: parseBalance(resultTotalSupply.data ?? 0, resultDecimals?.data ? resultDecimals?.data : 18, 0)
  };
}
