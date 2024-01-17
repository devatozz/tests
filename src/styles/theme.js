// import the necessary modules
import { extendTheme } from "@chakra-ui/react";

// create your theme
const theme = extendTheme({
  styles: {
    global: {
      "@font-face": [
        {
          fontFamily: "Lakes",
          src: "url('../components/fonts/lakes/TT-Lakes-Neue-Trial-Black')",
        },
        // {
        //   fontFamily: "Lakes",
        //   fontStyle: "normal",
        //   fontWeight: 400,
        //   src: "url('../components/fonts/lakes/TT-Lakes-Neue-Trial-Black')",
        // },
      ],
    },
  },
});

// export the theme
export default theme;
