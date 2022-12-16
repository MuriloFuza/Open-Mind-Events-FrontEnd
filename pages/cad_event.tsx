/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import "moment/locale/pt-br";
import "react-datetime/css/react-datetime.css";

import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Input,
  Stack,
  StackDivider,
  Text,
  useToast
} from "@chakra-ui/react";
import axios from "axios";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Datetime from "react-datetime";

export default function Home() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [init_date, setInit] = useState("");
  const [end_date, setEnd] = useState("");
  const [banner_url, setBanner] = useState("");
  const [creator, setCreator] = useState("");

  const toast = useToast();

  const cadastrar = () => {
    if (name !== "" && init_date !== "" && end_date !== "" && creator !== "") {
      axios
        .post("http://localhost:8001/event/create", {
          name,
          init_date,
          end_date,
          visible: true,
          banner_url,
          creator,
        })
        .then((response) => {
          if (!response.data.error) {
            toast({
              title: "Sucesso!",
              description: "Seu evento foi criado com sucesso",
              status: "success",
              duration: 2000,
              isClosable: true,
            });
            console.log(response.data);

            router.push(`/`);
          } else {
            toast({
              title: "Error!",
              description: response.data.error,
              status: "error",
              duration: 2000,
              isClosable: true,
            });
          }
        });
    } else {
      toast({
        title: "Error!",
        description: "Preencha todos os campos!",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex flexDir="column" alignItems="center">
      <Card background="white">
        <CardHeader>
          <Text fontSize="6xl">Cadastro de evento</Text>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Nome do Evento
              </Heading>
              <Input
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="Nome do evento"
              />
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Data Início:
              </Heading>
              <Datetime
                dateFormat="DD/MM/YYYY"
                locale="pt-br"
                value={init_date}
                initialValue={new Date()}
                onChange={(e) => setInit(e)}
              />
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Data Fim:
              </Heading>
              <Datetime
                dateFormat="DD/MM/YYYY"
                locale="pt-br"
                initialValue={new Date()}
                value={end_date}
                onChange={(e) => setEnd(e)}
              />
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                URL do Banner do evento
              </Heading>
              <Input
                onChange={(e) => setBanner(e.target.value)}
                value={banner_url}
                placeholder="URL do banner"
              />
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Chave do professor
              </Heading>
              <Input
                onChange={(e) => setCreator(e.target.value)}
                value={creator}
                placeholder="Chave"
              />
            </Box>
          </Stack>
        </CardBody>
      </Card>

      <Button
        marginTop={4}
        alignSelf="center"
        width="280px"
        textColor="black"
        colorScheme="twitter"
        variant="solid"
        onClick={cadastrar}
      >
        Cadastrar
      </Button>

      <Button
        marginTop={4}
        width="280px"
        colorScheme="red"
        alignSelf="center"
        as={NextLink}
        href="/"
      >
        Voltar
      </Button>
    </Flex>
  );
}
