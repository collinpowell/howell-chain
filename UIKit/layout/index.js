import { Fragment } from "react";
import Header from "./Header";
import Footer from "./Footer";
import NextNProgress from "nextjs-progressbar";
import { useColorMode } from "theme-ui";
import { useEffect } from "react";

export default function Layout({ children }) {
  const [colorMode, setColorMode] = useColorMode();

  useEffect(() => {
    setColorMode(colorMode);
  }, []);

  return (
    <Fragment>
      <NextNProgress
        height={4}
        color={colorMode === "default" ? "black" : "white"}
      />

      <Header />
      <main>{children}</main>
      <Footer />
    </Fragment>
  );
}
