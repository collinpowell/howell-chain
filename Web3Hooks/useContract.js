import { Contract } from "@ethersproject/contracts";
import { useWeb3React } from "@web3-react/core";
import { useMemo } from "react";
import { ethers } from "ethers";
export default function useContract(address, ABI, signer) {
  const { library, account } = useWeb3React();
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
        const RPC =process.env.NEXT_PUBLIC_RPC;
        console.log(RPC)
        const provider = new ethers.providers.JsonRpcProvider(RPC);
        console.log(provider)

        try {
        console.log('worked')
          
          return new Contract(address, ABI, provider);
          
        } catch (error) {
          console.error("Failed To Get Contract", error);

          return null;
        }
      }
    }
  }, [address, ABI, library, account]);
}
