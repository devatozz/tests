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
        poster="https://firebasestorage.googleapis.com/v0/b/monoswap-154a7.appspot.com/o/bgPoster.png?alt=media&token=5e15ff00-cb3f-4dc3-8a22-1a3d95adc4b0"
      >
        <source
          src="https://firebasestorage.googleapis.com/v0/b/monoswap-154a7.appspot.com/o/bgVideo.mp4?alt=media&token=88506fef-0c63-4f5d-982a-708f0492ac3a"
          type="video/mp4"
        />
      </video>
      <Banner />
    </Box>
  );
}
