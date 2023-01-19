import { Fragment } from "react";
import Header from "./Header";
import Footer from "./Footer";
import dynamic from "next/dynamic";
const NextNProgress = dynamic(import("nextjs-progressbar"), { ssr: false });
import { useColorMode } from "theme-ui";
import { useEffect } from "react";

export default function Layout({ children }) {
  const [colorMode, setColorMode] = useColorMode();

  useEffect(() => {
    document.body.click()
    console.log(colorMode)
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
