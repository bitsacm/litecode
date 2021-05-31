import { extendTheme } from '@chakra-ui/react'

const theme = {
    colors: {
      transparent: "transparent",
      black: "#030303",
      white: "#fff",
      lite: "#D1E4FF",
      grey: {
        700: "#2D3748",
        500: "#535353",
        300: "#ACACAC",
        200: "DEDEDE",
        100: "#EEEEEE",
        20: "#EDF2F7"
      },
      
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