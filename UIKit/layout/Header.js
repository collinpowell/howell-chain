import { DrawerProvider } from "../../contexts/drawer/drawer.provider";
import {
  Container,
  Box,
  Heading,
  Text,
  Grid,
  Flex,
  Button,
  useColorMode,
} from "theme-ui";
import { HeaderLogo, FooterLogo } from "../../UIKit/assets/Logos";
import {
  DropdownIcon,
  ArrowRight,
  Home,
  Moon,
  Bright,
} from "../../UIKit/assets/Icons";
import HEADER_DATA from "../../data/header";
import { Sun } from "../../UIKit/assets/Backgrounds";
import { keyframes } from "@emotion/react";
import Link from "next/link";
import { useRouter } from "next/router";
import Account from "../../Web3Components/Account";
import useEagerConnect from "../../Web3Hooks/useEagerConnect";
import { useReducer,useEffect } from "react";
const rotation = keyframes({
  from: { transform: "rotate(0deg)" },
  to: { transform: "rotate(180deg)" },
});

const Header = () => {
  const [colorMode, setColorMode] = useColorMode();
  const { pathname } = useRouter();
  const triedToEagerConnect = useEagerConnect();
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  const { menuData } = HEADER_DATA;

  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      forceUpdate()
    }

    router.events.on('routeChangeStart', handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [])

  return (
    <DrawerProvider>
      <header>
        {pathname == "/funding" || pathname == "/staking" ? <Sun flip={true} /> : <Sun flip={false} />}
        <Container sx={styles.container}>
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
                                <Text variant="text" as='p' sx={{ fontWeight: 'bold',mb:'10px' }}>{text}</Text>
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
                              <Text variant="text" as='p' sx={{ fontWeight: 'bold',mb:'10px' }}>{text}</Text>
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
          {pathname == "/funding"  || pathname == "/staking" ? (
            <Account triedToEagerConnect={triedToEagerConnect} />
          ) : (
            <Link href="/funding" passRef>
              <a>
                <Button variant="text">
                  Get SHRF&nbsp;&nbsp;
                  <ArrowRight />
                </Button>
              </a>
            </Link>
          )}
        </Container>
      </header>
    </DrawerProvider>
  );
};

export default Header;

const styles = {
  opac:{
    opacity:0.7
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
    width: "60%",
    display: ["none", null, null, "flex"],
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
        height: '80vh',
        overflow: 'scroll',
        mb: '0',
        pb: '0',
        transform: "translate(0%, 0%)",
      },
    },
  },
};
