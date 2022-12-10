/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { EmailIcon } from '@chakra-ui/icons'
import { Button, Flex, FormLabel, Input, InputGroup, InputLeftElement, Link, Text } from '@chakra-ui/react'
import NextLink from 'next/link'

export default function Home() {
  return (
<Flex  flexDir='column' alignItems='center'>
    <img  src='/engine.png' width='350px' height='230px' />

    <Text marginTop={4} fontSize='3xl' textAlign='center'>Semana da computação</Text>

    <Text marginTop={4} color='gray.400' textAlign='center'>Informe o e-mail para recuperar a senha</Text>
    
      <FormLabel  width='sm' textAlign='left' marginTop={4} > E-mail</FormLabel>
      <InputGroup marginBottom={2} background='#202020' alignSelf='center' width='sm'>
      <InputLeftElement>
      <EmailIcon color='gray.100' />
      </InputLeftElement>
      <Input errorBorderColor='crimson' type='email' placeholder='gabriel@example.com' textColor={'#7C7C8A'}/>
    </InputGroup>

  <Button marginTop={4} alignSelf='center' width='280px' textColor={'black'} colorScheme={'twitter'} variant='solid' onClick={()=> {
        console.log("click")
      }}>Enviar</Button>

  <Link marginTop={4} color='gray.400' alignSelf='center' as={NextLink} href='/'>Voltar</Link>

  </Flex> 
  )
}
