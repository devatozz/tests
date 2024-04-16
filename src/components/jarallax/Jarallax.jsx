import React, { useRef, useEffect } from 'react';

import { jarallax, jarallaxVideo } from 'jarallax';
import 'jarallax/dist/jarallax.min.css';

// Optional video extension
jarallaxVideo();

export default function Jarallax({ className = '', children, ...props }) {
    const $el = useRef();

    // Init Jarallax.
    useEffect(() => {
        if ($el.current) {
            jarallax($el.current, props);
        }

        // Destroy Jarallax.
        return function destroy() {
            if ($el.current) {
                jarallax($el.current, 'destroy');
            }
        };
    }, []);

    // Update options.
    useEffect(() => {
        if ($el.current) {
            console.log('props: ', $el.current);
            jarallax($el.current, 'destroy');
            jarallax($el.current, {
                // imgSrc: 'https://img.youtube.com/vi/sRE5iQCdRvE/maxresdefault.jpg', 
                // videoSrc: 'https://www.youtube.com/watch?v=ZqU4oTDy3XE', // could it be
                videoSrc: 'https://www.youtube.com/watch?v=0SzvZph_P4Y', // could it be
                // ...props,
                videoClass: 'video-full'
            });
        }
    }, [props]);

    return (
        <div ref={$el} className={`test jarallax ${className}`} style={{ height: '100%', width: '100%' }}>
            {children}
        </div>
    );
}