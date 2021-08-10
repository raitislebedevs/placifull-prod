import Document, { Html, Head, Main, NextScript } from 'next/document';
const logo = '/static/images/favicon.png';
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"
            rel="stylesheet"
          />
          <meta
            name="google-site-verification"
            content="ZFzbY-Sgp7ARP--dYQ3KPBobwM9SBLQV4XfTco7HgV0"
          />
          <meta
            name="description"
            content="Helps to move abroad by finding all important things, real estate, transport and job. Moving abroad has not been so easy and quick"
          />
          <meta
            name="keywords"
            content="real estate, transport, car, cars, jobs, vacancy, jobs abroad, real estate abroad, cheap listing site, simple listing site, nekustamie īpašumi, transports, vieglās mašīnas, mašīnas, darbs, darbs ārzemēs, lēts sludinājums"
          />
          <link rel="icon" href={logo} sizes="any" type="image/svg+xml" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
