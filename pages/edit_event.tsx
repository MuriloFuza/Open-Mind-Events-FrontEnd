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
  Link,
  Select,
  Stack,
  StackDivider,
  Text,
  useToast
} from "@chakra-ui/react";
import axios from "axios";
import { DatePickerInput } from "chakra-datetime-picker";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const [value, setValue] = useState("");
  const [event, setEvent] = useState("");
  const [eventId, setEventId] = useState("");
  const [eventList, setEventList] = useState([]);

  const [name, setName] = useState("");
  const [init_date, setInit] = useState("");
  const [end_date, setEnd] = useState("");
  const [banner_url, setBanner] = useState("");
  const [creator, setCreator] = useState("");

  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    axios.get("http://localhost:8001/event/list").then((response) => {
      setEventList(response.data);
    });

    if (eventId !== "") {
      console.log(eventId);
      const config = {
        headers: {
          id_event: eventId,
        },
      };

      axios.get("http://localhost:8001/event/findById", config).then((response) => {
        console.log(response.data);
        setEvent(response.data);
      });
    }
  }, [eventId]);

  useEffect(() => {
    console.log(event);
    setName(event.name);
    setInit(event.init_date);
    setEnd(event.end_date);
    setBanner(event.banner_url);
    setEventId("");
  }, [event]);

  const update = () => {
    if (value !== "" && name !== "" && init_date !== "" && end_date !== "" && creator !== "") {
      axios
        .put("http://localhost:8001/event/update", {
          id: event.id,
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
              description: "Seu evento foi atualizado com sucesso",
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
      <Card marginTop={10} background="white">
        <CardHeader>
          <Text fontSize="6xl">Edição de evento</Text>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Selecione um evento
              </Heading>
              <Select
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  setEventId(e.target.value);
                }}
                placeholder="Selecione um evento"
                paddingBottom={5}
              >
                {eventList.map((event) => (
                  // eslint-disable-next-line react/jsx-key
                  <option value={event.id}>{event.name}</option>
                ))}
              </Select>

              <Heading size="xs" textTransform="uppercase">
                Nome do Evento
              </Heading>
              <Input
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="NOME DO EVENTO"
              />
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Banner
              </Heading>
              <Input
                onChange={(e) => setBanner(e.target.value)}
                value={banner_url}
                placeholder="Url do bannner"
              />
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Data Início:
              </Heading>
              <DatePickerInput
                onChange={(e) => setInit(e)}
                value={init_date}
                showTimeSelector
                currentLangKey="en"
                format="DD/MM/YYYY HH:mm"
              />
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Data Fim:
              </Heading>
              <DatePickerInput
                onChange={(e) => setEnd(e)}
                value={end_date}
                showTimeSelector
                currentLangKey="en"
                format="DD/MM/YYYY HH:mm"
              />
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Chave
              </Heading>
              <Input
                onChange={(e) => setCreator(e.target.value)}
                value={creator}
                placeholder="Insira sua chave de Administrador"
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
        onClick={update}
      >
        Salvar
      </Button>

      <Link marginTop={4} color="gray.400" alignSelf="center" as={NextLink} href="/">
        Voltar
      </Link>
    </Flex>
  );
}
