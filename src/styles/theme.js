import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    body: "Helvetica Neue, Neue Metana Mono Free Personal",
  },
  styles: {
    global: {
      body: {
        fontFamily: "body",
      },
    },
  },
});

export default theme;
