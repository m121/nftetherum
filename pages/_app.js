import '../styles/globals.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <html lang="en" />
        <meta charset="utf-8" />
        <title>Web title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="theme-color" content="#000000" />
        <link rel="shortcut icon" href="favicon.ico" />
        

        <meta name="title" content="web title" />
        <meta
          name="description"
          content="Description website"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Mateo perez" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://web.com" />
        <meta property="og:title" content="my web" />
        <meta
          property="og:description"
          content="Description website"
        />
        <meta property="og:image" content="https://web.com/thumb.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://web.com" />
        <meta property="twitter:title" content="Mi negocio QR" />
        <meta
          property="twitter:description"
          content="Description website"
        />
        <meta
          property="twitter:image"
          content="https://web.com/thumb.png"
        />

      
      </Head>

      <Component {...pageProps} />
    </div>);
}

export default MyApp