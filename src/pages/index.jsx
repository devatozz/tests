import Banner from "src/components/home/Banner";
import AppBar from "src/components/layout/AppBar";
import { Box } from "@chakra-ui/react";

export default function Index() {
  return (
    <Box>
      <video
        autoPlay
        loop
        muted
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
