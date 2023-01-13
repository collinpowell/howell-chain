import FRESH_DATA from "../../../../data/fresh/index";
import { Container, Button, Heading, Box, Text, Image } from "theme-ui";
import { FooterLogo,DownLogo } from "../../../assets/Logos";
import { ArrowRight } from "../../../assets/Icons";
import { OrbitNoGrad } from "../../../../UIKit/assets/Backgrounds";

const Fresh = () => {
  const { heading, body } = FRESH_DATA;
  return (
    <>
       <Container sx={styles.container}>
      <Box sx={styles.content}>
        <Heading>Invest early on the blockchain project</Heading>
        <Text variant="normal" as="p">
          Highly-vetted ideas and teams you can trust.<br></br>Supported by
          industry-leading creators and funds
        </Text>
      </Box>
      <Box sx={styles.image}>
        <Image src="/sphere.svg" alt="" />
        <FooterLogo />
        <OrbitNoGrad />
      </Box>
    </Container>
    <Container sx={{
      textAlign:'center',
      mt:[0,null,null,'-50px'],
      svg:{
        mx:'auto'
      }
    }}>
      <DownLogo/>
    </Container>
    </>
 
  );
};

export default Fresh;

const styles = {
  container: {
    mt: "40px",
    position: "relative",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    flexDirection: ["column", null, null, "row"],
    button: {
      mt: "35px",
      svg: {
        path: {
          fill: "background",
        },
      },
    },
  },
  content: {
    textAlign: ["center", null, null, "left"],
    mb: ["125px", null, null, "0"],
    maxWidth: ["100%", null, null, "355px", "540px", "795px", null, "650px"],
    h2: {
      fontSize: ["30px", "35px", "40px", "45px", "70px", "96px"],
      mb: "23px",
      fontWeight: "500",
      //mx: ['20px','auto',null,'0'],
    },
  },
  image: {
    position: "relative",
    width: [
      null,
      null,
      null,
      "calc(100% - 355px)",
      "calc(100% - 540px)",
      "calc(100% - 795px)",
      null,
      "calc(100% - 650px)",
    ],
    textAlign: ["center"],
    svg: {
      m: "auto",
      "&:nth-of-type(1)": {
        opacity:'0'
      },
      "&:nth-of-type(2)": {
        position: "absolute",
        top: 0,
        left: 0,
        mt: ["-1395px", null, null, "-865px"],
        ml: "-1405px",
        zIndex: -1,
      },
    },
  },
};
