/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Input,
  Select,
  Stack,
  StackDivider,
  useToast
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [eventList, setEventList] = useState([]);
  const [value, setValue] = useState("");
  const [key, setKey] = useState("");

  const toast = useToast();

  useEffect(() => {
    axios.get("http://localhost:8001/event/list").then((response) => {
      setEventList(response.data);
    });
  });

  const deletar = () => {
    if (key !== "" && value !== "") {
      axios
        .delete("http://localhost:8001/event/delete", {
          data: {
            id: value,
            key,
          },
        })
        .then((response) => {
          if (!response.data.error) {
            toast({
              title: "Sucesso!",
              description: "Seu evento foi excluido",
              status: "success",
              duration: 2000,
              isClosable: true,
            });
            console.log(response.data);
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
    <Flex marginBottom="16" flexDir="column" alignItems="center">
      <Card marginTop={10} background="white">
        <CardHeader>
          <Heading fontSize="6xl">Exclusão de Eventos</Heading>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Evento
              </Heading>
              <Select
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Selecione um evento"
                paddingBottom={5}
              >
                {eventList.map((event) => (
                  // eslint-disable-next-line react/jsx-key
                  <option value={event.id}>{event.name}</option>
                ))}
              </Select>
              <Heading size="xs" textTransform="uppercase">
                Chave
              </Heading>
              <Input
                onChange={(e) => setKey(e.target.value)}
                value={key}
                placeholder="Insira sua chave de Administrador"
              />
            </Box>
          </Stack>
          <Button onClick={deletar} marginTop={4} width="280px" colorScheme="red">
            Deletar
          </Button>
        </CardBody>
      </Card>
    </Flex>
  );
}
