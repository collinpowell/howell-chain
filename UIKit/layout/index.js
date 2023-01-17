import { Fragment } from "react";
import Header from "./Header";
import Footer from "./Footer";
import NextNProgress from "nextjs-progressbar";
import { useColorMode } from "theme-ui";
import { useEffect } from "react";

export default function Layout({ children }) {
  const [colorMode, setColorMode] = useColorMode();

  useEffect(() => {
    document.body.click()

  }, []);

  return (
    <Fragment>
      <NextNProgress
        height={4}
        color={colorMode === "dark" ? "white" : "black"}
      />

      <Header />
      <main>{children}</main>
      <Footer />
    </Fragment>
  );
}
