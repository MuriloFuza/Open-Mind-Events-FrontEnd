import { ChakraProvider, Flex } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import '../styles/globals.css'
import {NavBar} from '../components/navbar'
import {LogoPage} from '../components/logo_page'
import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'black',
        color: 'white',
      },
      a: {
        color: 'teal.500',
        _hover: {
          textDecoration: 'underline',
        },
      },
    },
  },
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <NavBar  />
      <Flex flexDir='column' alignItems={'center'}> 
        <LogoPage/>
      </Flex>
      <Component  {...pageProps} />
    </ChakraProvider>
  )
}