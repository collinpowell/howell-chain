import { Contract } from "@ethersproject/contracts";
import { useWeb3React } from "@web3-react/core";
import { useMemo } from "react";
import { ethers } from "ethers";
export default function useContract(address, ABI, signer) {
  const { library, account, chainId } = useWeb3React();
  return useMemo(() => {
    if (signer && (!address || !ABI || !library || !chainId)) {
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
        const RPC = "https://data-seed-prebsc-1-s3.binance.org:8545";
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
