/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { CheckIcon, EmailIcon, LockIcon } from '@chakra-ui/icons'
import { Button, Checkbox, Flex, FormLabel, IconButton, Input, InputGroup, InputLeftElement, InputRightElement, Link, Spacer, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import { BsFacebook } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'

export default function Home() {
  return (
<Flex  flexDir='column' alignItems='center'>
    <img  src='/engine.png' width='350px' height='230px' />

    <Text marginTop={4} fontSize='3xl' textAlign='center'>Semana da computação</Text>

    <Text marginTop={4} color='gray.400' textAlign='center'>Faça o Login e começe a usar!</Text>
    
      <FormLabel  width='sm' textAlign='left' marginTop={4} > E-mail</FormLabel>
      <InputGroup marginBottom={2} background='#202020' alignSelf='center' width='sm'>
      <InputLeftElement
        pointerEvents='none'  
      ><EmailIcon color='gray.100' />
      </InputLeftElement>
      <Input errorBorderColor='crimson' type='email' placeholder='E-mail' textColor={'#7C7C8A'}/>
    </InputGroup>

  <FormLabel width='sm' textAlign='left' > Senha</FormLabel>
  <InputGroup marginBottom={2} background='#202020' alignSelf='center' width='sm'>
    <InputLeftElement
      pointerEvents='none'
      color='gray.300'
      fontSize='1.2em'
    ><LockIcon color={'gray.100'}/>
    </InputLeftElement>
    <Input errorBorderColor='crimson' type='password' placeholder='Password' textColor={'#7C7C8A'} />
    <InputRightElement>
    <CheckIcon color='green.500' />
    </InputRightElement>
  </InputGroup>

  <Checkbox alignSelf='center' defaultChecked>Lembrar de mim por 30 dias</Checkbox>

  <Button marginTop={4} alignSelf='center' width='280px' textColor={'black'} colorScheme={'twitter'} variant='solid' onClick={()=> {
        console.log("click")
      }}>Logar</Button>

  <Link marginTop={4} color='gray.400' alignSelf='center' as={NextLink} href='forget'>Esqueceu sua senha?</Link>

  <Link marginTop={4} color='gray.400' alignSelf='center' as={NextLink} href='register'>Não possui conta? Crie uma agora!</Link>
  
  <Flex width='7.5%' marginTop={4} display='flex'>
    <IconButton aria-label='google' icon={<FcGoogle/>}/>
    <Spacer />
    <IconButton aria-label='facebook' colorScheme='facebook' icon={<BsFacebook/>}/>
  </Flex>

  </Flex> 
  )
}
