/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Button, Flex, FormLabel, Input, InputGroup, InputLeftElement, Link, NumberInput, NumberInputField, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useState } from 'react'
import { AiOutlineIdcard, AiOutlineMail, AiOutlineUser } from 'react-icons/ai'

export default function Home() {
  const parse = (val:string) =>{
    return val.replace('.','').replace('-','')
  }
  const[cpf,setcpf] = useState("") 
  const format = (val:string) => {
    return val.replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
    .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
  }
  return (
<Flex  flexDir='column' alignItems='center'>
    <img  src='/engine.png' width='350px' height='230px' />

    <Text marginTop={4} fontSize='3xl' textAlign='center'>Semana da computação</Text>

    <Text marginTop={4} color='gray.400' textAlign='center'>Faça o Cadastro e começe a usar!</Text>
    
    <FormLabel  width='sm' textAlign='left' marginTop={4} > Nome Completo</FormLabel>
    <InputGroup marginBottom={2} background='#202020' alignSelf='center' width='sm'>
      <InputLeftElement
        pointerEvents='none'
      >
      <AiOutlineUser color='gray.100' />
      </InputLeftElement>
      <Input errorBorderColor='crimson' type='email' placeholder='Username' textColor={'#7C7C8A'}/>
    </InputGroup>

      <FormLabel  width='sm' textAlign='left'  > E-mail</FormLabel>
    <InputGroup marginBottom={2} background='#202020' alignSelf='center' width='sm'>
      <InputLeftElement
        pointerEvents='none'
      ><AiOutlineMail color='gray.100' /></InputLeftElement>
      <Input errorBorderColor='crimson' type='email' placeholder='gabriel@example.com' textColor={'#7C7C8A'}/>
    </InputGroup>

    <FormLabel  width='sm' textAlign='left' > CPF</FormLabel>

    <InputGroup marginBottom={2} background='#202020' alignSelf='center' width='sm'>
      <InputLeftElement><AiOutlineIdcard color='gray.100' /></InputLeftElement>
      <NumberInput  width='full' max={12} errorBorderColor='crimson' textColor={'#7C7C8A'} value={format(cpf)} onChange={(str)=>setcpf(parse(str))} >
        <NumberInputField placeholder='123.456.789-90' pl={10}/>
      </NumberInput>
    </InputGroup>

    <FormLabel  width='sm' textAlign='left'  > Faculdade</FormLabel>
    <InputGroup marginBottom={2} background='#202020' alignSelf='center' width='sm'>
      <InputLeftElement
        pointerEvents='none'
      ><AiOutlineIdcard color='gray.100' /></InputLeftElement>
      <Input errorBorderColor='crimson' type='email' placeholder='UNIR' textColor={'#7C7C8A'}/>
    </InputGroup>

  <Button marginTop={4} alignSelf='center' width='280px' textColor={'black'} colorScheme={'twitter'} variant='solid' onClick={()=> {
        console.log("click")
      }}>Cadastrar</Button>

  <Link marginTop={4} color='gray.400' alignSelf='center' as={NextLink} href='/'>Cancelar</Link>


  </Flex> 
  )
}
