import Banner from "src/components/home/Banner";
import AppBar from "src/components/layout/AppBar";
import { Box } from "@chakra-ui/react";
import Head from "next/head";
import favicon from "src/public/static/favicon.ico";

export default function Index() {
  return (
    <Box>
      <Head>
        <meta charset="utf-8" />
        <title>M33M</title>
        <meta name="description" content="https://www.m33m.io/" />
        <meta property="og:title" content="M33M Labs" />
        <meta property="og:description" content="M33M Labs - change content." />
        <meta
          property="og:image"
          content="https://raw.githubusercontent.com/Monoswap/images-repo/m33m/m33m/Cover.png"
        />
        <meta property="og:url" content="https://www.m33m.io/" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="M33M Labs" />
        <meta
          name="twitter:description"
          content="M33M Labs - change content."
        />
        <meta name="twitter:creator" content="@m33mlabs" />
        <meta
          name="twitter:image"
          content="https://raw.githubusercontent.com/Monoswap/images-repo/m33m/m33m/Cover.png"
        />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href={favicon.src} />
        <meta name="title" content="M33M Labs" />
      </Head>

      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          objectFit: "cover",
          zIndex: -1,
        }}
        poster="./asset/img/bgPoster.png"
      >
        <source
          src="https://raw.githubusercontent.com/Monoswap/images-repo/4c5e87be62c2e6e6fb58747a8e9ba1be87d3abb5/m33m/m33m.mp4"
          type="video/mp4"
        />
      </video>
      <Banner />
    </Box>
  );
}
