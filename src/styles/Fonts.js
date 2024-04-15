// Fonts.js
import { Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`
      @font-face {
        font-family: "Anta";
        src: url("/fonts/anta/anta.ttf") format("truetype");
        font-weight: normal;
        font-style: normal;
        font-display: swap;
      }
    `}
  />
);

export default Fonts;
