import dynamic from 'next/dynamic';
import JarallaxImage from 'src/components/jarallax/JarallaxImage';

const Jarallax = dynamic(() => import('src/components/jarallax/Jarallax'), { ssr: false });


export default function Index() {
    return (
        <div style={{ height: '2000px', width: '100%' }}>
            {/* <Jarallax speed={0.2}>
                <JarallaxImage src="https://img.youtube.com/vi/sRE5iQCdRvE/maxresdefault.jpg" alt="" />
            </Jarallax> */}
            <Jarallax  speed={0.2} videoSrc="https://www.youtube.com/watch?v=0SzvZph_P4Y"></Jarallax>

            <div className="section"></div>

        </div>
    );
}