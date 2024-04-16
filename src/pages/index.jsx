import Banner from "src/components/home/Banner";
import AppBar from "src/components/layout/AppBar";
import { Box } from "@chakra-ui/react";
import dynamic from 'next/dynamic';


const Jarallax = dynamic(() => import('src/components/jarallax/Jarallax'), { ssr: false });



export default function Index() {
  return (
    <Box >
      {/* <video
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
          src="https://firebasestorage.googleapis.com/v0/b/monoswap-154a7.appspot.com/o/bgVideo.mp4?alt=media&token=88506fef-0c63-4f5d-982a-708f0492ac3a"
          type="video/mp4"
        />
      </video> */}
      <div style={{
        height: '100%', width: '100%',
        position: "absolute",
        top: 0,
        left: 0,
        objectFit: "cover",
      }}>
        <Jarallax speed={0.2} videoSrc="https://www.youtube.com/watch?v=0SzvZph_P4Y"></Jarallax>
      </div>
      <Banner />
    </Box>
  );
}
