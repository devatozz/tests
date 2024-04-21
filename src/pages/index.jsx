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
          src="https://ipfs.io/ipfs/QmW8fycZ6QPhfA2uAM9aEwFbEibTmLvirZ5iWFkaeZKc8t"
          type="video/mp4"
        />
      </video>
      <Banner />
    </Box>
  );
}
