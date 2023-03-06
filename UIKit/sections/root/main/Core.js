import CoreCards from "../sub/CoreCards";
import { Container, Box } from "theme-ui";
import Image from "next/image";
import { toBase64, shimmer } from "../../../components/ImageLoader";
import CORE_DATA from "../../../../data/core";
import { Core as CoreBg } from "../../../assets/Backgrounds";

const Core = () => {
  const { smallHeader, heading, cards, images } = CORE_DATA;

  return (
      <Container sx={styles.container}>
        <CoreCards smallHeader={smallHeader} heading={heading} cards={cards} />
      </Container>
  );
};

export default Core;

const styles = {
  container: {
    mt: ["185px", null, null, "155px"],
    px:[0, null, null, "45px"],
  },
};
