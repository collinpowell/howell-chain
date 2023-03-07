import { Container, Grid, Box, Heading, Text } from "theme-ui";
const Stats = ({saleData}) => {
  const features = [
    {
      title: saleData.minBuy + " BNB",
      text: "MIN BUY",
    },
    {
      title: saleData.maxBuy + " BNB",
      text: "MAX BUY",
    },
    {
      title: saleData.softCap + " BNB",
      text: "SOFT CAP",
    },
    {
      title: saleData.hardCap + " BNB",
      text: "HARD CAP",
    },
    {
      title: saleData.fundsRaised +" BNB",
      text: "FUNDS RAISED",
    },
    {
      title: saleData.rate+"/BNB",
      text: "RATE",
    },
  ];
  return (
    <Container sx={styles.container}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <Heading>Stats / Info</Heading>
      <br />
      <br />
      <br />
      <br />
      <Grid gap={5} columns={[1, 1, 2, 2, 3, 3]}>
        {features.map((item, i) => {
          return (
            //<a href="#" target="_blank" rel="noreferrer" key={i}>
              <Box sx={styles.box} key={i}>
                <Text as="h3">{item.title}</Text>
                <Text as="p">{item.text}</Text>
              </Box>
            //</a>
          );
        })}
      </Grid>
    </Container>
  );
};

export default Stats;

const styles = {
  box: {
    background: "rgba(194, 178, 241, 0.2)",
    overflow: "hidden",
    boxSizing: "border-box",
    padding: "40px 10px",
    minWidth: ["90%", null, "200px", "360px"],
    mx: "auto",
    position: "relative",
    top: "0",
    /* Z */
    textAlign: "center",
    boxShadow: "0px 0px 10px rgba(53, 52, 52, 0.2)",
    borderRadius: "5px",
    transition: "top ease 0.5s",
    "&:hover": {
      top: "-10px",
      boxShadow: "0px 0px 40px rgba(53, 52, 52, 0.2)",
    },
    h3: {
      fontSize: "40px",
      fontStyle: "normal",
      fontWeight: "normal",
      lineHeight: "60px",
      letterSpacing: "0em",
      mb: "20px",
      textTransform: "capitalize",
    },
    p: {
      fontSize: "22px",
      fontWeight: 400,
      lineHeight: "32px",
      letterSpacing: "0em",
    },
  },
  container: {
    textAlign: "center",
  },
};
