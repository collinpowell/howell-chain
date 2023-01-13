import useSWR from "swr";
import useKeepSWRDataLiveAsBlocksArrive from "../useKeepSWRDataLiveAsBlocksArrive";
import useContract from "../useContract";
import ABI from '../../artifacts/contracts/SheerCoin.sol/Sheer.json'

function symbolX(contract) {
  return async (_, address) => {
    const balance = await contract.symbol();
    return balance;
  };
}

export default function useTokenBalance(
  suspense = false
) {
  const tokenAddress = process.env.NEXT_PUBLIC_DEPLOYED_TOKEN
  const contract = useContract(tokenAddress,ABI.abi,false);
  
  const shouldFetch =
    typeof address === "string" &&
    typeof tokenAddress === "string" &&
    !!contract;

  const result = useSWR(
    [tokenAddress,'symbol',''],
    symbolX(contract),
    {
      suspense,
    }
  );

  useKeepSWRDataLiveAsBlocksArrive(result.mutate);

  return result.data;
}
