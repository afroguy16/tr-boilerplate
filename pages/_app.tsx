import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'

import chessdropTheme from '../theme'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={chessdropTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
