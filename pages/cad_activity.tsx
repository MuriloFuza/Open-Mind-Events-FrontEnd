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
  Select,
  Stack,
  StackDivider,
  useToast
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Datetime from "react-datetime";

export default function Home() {
  const [eventList, setEventList] = useState([]);
  const [value, setValue] = useState("");
  const [name, setName] = useState("");
  const [init_date, setInit] = useState("");
  const [end_date, setEnd] = useState("");
  const [speaker, setSpeaker] = useState("");
  const [key, setKey] = useState("");

  const toast = useToast();

  useEffect(() => {
    axios.get("http://localhost:8001/event/list").then((response) => {
      setEventList(response.data);
    });
  }, []);

  const cadastrar = () => {
    if (
      key !== "" &&
      value !== "" &&
      name !== "" &&
      init_date !== "" &&
      end_date !== "" &&
      speaker !== ""
    ) {
      axios
        .post("http://localhost:8001/activity/create", {
          name,
          init_date,
          end_date,
          event_id: value,
          speaker_name: speaker,
          key,
        })
        .then((response) => {
          setName("");
          setSpeaker("");
          setInit("");
          setEnd("");
          toast({
            title: "Success!",
            description: "Atividade cadastrada com sucesso!",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
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
          <Heading fontSize="6xl">Cadastro de atividades</Heading>
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
                Nome
              </Heading>
              <Input
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="Insira o nome do evento"
              />
              <Heading mt={2} size="xs" textTransform="uppercase">
                Data Inicio:
              </Heading>
              <Datetime
                dateFormat="DD/MM/YYYY"
                locale="pt-br"
                initialValue={new Date()}
                value={init_date}
                onChange={(e) => setInit(e)}
              />
              <Heading mt={2} size="xs" textTransform="uppercase">
                Data Fim:
              </Heading>
              <Datetime
                dateFormat="DD/MM/YYYY"
                locale="pt-br"
                initialValue={new Date()}
                value={end_date}
                onChange={(e) => setEnd(e)}
              />
              <Heading mt={2} size="xs" textTransform="uppercase">
                Palestrante
              </Heading>
              <Input
                onChange={(e) => setSpeaker(e.target.value)}
                value={speaker}
                placeholder="Insira o nome do palestrante"
              />
              <Heading mt={2} size="xs" textTransform="uppercase">
                Chave
              </Heading>
              <Input
                onChange={(e) => setKey(e.target.value)}
                value={key}
                placeholder="Insira sua chave de Administrador"
              />
            </Box>
          </Stack>
          <Button onClick={cadastrar} marginTop={4} width="280px" colorScheme="twitter">
            Cadastrar
          </Button>
        </CardBody>
      </Card>
    </Flex>
  );
}
