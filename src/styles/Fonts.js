// Fonts.js
import { Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`
      @font-face {
        font-family: "Anta";
        font-weight: normal;
        font-style: normal;
        font-display: swap;
      }
    `}
  />
);

export default Fonts;
