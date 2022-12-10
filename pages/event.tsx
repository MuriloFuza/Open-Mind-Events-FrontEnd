/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Box, Card, CardBody, CardHeader, Flex, Heading, Link, Stack, StackDivider, Text } from '@chakra-ui/react'
import NextLink from 'next/link'

export default function Home() {
  return (
<Flex  flexDir='column' alignItems='center'>
    <img  src='/engine.png' width='350px' height='230px' />

  <Card marginTop={10} background='white'>
  <CardHeader>
    <Heading fontSize='6xl'>Nome do evento</Heading>
  </CardHeader>

  <CardBody>
    <Stack divider={<StackDivider />} spacing='4'>
      <Box>
        <Heading size='xs' textTransform='uppercase'>
          Descrição
        </Heading>
        <Text pt='2' fontSize='sm'>
          Aqui você coloca a descrição do evento
        </Text>
      </Box>
      <Box>
        <Heading size='xs' textTransform='uppercase'>
          Data Início:
        </Heading>
        <Text pt='2' fontSize='sm'>
          Aqui é pra colocar data do início do evento como dd/mm/yyyy hh:mm
        </Text>
      </Box>
      <Box>
        <Heading size='xs' textTransform='uppercase'>
          Data Fim:
        </Heading>
        <Text pt='2' fontSize='sm'>
          Aqui é pra colocar data do fim do evento evento como dd/mm/yyyy hh:mm
        </Text>
      </Box>
    </Stack>
  </CardBody>
</Card>

  <Link marginTop={4} color='gray.400' alignSelf='center' as={NextLink} href='/'>Voltar</Link>

  </Flex> 
  )
}
