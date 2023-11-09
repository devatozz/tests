// import the necessary modules
import { extendTheme } from "@chakra-ui/react";

// create your theme
const theme = extendTheme({
  styles: {
    global: {
      "@font-face": [
        {
          fontFamily: "Relative",
          fontStyle: "normal",
          fontWeight: 400,
          src: "url('../components/fonts/relative/relative-book-pro.eot')",
        },
        {
          fontFamily: "RelativeNumber",
          fontStyle: "normal",
          fontWeight: 400,
          src: "url('../components/fonts/relative/relative-book-pro.eot')",
        },
      ],
    },
  },
});

// export the theme
export default theme;
