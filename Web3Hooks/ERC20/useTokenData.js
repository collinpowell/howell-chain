import useSWR from "swr";
import useKeepSWRDataLiveAsBlocksArrive from "../useKeepSWRDataLiveAsBlocksArrive";
import useContract from "../useContract";
import ABI from "../../artifacts/contracts/StandardToken.sol/Standard.json";

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

export default function useTokenData(contractAddress,suspense = false) {
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

  useKeepSWRDataLiveAsBlocksArrive(resultName.mutate);
  useKeepSWRDataLiveAsBlocksArrive(resultSymbol.mutate);
  useKeepSWRDataLiveAsBlocksArrive(resultDecimals.mutate);

  return {
    name: resultName.data,
    symbol: resultSymbol.data,
    decimals: resultDecimals.data
  };
}
