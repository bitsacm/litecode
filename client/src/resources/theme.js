import { extendTheme } from '@chakra-ui/react'

const theme = {
  colors: {
    transparent: "transparent",
    black: "#030303",
    white: "#fff",
    liteblue: "#059FC9",
    liteblues: "rgba(52, 209, 252, 0.23)",
    litegrey: {
      600: "#718096",
      400: "#A0AEC0",
      20: "#F7FAFC",
    },
    litegold: "#ED8936",
    litered: "#E53E3E"
  },
  fonts: {
      primary: "Roboto, sans-serif",
      heading: "Roboto, sans-serif",
      body: "Roboto, sans-serif"
  },
  config: {
      useSystemColorMode: false,
  },
}


export default extendTheme(theme);