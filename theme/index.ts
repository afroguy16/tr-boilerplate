import { extendTheme, ThemeConfig } from "@chakra-ui/react"
import colors from "./foundations/colors"

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
}

const overrides = {
  colors,
  config
}

const chessdropTheme = extendTheme(overrides)

export default chessdropTheme;