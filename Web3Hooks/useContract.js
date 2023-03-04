import { Contract } from "@ethersproject/contracts";
import { useWeb3React } from "@web3-react/core";
import { useMemo } from "react";
import { ethers } from "ethers";
import { chains } from "../data/chains";
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
        if (typeof window === 'undefined') {
          return null
        }

        let chain = chains[0]
        if (window?.localStorage) {
          chain = chains[0]
        }
        for (let i = 0; i < chains.length; i++) {

          if (window?.localStorage && window?.localStorage.getItem('chain') == chains[i].slug) {
            chain = chains[i]
          }
        }
        const RPC = chain.rpc;
        const provider = new ethers.providers.JsonRpcProvider(RPC);

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
