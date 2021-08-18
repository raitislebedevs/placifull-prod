import Document, { Html, Head, Main, NextScript } from 'next/document';
const logo =
  'https://placifull-static.s3.eu-central-1.amazonaws.com/favicon.png';
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
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
            content="At Placifull we help to move abroad by finding all the important things, real estate, transport, and job. Only all relevant tools. Lowest prices in the market."
          />
          <meta
            name="keywords"
            content="opportunities, lowest listing prices, less than 2 $, less than a dollar, less than euro, only 0.99 Euro,  real estate, transport, car, cars, jobs, vacancy, jobs abroad, real estate abroad, cheap listing site, simple listing site, nekustamie īpašumi, transports, vieglās mašīnas, mašīnas, darbs, darbs ārzemēs, lēts sludinājums"
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
