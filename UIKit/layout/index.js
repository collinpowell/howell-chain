import { Fragment } from "react";
import Header from "./Header";
import Footer from "./Footer";
import NextNProgress from "nextjs-progressbar";
import { useThemeUI } from "theme-ui";

export default function Layout({ children }) {
  const { colorMode } = useThemeUI();

  return (
    <Fragment>
      <NextNProgress
        height={5}
        color={colorMode === "default" ? "black" : "white"}
      />

      <Header />
      <main>{children}</main>
      <Footer />
    </Fragment>
  );
}
