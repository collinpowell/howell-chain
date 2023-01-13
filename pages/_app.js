import "../components/Markdown/Markdown.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../components/Roadmap/Roadmap.scss";
import "../styles/dropDown.scss";
import "../styles/globals.css";
import { useEffect } from "react";
import { ThemeProvider,useThemeUI } from "theme-ui";
import { StickyProvider } from "../contexts/app/app.provider";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import theme from "../theme";
import Layout from "../UIKit/layout";
import NextNProgress from "nextjs-progressbar";
import AOS from "aos";

function getLibrary(provider) {
  return new Web3Provider(provider);
}

function MyApp({ Component, pageProps }) {
  const { colorMode } = useThemeUI()
  useEffect(() => {
    AOS.init({
      duration: 1200,
    }),
      [];
  });
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ThemeProvider theme={theme}>
        <StickyProvider>
          <Layout>
            <NextNProgress height={5} color={colorMode === 'default' ? 'black' : 'white'} />
            <Component {...pageProps} />
          </Layout>
        </StickyProvider>
      </ThemeProvider>
    </Web3ReactProvider>
  );
}

export default MyApp;
