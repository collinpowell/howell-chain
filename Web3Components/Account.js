/** @jsxRuntime classic */
/** @jsx jsx */
import { useWeb3React } from "@web3-react/core";
import { UserRejectedRequestError } from "@web3-react/injected-connector";
import { useEffect, useState } from "react";
import { connectors } from "../Web3Hooks/connectors";
import ETHBalance from "./ETHBalance";
import useMetaMaskOnboarding from "../Web3Hooks/useMetaMaskOnboarding";
import { jsx, Button, Box, Image, Grid, Text } from "theme-ui";
import useENSName from "../Web3Hooks/useENSName";
import { shortenHex } from "../Util/util";

const Account = ({ triedToEagerConnect }) => {
  const [exploreDropDownSwitch, setExploreDropDownSwitch] = useState(false);
  const [exploreDropDownSwitch1, setExploreDropDownSwitch1] = useState(false);
  triedToEagerConnect
  const {
    active,
    error,
    activate,
    chainId,
    deactivate,
    account,
    library,
    setError,
  } = useWeb3React();
  const setProvider = (type) => {
    if (typeof window === "object") {
      window.localStorage.setItem("provider", type);
    }
  };
  const isConnected = typeof account === "string" && !!library;
  const ENSName = useENSName(account);

  const { stopOnboarding } = useMetaMaskOnboarding();

  const openDropDown = (count) => {
    switch (count) {
      case 1:
        setSearchDropDownSwitch(true);
        break;
      case 2:
        if (!account) {
          alert("Connect To Wallet");
          return;
        }
        setExploreDropDownSwitch1(true);
        break;
      case 3:
        setNotificationDropDownSwitch(true);
        break;
      case 4:
        setUserDropDownSwitch(true);
        break;
      case 5:
        setExploreDropDownSwitch(true);
        break;
      default:
        return;
    }
  };

  const closeDropDown = (count) => {
    switch (count) {
      case 1:
        setSearchDropDownSwitch(false);
        break;
      case 2:
        setExploreDropDownSwitch(false);
        break;
      case 3:
        setExploreDropDownSwitch1(false);
        break;
      case 4:
        setUserDropDownSwitch(false);
        break;
      default:
        return;
    }
  };
  const onDisconnect = () => {
    deactivate();
    closeDropDown(2);
    closeDropDown(3);
  };
  // manage connecting state for injected connector
  const [connecting, setConnecting] = useState(false);
  useEffect(() => {
    if (active || error) {
      setConnecting(false);
      stopOnboarding();
    }
    async function changeTO() {
      console.log(library)
      const chainId = await library?.provider.request({ method: 'eth_chainId' });
      const binanceTestChainId = '0x61'
      if (chainId === binanceTestChainId) {
        console.log("Bravo!, you are on the correct network");
      } else {
        try {
          await library?.provider.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: binanaceTestChainId }],
          });
          console.log("You have successfully switched to Binance Test network")
        } catch (switchError) {
          // This error code indicates that the chain has not been added to MetaMask.
          if (switchError.code === 4902) {
            console.log("This network is not available in your metamask, please add it")
            try {
              await provider.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainId: '0x61',
                    chainName: 'Smart Chain - Testnet',
                    rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545'], blockExplorerUrls: ['https://testnet.bscscan.com'],
                    nativeCurrency: {
                      symbol: 'BNB',
                      decimals: 18
                    }
                  }
                ]
              });
            } catch (addError) {
              console.log(addError);
            }
          }
          console.log("Failed to switch to the network")
        }
      }
    }
    changeTO();
  }, [active, error, library, stopOnboarding]);

  if (typeof account !== "string") {
    return (
      <div className="relative">
        <Button
          variant="primary"
          onClick={() => {
            openDropDown(5);
          }}
        >
          {"Connect to Wallet"}
        </Button>
        {exploreDropDownSwitch && (
          <div
            className="click-catcher-obj"
            onClick={() => closeDropDown(2)}
          ></div>
        )}
        <Grid
          sx={styles.grid}
          className={
            exploreDropDownSwitch
              ? "shadowed draw-holder-web activator"
              : "draw-holder"
          }
        >
          <Box
            sx={styles.connectBox}
            onClick={() => {
              activate(connectors.coinbaseWallet).catch((error) => {
                // ignore the error if it's a user rejected request
                if (error instanceof UserRejectedRequestError) {
                  setConnecting(false);
                } else {
                  setError(error);
                }
              });
              setProvider("coinbaseWallet");
              closeDropDown(2);
              closeDropDown(3);
            }}
          >
            <Image
              src="https://uploads.codesandbox.io/uploads/user/c77bdca7-dcb6-4830-b53b-3abb3488e76b/6-WY-cbw.png"
              alt="Coinbase Wallet Logo"
              width={25}
              height={25}
            />
            <Text>Coinbase Wallet</Text>
          </Box>

          <Box
            onClick={() => {
              console.log(" Wallet");
              activate(connectors.walletConnect).catch((error) => {
                // ignore the error if it's a user rejected request
                console.log(error);
                if (error instanceof UserRejectedRequestError) {
                  setConnecting(false);
                } else {
                  setError(error);
                }
              });
              setProvider("walletConnect");
              closeDropDown(2);
              closeDropDown(3);
            }}
            sx={styles.connectBox}
          >
            <Image
              src="https://uploads.codesandbox.io/uploads/user/c77bdca7-dcb6-4830-b53b-3abb3488e76b/6MMr-wc.png"
              alt="Wallet Connect Logo"
              width={26}
              height={26}
            />
            <Text>Wallet Connect</Text>
          </Box>

          <Box
            onClick={() => {
              activate(connectors.injected).catch((error) => {
                // ignore the error if it's a user rejected request
                if (error instanceof UserRejectedRequestError) {
                  setConnecting(false);
                } else {
                  setError(error);
                }
              });
              setProvider("injected");
              closeDropDown(2);
              closeDropDown(3);
            }}
            sx={styles.connectBox}
          >
            <Image
              src="https://uploads.codesandbox.io/uploads/user/c77bdca7-dcb6-4830-b53b-3abb3488e76b/q4z6-mm.png"
              alt="Metamask Logo"
              width={25}
              height={25}
            />
            <Text>Metamask</Text>
          </Box>
        </Grid>
      </div>
    );
  }

  return (
    <div className="relative">
      <Button onClick={() => openDropDown(2)} variant="border">
        {isConnected && <ETHBalance />}
      </Button>
      {exploreDropDownSwitch1 && (
        <div
          className="click-catcher-obj"
          onClick={() => closeDropDown(3)}
        ></div>
      )}
      <Box
        sx={{
          background: "background",
          color: "text",
        }}
        className={
          exploreDropDownSwitch1
            ? "white shadowed draw-holder-web activator"
            : "draw-holder"
        }
      >
        {ENSName || `${shortenHex(account, 4)}`}
        <br />
        <br />
        <br />
        <Button onClick={() => onDisconnect()}>Disconnect Wallet</Button>
      </Box>
    </div>
  );
};

const styles = {
  grid: {
    background: "text",
    color: "background",
    gridGap: ["35px 0px", null, 0, null, null, "30px 5px"],
    gridTemplateColumns: [
      "repeat(1,1fr)",
      null,
      "repeat(2,1fr)",
      null,
      "repeat(2,1fr)",
    ],
  },
  connectBox: {
    width: "100px",
    height: "100px",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    img: {
      m: "auto",
      width: "50px",
      height: "50px",
    },
  },
};
export default Account;
