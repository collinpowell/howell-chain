import "../components/Markdown/Markdown.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../components/Roadmap/Roadmap.scss";
import "../styles/dropDown.scss";
import "../styles/globals.css";
import TagManager from 'react-gtm-module';
import { useEffect } from "react";
import { ThemeProvider } from "theme-ui";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import theme from "../theme";
import Layout from "../UIKit/layout";
import AOS from "aos";
import ToTop from '../UIKit/components/ToTop'

function getLibrary(provider) {
  return new Web3Provider(provider);
}

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    window.scrollTo(0,0)
    TagManager.initialize({ gtmId: 'G-KC2KCV810S' });
    AOS.init({
      duration: 1200,
    }), [];
  });
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ThemeProvider theme={theme}>
          <Layout>
            <ToTop/>
            <Component {...pageProps} />
          </Layout>
      </ThemeProvider>
    </Web3ReactProvider>
  );
}

export default MyApp;
