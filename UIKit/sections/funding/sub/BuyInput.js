import { Container, Box, Flex, Button, Text, Spinner } from "theme-ui";
import NumberInput from "./NumberInput";

function numberWithCommas(n) {
  var parts = n.toString().split(".");
  return (
    parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
    (parts[1] ? "." + parts[1] : "")
  );
}
const WhyChoose = ({
  handleClick,
  userInput,
  setUserInput,
  spin,
  setSpin,
  rate,
}) => {
  var cost = Number(userInput * rate);
  return (
    <Box as="section" id="services" sx={styles.section}>
        <Box sx={styles.post}>
          <Flex variant="boxes.newsLetter" sx={styles.countdown}>
            <NumberInput state={userInput} setState={setUserInput} />
            <Text as="h1">{"MAX"}</Text>
          </Flex>
          {spin &&  <Spinner sx={{ mx: "auto", marginTop: "20px" }} />}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingLeft: "20px",
              paddingRight: "20px",
              marginTop: spin ? "15px":"35px",
            }}
          >
            <Button onClick={() => handleClick()}>Buy Now</Button>
          </div>
        </Box>
    </Box>
  );
};

export default WhyChoose;

const styles = {
  countdown: {
    width: "100%",
    flexDirection: ["column", null, null, "row"],
    justifyContent: "space-evenly",
    fontSize: ["20px", "25px", null, null, "30px"],
    h1: {
      px: "30px",
      py: "5px",
      background:
        "radial-gradient(114% 421.6% at -6.17% 23.08%, rgba(243, 240, 252, 0.26) 0%, rgba(163, 133, 255, 0.26) 100%)",
      boxSizing: "border-box",
      boxShadow: "0px 2.95133px 2.95133px rgba(0, 0, 0, 0.25)",
      backdropFilter: "blur(11.4493px)",
      borderRadius: "12.5431px",
      textAlign: "center",
      fontSize: ["25px", "25px", null, null, "30px"],
    },
    h2: {
      textAlign: "center",
      fontSize: ["25px", "25px", null, null, "30px"],
      ml: "5px",
      mr: "5px",
    },
    p: {
      textAlign: "center",
      fontSize: ["25px", "25px", null, null, "30px"],
    },
  },
  section: {
    textAlign: "center",
    mt: ["20px"],
    //pb: ["20px", "30px", null, "50px", "85px", null, "105px", "125px", "140px"],
  },
  container: {
    position: "relative",
  },
  blockTitle: {
    textAlign: "center",
    mb: ["35px", null, null, "55px", null, "60px", "85px", "95px", "110px"],
    h2: {
      fontSize: ["24px", null, "28px", "30px"],
      lineHeight: [1.35],
      color: "heading",
      mb: [2, null, "13px"],
      fontWeight: "body",
    },
    p: {
      fontSize: ["15px", null, "16px"],
      lineHeight: 1.85,
      color: "text_secondary",
    },
  },
  row: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 0,
  },
  post: {
    mb: ["32px", null, null, null, 0],
    h2: {
      fontSize: ["18px", null, null, null, null, "20px"],
      lineHeight: 1.45,
      fontWeight: "500",
    },
    p: {
      maxWidth: "266px",
      mx: "auto",
      marginLeft: "5px",
      fontSize: ["14px", "15px"],
      px: [null, null, null, null, "5px", 0],
    },
  },
  imageWrap: {
    display: "flex",
    minHeight: ["auto", "83px"],
    alignItems: "center",
    justifyContent: "center",
    img: {
      width: ["75px", null, null, null, "auto"],
    },
  },
};
