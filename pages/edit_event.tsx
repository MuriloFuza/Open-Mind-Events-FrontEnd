/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Box, Button, Card, CardBody, CardHeader, Flex, Heading, Input, Link, Stack, StackDivider, Text, Textarea } from '@chakra-ui/react'
import { DatePickerInput } from 'chakra-datetime-picker'
import NextLink from 'next/link'

export default function Home() {
  return (
<Flex  flexDir='column' alignItems='center'>
    <img  src='/engine.png' width='350px' height='230px' />

  <Card marginTop={10} background='white'>
  <CardHeader>
    <Text fontSize='6xl'>Edição de evento</Text>
  </CardHeader>

  <CardBody>
    <Stack divider={<StackDivider />} spacing='4'>
    <Box>
        <Heading size='xs' textTransform='uppercase'>
          Nome do Evento
        </Heading>
        <Input  placeholder='NOME DO EVENTO'/>
      </Box>
      <Box>
        <Heading size='xs' textTransform='uppercase'>
          Descrição
        </Heading>
        <Textarea placeholder='Aqui você coloca a descrição'/>
      </Box>
      <Box>
        <Heading size='xs' textTransform='uppercase'>
          Data Início:
        </Heading>
        <DatePickerInput
          showTimeSelector currentLangKey='en'format='DD/MM/YYYY HH:mm'
        />
      </Box>
      <Box>
        <Heading size='xs' textTransform='uppercase'>
          Data Fim:
        </Heading>
        <DatePickerInput
          showTimeSelector currentLangKey='en' format='DD/MM/YYYY HH:mm'
        />
      </Box>
    </Stack>
  </CardBody>
</Card>

    <Button marginTop={4} alignSelf='center' width='280px' textColor={'black'} colorScheme={'twitter'} variant='solid' onClick={()=> {       
      }}>Salvar</Button>

  <Link marginTop={4} color='gray.400' alignSelf='center' as={NextLink} href='/'>Voltar</Link>

  </Flex> 
  )
}
