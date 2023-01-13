import '../components/Markdown/Markdown.scss'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../components/Roadmap/Roadmap.scss';
import '../components/Container/Container.scss';
import '../styles/dropDown.scss';
import "../styles/globals.css";
import { ThemeProvider } from "theme-ui";
import { StickyProvider } from "../contexts/app/app.provider";

import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import theme from "../theme";
import Layout from "../UIKit/layout";


function getLibrary(provider) {
  return new Web3Provider(provider);
}

function MyApp({ Component, pageProps }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ThemeProvider theme={theme}>
        <StickyProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </StickyProvider>
      </ThemeProvider>
    </Web3ReactProvider>
  );
}

export default MyApp;
