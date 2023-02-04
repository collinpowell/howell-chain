import { Container, Box, Flex, Text } from "theme-ui";
import {
  Cosmos,
  CoinMarketCap,
  Nomics,
  Binance,
  Evmos,
  PancakeSwap,
} from "../../../assets/Partners";
import { keyframes } from "@emotion/react";

//const rotation = keyframes({ from: { opacity: 0 }, to: { opacity: 1 } })

const scroll = keyframes({
  from: { transform: "translate3d(0%, 0, 0)" },
  to: { transform: "translate3d(-425vw, 0, 0)" },
});
const scrollDesk = keyframes({
  from: { transform: "translate3d(0%, 0, 0)" },
  to: { transform: "translate3d(-156.5vw, 0, 0)" },
});

const Partners = () => {
  return (
    <Container sx={{ textAlign: "center", mt: "120px" }}>
      <Text variant="title" sx={{fontWeight:'bold'}}>Ecosystem Partners</Text>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Box
        className="partners-img-container"
        sx={{
          height: "150px",
          width: "fit-content",
          overflow: "auto",
          animation: [
            `${scroll} 10s linear infinite`,
            null,
            null,
            `${scrollDesk} 15s linear infinite`,
          ],
        }}
      >
        <Flex
          sx={{
            justifyContent: "center",
            position: "relative",
            svg: {
              mx: "25px",
              my: "auto",
              minWidth: "300px",
            },
          }}
        >
          <Cosmos />
          <CoinMarketCap />
          <Nomics />
          <Binance />
          <Evmos />
          <PancakeSwap />
          <Cosmos />
          <CoinMarketCap />
          <Nomics />
          <Binance />
        </Flex>
      </Box>
    </Container>
  );
};

export default Partners;
