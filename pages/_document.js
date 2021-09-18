import Document, { Html, Head, Main, NextScript } from 'next/document';
const logo =
  'https://placifull-static.s3.eu-central-1.amazonaws.com/favicon.webp';
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Global Site Tag (gtag.js) - Google Analytics */}

          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter&display=optional"
            rel="stylesheet"
          />
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
            content="real estate, transport, jobs, jobs abroad, mājas, dzīvokļi, nekustamie īpašumi, mašīnas, vieglās mašīnas, darbs ārzemēs"
          />
          <link rel="icon" href={logo} sizes="any" type="image/svg+xml" />
          <link
            rel="apple-touch-icon"
            href={logo}
            sizes="any"
            type="image/svg+xml"
          ></link>
          {/* Href Langues will be next */}
          <link rel="alternate" href="https://placifull.com/lv" hrefLang="lv" />
          <link rel="alternate" href="https://placifull.com/lt" hrefLang="lt" />
          <link rel="alternate" href="https://placifull.com/ru" hrefLang="ru" />
          <link rel="alternate" href="https://placifull.com/pt" hrefLang="pt" />
          <link rel="alternate" href="https://placifull.com/jp" hrefLang="ja" />
          <link rel="alternate" href="https://placifull.com/es" hrefLang="es" />
          <link rel="alternate" href="https://placifull.com/it" hrefLang="it" />
          <link rel="alternate" href="https://placifull.com/sa" hrefLang="ar" />
          <link rel="alternate" href="https://placifull.com/in" hrefLang="hi" />

          <meta name="theme-color" content="#fff" />
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
          {/* <script
            dangerouslySetInnerHTML={{
              __html: `
              (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:2608869,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `,
            }}
          /> */}
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
