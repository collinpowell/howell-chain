/* eslint-disable react-hooks/exhaustive-deps */
import { useState, createContext, useContext, useEffect } from "react";
import { useRouter } from "next/router";
export const ChainContext = createContext();
import { chains } from "../data/chains";
import { useWeb3React } from "@web3-react/core";

// gives selected chain

export default function ChainProvider({ children }) {
    const router = useRouter()
    const [chain, setChain] = useState();
    const [changeable, setChangeable] = useState(true);
    const { chainId, account, library } = useWeb3React()
    useEffect(() => {
        const localChain = localStorage.getItem('chain')
        const routerChain = router.query.chain;
        console.log(localChain)
        console.log(routerChain)
        // is site for first time
        if (routerChain && routerChain != undefined && routerChain != 'undefined') {
            setChainData(getParticularChain(routerChain))
            localStorage.setItem('chain', chain?.slug)
            changeChain(getParticularChain(routerChain))
        } else if (localChain && localChain != undefined && localChain != 'undefined') {
            setChainData(getParticularChain(localChain))
            changeChain(getParticularChain(localChain))
        } else {
            setChainData(getDefaultChain())
            localStorage.setItem('chain', chain?.slug)
            changeChain(chain)
        }
    }, [router.query.chain, chainId, account])

    const setChainData = (value) => {
        setChain(value);
    };

    const getChangeable = () => {
        if (!changeable)
            return changeable
        switch (router.pathname) {
            case "/pools/[slug]":
                return false
            default:
                return true
        }
    };

    const getParticularChain = (slug) => {
        for (let i = 0; i < chains.length; i++) {
            if (slug && slug == chains[i].slug) {
                return chains[i]
            }
        }
    }
    const getDefaultChain = () => {
        for (let i = 0; i < chains.length; i++) {
            if (chains[i].default) {
                return chains[i]
            }
        }
    }

    async function changeChain(data) {
        if (!library || !account) {
            return
        }
        const chainId = await library?.provider.request({ method: 'eth_chainId' });
        if (chainId === data.chainId) {
            //console.log("Bravo!, you are on the correct network");
        } else {
            try {
                await library?.provider.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: '0x' + data.chainId.toString(16) }],
                });
                //console.log("You have successfully switched to Binance Test network")
            } catch (switchError) {
                // This error code indicates that the chain has not been added to MetaMask.
                if (switchError.code === 4902) {
                    //console.log("This network is not available in your metamask, please add it")
                    try {
                        await library?.provider.request({
                            method: 'wallet_addEthereumChain',
                            params: [
                                {
                                    chainId: '0x' + data.chainId.toString(16),
                                    chainName: data.chainName,
                                    rpcUrls: [data.rpc], blockExplorerUrls: [data.explorer],
                                    nativeCurrency: {
                                        symbol: data.symbol,
                                        decimals: data.decimals
                                    }
                                }
                            ]
                        });
                    } catch (addError) {
                        //console.log(addError);
                    }
                }
                //console.log("Failed to switch to the network")
            }
        }
    }

    return (
        <ChainContext.Provider value={{ chain, chains, setChainData, getChangeable, setChangeable }}>
            {children}
        </ChainContext.Provider>
    );
}

export const useChainData = () => useContext(ChainContext);