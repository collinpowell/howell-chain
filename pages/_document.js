import Document, { Html, Head, Main, NextScript } from 'next/document';

class CustomDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en-US">
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="icon" type="image/png" href="/favicon.ico" sizes="192x192" />
          <link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico" />
          <link href='https://fonts.googleapis.com/css?family=Montserrat&display=swap' rel='stylesheet' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
