import { Container, Button, Heading, Text, Box } from "theme-ui";
import { LearnLogo } from "../UIKit/assets/Logos";
import Image from "next/image";
import { toBase64, shimmer } from "../UIKit/components/ImageLoader";
import Team from "../UIKit/assets/Team";
import Roadmap from "../components/Roadmap/Roadmap";

const About = () => {
  return (
    <>
      <Container sx={styles.container}>
        <Heading>
          <span>About</span>
        </Heading>
        <br></br>
        <br></br>
        <Text variant="normal" as="p">
          The Howrea blockchain is a De-centralized peer-to-peer, Proof of stake
          blockchain network by the <strong>Howrea Nation.</strong> The
          governance is geared towards eliminating, fraud, fund loss, security
          of investment, dump management and geared towards the growth of the
          Howrea nation. This blockchain is backed by many awesome projects and
          initiative.<br></br> For more info check out our{" "}
          <strong>Whitepaper</strong>
        </Text>
        <br></br>
        <br></br>
        <Button>Whitepaper&nbsp;&nbsp;</Button>
      </Container>
      <Container sx={styles.sheerContainer}>
        <Box sx={styles.image}>
          <LearnLogo />
        </Box>
        <Box sx={styles.content}>
          <Heading variant="border">The SHEER coin</Heading>
          <Text variant="normal" as="p">
            The SHEER coin is the base currency of the blockchain for
            governance, gas fees, Tx Processing and staking etc.
          </Text>
          <br></br>
          <br></br>
          <Heading variant="biggerTitle">The SHEERF Token</Heading>
          <Text variant="normal" as="p">
            The SHEERF token is a funding token deployed on Binance Smart Chain
            Network for funding purposes, the SHEERF token would be used as our
            initial funding token for bootstrapping our genesis block for the
            main network. The token would be tradable on a P2P bases before the
            hosting of the main blockchain network. On Hosting the main network
            all SHEERF asset holders would have their assets migrated to our
            main network and also available on top exchanges for trading.
          </Text>
        </Box>
      </Container>
      <Container sx={styles.containerVP}>
        <Heading>
          <span>Value Preposition</span>
        </Heading>
        <br></br>
        <br></br>
        <br></br>
        <Image
          src={`data:image/svg+xml;base64,${toBase64(shimmer(550, 364))}`}
          alt="Image"
          width={550}
          height={364}
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(550, 364)
          )}`}
        />
      </Container>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Container sx={styles.container}>
        <Heading>
          <span>Our Mission</span>
        </Heading>
        <br></br>
        <br></br>
        <Text variant="normal" as="p">
          To foster financial and economical growth using de-centralized finance
          and the creation of progressive infrastructures / enterprises
        </Text>
      </Container>
      <br></br>
      <br></br>
      <br></br>
      <Container sx={styles.container}>
        <Heading>
          <span>Our Vision</span>
        </Heading>
        <br></br>
        <br></br>
        <Text variant="normal" as="p">
          To create a virtual & Physical economy powered by digital finance /
          banking
        </Text>
      </Container>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Box sx={styles.container}>
        <Heading>
          <span>RoadMap</span>
        </Heading>
        <br></br>
        <br></br>
        <br></br>
        <Roadmap/>
        <br></br>
        <br></br>
      </Box>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Container>
        <Heading sx={{ textAlign: "center" }}>
          <span>The Team</span>
        </Heading>
        <br></br>
        <br></br>
        <Team />
      </Container>
    </>
  );
};

const styles = {
  containerVP: {
    mt: ["0", null, null, "150px"],
    textAlign: "center",
  },
  container: {
    pt: "40px",
    textAlign: "center",
  },
  sheerContainer: {
    mt: "150px",
    position: "relative",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    flexDirection: ["column", null, null, "row"],
  },
  content: {
    textAlign: ["center", null, null, "left"],
    mb: ["125px", null, null, "0"],
    maxWidth: ["100%", null, null, "355px", "540px", "595px", null, "650px"],
    h2: {
      mb: "23px",
      mx: ["auto", "auto", null, "0"],
      mt: ["40px", null, null, "0"],
      padding: "5px",
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
      "calc(100% - 595px)",
      null,
      "calc(100% - 650px)",
    ],
    textAlign: ["center"],
  },
};

export default About;
