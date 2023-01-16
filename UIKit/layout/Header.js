import { DrawerProvider } from "../../contexts/drawer/drawer.provider";
import {
  Container,
  Box,
  Heading,
  Text,
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

const rotation = keyframes({
  from: { transform: "rotate(0deg)" },
  to: { transform: "rotate(180deg)" },
});

const Header = () => {
  const [colorMode, setColorMode] = useColorMode();
  const { pathname } = useRouter();

  const { menuData } = HEADER_DATA;

  return (
    <DrawerProvider>
      <header>
        {pathname == "/funding" ? <Sun flip={true} /> : <Sun flip={false} />}
        <Container sx={styles.container}>
          <Box sx={styles.logo}>
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
                      <Box style={styles.drop} className="drop extra">
                        {links?.map(({ text, link, icon }, i) => {
                          return (
                            <Link key={i} href={link} passRef>
                              <a>
                                <Text variant="text">{text}</Text>
                              </a>
                            </Link>
                          );
                        })}
                      </Box>
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
                        colorMode === "default" ? "dark" : "default"
                      );
                    }}
                  >
                    <Box>{colorMode == "default" ? <Moon /> : <Bright />}</Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Flex sx={styles.nav}>
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

                    {links?.map(({ text, link, icon }, i) => {
                      return (
                        <Link key={i} href={link} passRef>
                          <a>
                            <Text variant="text">{text}</Text>
                          </a>
                        </Link>
                      );
                    })}
                    <Box>
                      <br />
                      <hr style={{ opacity: "0.3" }} />
                      <br />
                      <Box
                        onClick={(e) => {
                          setColorMode(
                            colorMode === "default" ? "dark" : "default"
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
          {pathname == "/funding" ? (
            <Account />
          ) : (
            // <Button>Connect Wallet</Button>
            <Link href="/funding" passRef>
              <a>
                <Button variant="text">
                  Get SHEER&nbsp;&nbsp;
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

        transform: "translate(0%, 0%)",
      },
    },
  },
};
