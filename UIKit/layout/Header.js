/* eslint-disable react/no-unknown-property */
/** @jsxImportSource theme-ui */
import {
  Container,
  Box,
  Heading,
  Text,
  Grid,
  Image,
  Flex,
  Button,
  useColorMode,
} from "theme-ui";
import { useWeb3React } from "@web3-react/core";
import { HeaderLogo, FooterLogo } from "../../UIKit/assets/Logos";
import {
  DropdownIcon,
  Home,
  Moon,
  Bright,
} from "../../UIKit/assets/Icons";
import HEADER_DATA from "../../data/header";
import { chains } from "../../data/chains";
import { Sun } from "../../UIKit/assets/Backgrounds";
import { keyframes } from "@emotion/react";
import Link from "next/link";
import { useRouter } from "next/router";
import Account from "../../Web3Components/Account";
import useEagerConnect from "../../Web3Hooks/useEagerConnect";
import { useReducer, useEffect, useState, useCallback } from "react";
import Sticky from 'react-stickynode';
import { useStickyState, useStickyDispatch } from '../../contexts/app/app.provider';
import { Waypoint } from 'react-waypoint';

const rotation = keyframes({
  from: { transform: "rotate(0deg)" },
  to: { transform: "rotate(180deg)" },
});

const Header = () => {
  const [colorMode, setColorMode] = useColorMode();
  const router = useRouter();
  const triedToEagerConnect = useEagerConnect();
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const isSticky = useStickyState('isSticky');
  const [chainsDrop, setChainsDrop] = useState(false);
  const dispatch = useStickyDispatch();
  const setSticky = useCallback(() => dispatch({ type: 'SET_STICKY' }), [
    dispatch,
  ]);
  const removeSticky = useCallback(() => dispatch({ type: 'REMOVE_STICKY' }), [
    dispatch,
  ]);

  const onWaypointPositionChange = ({ currentPosition }) => {
    if (currentPosition === 'above') {
      setSticky();
    }
    if (currentPosition === 'below') {
      removeSticky();
    }
  };
  const openDropDown = (count) => {
    setChainsDrop(true)
  };

  const closeDropDown = () => {
    setChainsDrop(false);

  };

  const { library } = useWeb3React();


  const { menuData } = HEADER_DATA;

  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      forceUpdate()
    }

    router.events.on('routeChangeStart', handleRouteChange)
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [])

  const handleChain = (data) => {
    localStorage.setItem('chain', data.slug);
    router.replace({
      query: { ...router.query, chain: data.slug },
    });
    changeTO(data);
    closeDropDown();
  }

  async function changeTO(data) {
    if (!library) {
      return
    }
    const chainId = await library?.provider.request({ method: 'eth_chainId' });
    if (chainId === data.chainId) {
      console.log("Bravo!, you are on the correct network");
    } else {
      try {
        await library?.provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x' + data.chainId.toString(16) }],
        });
        console.log("You have successfully switched to Binance Test network")
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          console.log("This network is not available in your metamask, please add it")
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
            console.log(addError);
          }
        }
        console.log("Failed to switch to the network")
      }
    }
  }

  const ChainDrop = ({ data, i }) => {
    //console.log(data)
    return (
      <Box className="relative">
        <Button key={i} variant='text' onClick={() => {
          openDropDown();
        }}><Image src={data.chainLogo} width={50} height={50} alt='chain' /></Button>
        {chainsDrop && (
          <div
            className="click-catcher-obj"
            onClick={() => closeDropDown()}
          ></div>
        )}
        <Box className={
          chainsDrop
            ? "shadowed draw-holder-web activator"
            : "draw-holder"
        } sx={{
          background: "text",
          color: "background",
          height: '80vh',
          overflow: 'scroll',
          p: {
            fontWeight: 'bold',
            textAlign: 'center'
          }
        }}>
          <Text as='p'>Mainnet</Text>
          <br />

          <Grid
            sx={styles.grid1}>
            {
              chains.map((data, i) => {
                return data.main ? (
                  <Box
                    key={i}
                    sx={styles.connectBox}
                    onClick={() => {
                      handleChain(data)
                    }}
                  >
                    <Image
                      src={data.chainLogo}
                      alt={data.slug}
                      width={25}
                      height={25}
                    />
                    <Text>{data.chainName}</Text>
                  </Box>) : null
              })
            }
          </Grid>
          <br />
          <Text as='p'>Testnet</Text>
          <br />

          <Grid
            sx={styles.grid1}

          >
            {
              chains.map((data, i) => {
                return !data.main ? (
                  <Box
                    key={i}
                    sx={styles.connectBox}
                    onClick={() => {
                      handleChain(data)
                    }}
                  >
                    <Image
                      src={data.chainLogo}
                      alt={data.slug}
                      width={25}
                      height={25}
                    />
                    <Text>{data.chainName}</Text>
                  </Box>) : null
              })
            }
          </Grid>
        </Box>

      </Box>
    )
  }


  return (

    <>
      <Sun flip={false} />
      <Sticky enabled={isSticky} innerZ={991}>
        <header className={`${isSticky ? 'sticky' : 'unSticky'}`} sx={styles.header}>
          <Container sx={styles.container} className={`${isSticky ? 'sticky' : 'unSticky'}`}>
            <Box sx={styles.logo} >
              <>
                <HeaderLogo />
                <FooterLogo />
              </>
              <DropdownIcon />
              <Box style={styles.drop} className="drop1" variant="boxes.dropDown">
                <Box>
                  <Box>
                    <Flex sx={{ justifyContent: "space-between" }}>
                      <Heading>Menu</Heading>
                      <Link href="/" passHref>
                        <a>
                          <Home />
                        </a>
                      </Link>
                    </Flex>
                    <br />
                    <hr style={{ opacity: "0.3" }} />
                    <br />
                    <br />
                  </Box>
                  {menuData.map(({ label, links }, i) => {
                    return (
                      <Box sx={styles.dd} key={i}>
                        <Box variant="boxes.headerMenuItem">
                          <Text variant="smaller" as="p">
                            {label}&nbsp;&nbsp;&nbsp;
                            <DropdownIcon />
                          </Text>
                        </Box>
                        <hr style={{ opacity: "0.05" }} />
                        <Grid style={styles.grid} className="drop extra">
                          {links?.map(({ text, link, icon, description }, i) => {
                            return (
                              <Link key={i} href={link} passRef>
                                <a>
                                  <Text variant="text" as='p' sx={{ fontWeight: 'bold', mb: '10px' }}>{text}</Text>
                                  <Text variant="text" as='p' sx={styles.opac}>{description}</Text>
                                </a>
                              </Link>
                            );
                          })}
                        </Grid>
                      </Box>
                    );
                  })}
                  <Box>
                    <br />
                    <hr style={{ opacity: "0.3" }} />
                    <br />
                    <Box
                      onClick={(e) => {
                        setColorMode(
                          colorMode === "dark" ? "default" : "dark"
                        );
                      }}
                    >
                      <Box>{colorMode == "default" ? <Moon /> : <Bright />}</Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Flex sx={styles.nav} id='zua'>
              {menuData.map(({ label, links }, i) => {
                return (
                  <Box sx={styles.dd} key={i}>
                    <Box variant="boxes.headerMenuItem">
                      <Text variant="smaller" as="p">
                        {label}&nbsp;&nbsp;&nbsp;
                        <DropdownIcon />
                      </Text>
                      <Box
                        sx={{
                          position: "absolute",
                          height: "100px",
                          width: "100%",
                          zIndex: 2500,
                        }}
                        className="spaceX"
                      ></Box>
                    </Box>
                    <Box
                      style={styles.drop}
                      className="drop"
                      variant="boxes.dropDown"
                    >
                      <Flex
                        sx={{
                          justifyContent: "space-between",
                          svg: {
                            transform: "rotate(0deg) !important",
                          },
                        }}
                      >
                        <Heading variant="title">{label}</Heading>

                        <Link href="/" passHref>
                          <a>
                            <Home />
                          </a>
                        </Link>
                      </Flex>
                      <br />
                      <hr style={{ opacity: "0.3" }} />
                      <br />
                      <Grid sx={styles.grid}>
                        {links?.map(({ text, link, icon, description }, i) => {
                          return (
                            <Link key={i} href={link} passRef>
                              <a>
                                <Text variant="text" as='p' sx={{ fontWeight: 'bold', mb: '10px' }}>{text}</Text>
                                <Text variant="text" as='p' sx={styles.opac}>{description}</Text>
                              </a>
                            </Link>
                          );
                        })}
                      </Grid>
                      <Box>
                        <br />
                        <hr style={{ opacity: "0.3" }} />
                        <br />
                        <Box
                          onClick={(e) => {
                            setColorMode(
                              colorMode === "dark" ? "default" : "dark"
                            );
                          }}
                        >
                          <Box>
                            {colorMode == "default" ? <Moon /> : <Bright />}
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                );
              })}
            </Flex>
            <Flex>
              {(typeof window !== 'undefined' ? localStorage?.getItem('chain') : undefined) && chains.map((data, i) => {
                const localChain = typeof window !== 'undefined' ? localStorage?.getItem('chain') : undefined
                //console.log(localChain, data.slug, localChain && localChain == data.slug)
                return localChain && localChain == data.slug ? (
                  <ChainDrop data={data} i={i} />
                ) : null
              })}
              {!(typeof window !== 'undefined' ? localStorage?.getItem('chain') : undefined) &&
                <ChainDrop data={chains[0]} i={1} />
              }
              &nbsp;
              &nbsp;
              <Account triedToEagerConnect={triedToEagerConnect} />
            </Flex>

          </Container>
        </header>
      </Sticky>
      <Waypoint
        onEnter={removeSticky}
        // onLeave={setSticky}
        onPositionChange={onWaypointPositionChange}
      />
    </>
  );
};

