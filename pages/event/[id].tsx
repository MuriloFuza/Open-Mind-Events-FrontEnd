/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Box, Button, Card, CardBody, CardHeader, Flex, Heading, Input, Link, Stack, StackDivider, Text } from '@chakra-ui/react'
import axios from 'axios'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Home() {

  const { query} = useRouter() 

  const [event, setEvent] = useState()
  const [key, setKey] = useState()

  const {id} = query

  const inscricao = () => {
    axios.post('http://localhost:8001/event/registerInEvent', {
      eventId: id,
      userKey: key
    })
  }

  useEffect(() => {
    axios.get('http://localhost:8001/event/findById', {
      params: {
        id
      }
    }).then((response) => {
      console.log(response.data)
      setEvent(response.data)
    })
  }, [])
  

  const intlDateOptions: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };


  return (
<Flex  flexDir='column' alignItems='center'>

  <Card background='white'>
  <CardHeader>
    <Heading fontSize='6xl'>{event?.name}</Heading>
  </CardHeader>

  <CardBody>
    <Stack divider={<StackDivider />} spacing='4'>
      <Box>
        <Heading size='xs' textTransform='uppercase'>
          Data Início:
        </Heading>
        <Text pt='2' fontSize='sm'>
          {Intl.DateTimeFormat('pt-br', intlDateOptions).format(new Date(event?.init_date ?? new Date()) )}
        </Text>
      </Box>
      <Box>
        <Heading size='xs' textTransform='uppercase'>
          Data Fim:
        </Heading>
        <Text pt='2' fontSize='sm'>
        {Intl.DateTimeFormat('pt-br', intlDateOptions).format(new Date(event?.end_date ?? new Date()) )}
        </Text>
      </Box>
      <Input onChange={(e) => setKey(e.target.value)} value={key} />
      <Button onClick={inscricao} colorScheme={'twitter'}>
        Inscrever
      </Button>
    </Stack>
  </CardBody>
</Card>

  <Link marginTop={4} color='gray.400' alignSelf='center' as={NextLink} href='/'>Voltar</Link>
  </Flex> 
  )
}
