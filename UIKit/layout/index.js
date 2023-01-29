import { Fragment } from "react";
import Header from "./Header";
import Footer from "./Footer";
import dynamic from "next/dynamic";
const NextNProgress = dynamic(import("nextjs-progressbar"), { ssr: false });
import { useThemeUI } from "theme-ui";

export default function Layout({ children }) {
  const { colorMode } = useThemeUI();

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
