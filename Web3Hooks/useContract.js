import { Contract } from "@ethersproject/contracts";
import { useWeb3React } from "@web3-react/core";
import { useMemo } from "react";
import { ethers } from "ethers";
import { useChainData } from "../contexts/chain";
export default function useContract(address, ABI, signer) {
  const { library, account } = useWeb3React();
  const {chain} = useChainData()
  return useMemo(() => {
    if (signer && (!address || !ABI || !library)) {
      return null;
    } else {
      if (signer) {
        try {
          return new Contract(address, ABI, library.getSigner(account));
        } catch (error) {
          console.error("Failed To Get Contract", error);

          return null;
        }
      } else {
        const provider = new ethers.providers.JsonRpcProvider(chain?.rpc);
        try {
          return new Contract(address, ABI, provider);

        } catch (error) {
          console.error("Failed To Get Contract", error);

          return null;
        }
      }
    }
  }, [address, ABI, library, account]);
}
