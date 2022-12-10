/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Box, Button, Card, CardBody, CardHeader, Flex, Heading, Link, Stack, StackDivider, Text } from '@chakra-ui/react'
import NextLink from 'next/link'

export default function Home() {
  return (
<Flex  flexDir='column' alignItems='center'>
    <img  src='/engine.png' width='350px' height='230px' />

    <Card marginTop={10} background='white'>
  <CardHeader>
    <Heading fontSize='6xl'>Lista de Eventos</Heading>
  </CardHeader>

  <CardBody>
    <Stack divider={<StackDivider />} spacing='4'>
      <Box>
        <Heading size='xs' textTransform='uppercase'>
          Nome do evento
        </Heading>
        <Text pt='2' fontSize='sm'>
          Descrição do evento
        </Text>
        <Link color='blue.400' alignSelf='initial' as={NextLink} href='/event'>Ver evento</Link>
      </Box>
      <Box>
        <Heading size='xs' textTransform='uppercase'>
          Nome do evento 2
        </Heading>
        <Text pt='2' fontSize='sm'>
          Descrição do evento 2
        </Text>
        <Link color='blue.400' alignSelf='initial' as={NextLink} href='/event'>Ver evento</Link>
      </Box>
      <Box>
        <Heading size='xs' textTransform='uppercase'>
          Nome do evento 3
        </Heading>
        <Text pt='2' fontSize='sm'>
          Descrição do evento 3
        </Text>
        <Link color='blue.400' alignSelf='initial' as={NextLink} href='/event'>Ver evento</Link>
      </Box>
      <Box>
        <Heading size='xs' textTransform='uppercase'>
          Nome do evento 4
        </Heading>
        <Text pt='2' fontSize='sm'>
          Descrição do evento 4 
        </Text>
        <Link color='blue.400' alignSelf='initial' as={NextLink} href='/event'>Ver evento</Link>
      </Box>
      <Box>
        <Heading size='xs' textTransform='uppercase'>
          Nome do evento 5
        </Heading>
        <Text pt='2' fontSize='sm'>
          Descrição do evento 5
        </Text>
        <Link color='blue.400' alignSelf='initial' as={NextLink} href='/event'>Ver evento</Link>
      </Box>
    </Stack>
  </CardBody>
</Card>

  <Button marginTop={4} alignSelf='center' width='280px' textColor={'black'} colorScheme={'twitter'} variant='solid' onClick={()=> {
        console.log("click")
      }}>Cadastrar</Button>

  <Link marginTop={4} color='gray.400' alignSelf='center' as={NextLink} href='/'>Voltar</Link>

  </Flex> 
  )
}
