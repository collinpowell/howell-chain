/** @jsxRuntime classic */
/** @jsx jsx */
import { useWeb3React } from "@web3-react/core";
import { UserRejectedRequestError } from "@web3-react/injected-connector";
import { useEffect, useState } from "react";
import { connectors } from "../Web3Hooks/connectors";
import ETHBalance from "./ETHBalance";
import useMetaMaskOnboarding from "../Web3Hooks/useMetaMaskOnboarding";
import { jsx, Button, Box, Image, Text } from "theme-ui";
import useENSName from "../Web3Hooks/useENSName";
import { shortenHex } from "../Util/util";

const Account = () => {
  const [exploreDropDownSwitch, setExploreDropDownSwitch] = useState(false);
  const [exploreDropDownSwitch1, setExploreDropDownSwitch1] = useState(false);

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
  }, [active, error, stopOnboarding]);

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
        <div
          className={
            exploreDropDownSwitch
              ? "white shadowed draw-holder-web activator"
              : "draw-holder"
          }
        >
          <Button
            variant="outline"
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
            w="100%"
          >
            <Box w="100%" justifyContent="center">
              <Image
                src="https://uploads.codesandbox.io/uploads/user/c77bdca7-dcb6-4830-b53b-3abb3488e76b/6-WY-cbw.png"
                alt="Coinbase Wallet Logo"
                width={25}
                height={25}
                borderRadius="3px"
              />
              <Text>Coinbase Wallet</Text>
            </Box>
          </Button>
          <Button
            variant="outline"
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
            w="100%"
          >
            <Box w="100%" justifyContent="center">
              <Image
                src="https://uploads.codesandbox.io/uploads/user/c77bdca7-dcb6-4830-b53b-3abb3488e76b/6MMr-wc.png"
                alt="Wallet Connect Logo"
                width={26}
                height={26}
                borderRadius="3px"
              />
              <Text>Wallet Connect</Text>
            </Box>
          </Button>
          <Button
            variant="outline"
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
            w="100%"
          >
            <Box w="100%" justifyContent="center">
              <Image
                src="https://uploads.codesandbox.io/uploads/user/c77bdca7-dcb6-4830-b53b-3abb3488e76b/q4z6-mm.png"
                alt="Metamask Logo"
                width={25}
                height={25}
                borderRadius="3px"
              />
              <Text>Metamask</Text>
            </Box>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <Button onClick={() => openDropDown(2)} variant="border">
        {isConnected && (
          <ETHBalance />
        )}
      </Button>
      {exploreDropDownSwitch1 && (
        <div
          className="click-catcher-obj"
          onClick={() => closeDropDown(3)}
        ></div>
      )}
      <div
        className={
          exploreDropDownSwitch1
            ? "white shadowed draw-holder-web activator"
            : "draw-holder"
        }
      >
        {ENSName || `${shortenHex(account, 4)}`}

        <Button onClick={() => onDisconnect()}>Disconnect Wallet</Button>
      </div>
    </div>
  );
};

export default Account;
