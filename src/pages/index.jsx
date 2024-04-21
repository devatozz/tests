import Banner from "src/components/home/Banner";
import { Box } from "@chakra-ui/react";
import dynamic from 'next/dynamic';

const Jarallax = dynamic(() => import('src/components/jarallax/Jarallax'), { ssr: false });

export default function Index() {
  return (
    <Box >
      <div style={{
        height: '100%', width: '100%',
        position: "fixed",
        top: 0,
        left: 0,
      }}>
        <Jarallax speed={0.2} videoSrc="https://www.youtube.com/v/0SzvZph_P4Y?rel=0&vq=hd1080p"></Jarallax>
      </div>
      <Banner />
    </Box>
  );
}