export default Header;



const styles = {
  grid1: {
    gridGap: ["35px 15px", null, null, null, "30px 15px"],
    gridTemplateColumns: [
      "repeat(2,1fr)",
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
  header: {
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    transition: 'all 0.4s ease',
    '&.sticky': {
      backgroundColor: 'background',
      color: 'text',
      boxShadow: '0 1px 2px #C2B2F12F',
    },
  },
  opac: {
    opacity: 0.7
  },
  grid: {
    gridGap: ['35px 15px', null, null, null, null, '47px 74px'],
    gridTemplateColumns: [
      'repeat(2,1fr)',
      null,
      'repeat(2,1fr)',
      null,
      'repeat(3,1fr)',
    ],
  },
  dd: {
    mr: '15px',
    ".drop": {
      transition: "ease-in .4s",
      opacity: "0",
      pl: "20px",
      pb: "20px",
      transform: "translate(-170%, 0%)",
    },
    ".spaceX": {
      display: "none",
    },
    ".extra": {
      height: "0",
      textAlign: "left",
    },
    "&:hover": {
      //mb:'50px',
      svg: {
        animation: `${rotation} .5s linear`,
        transform: "rotate(180deg)",
      },
      ".extra": {
        height: "fit-content",
      },
      ".drop": {
        opacity: "1",
        zIndex: "2500",
        transform: "translate(0%, 0%)",
      },
      ".spaceX": {
        display: "block",
      },
    },
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    height: "88px",
    alignItems: "center",
  },
  nav: {
    height: "inherit",
    alignItems: "center",
    justifyContent: "space-between",
    width: '50%',
    display: ["none", "none", null, null, "flex"],
  },
  logo: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    svg: {
      "&:nth-of-type(1)": {
        display: ["none", null, null, "block"],
      },
      "&:nth-of-type(2)": {
        display: ["block", null, null, "none"],
        height: "45px",
      },
      "&:nth-of-type(3)": {
        transform: "scale(1.3)",
        display: ["block", null, null, "none"],
        alignSelf: "center",
      },
    },
    ".drop1": {
      transition: "ease-in .4s",
      opacity: "0",
      transform: "translate(-170%, 0%)",
      svg: {
        display: "inline-block",
      },
    },
    "&:hover": {
      //mb:'50px',
      svg: {
        "&:nth-of-type(3)": {
          animation: `${rotation} .5s linear`,
          transform: "scale(1.3)",
          transform: "rotate(180deg)",
        },
      },
      ".drop1": {
        opacity: "1",
        zIndex: "2500",
        display: ["block", null, null, "none"],
        height:'80vh',
        overflow:'scroll',
        mb:'0',
        pb:'0',
        transform: "translate(0%, 0%)",
      },
    },
  },
};
