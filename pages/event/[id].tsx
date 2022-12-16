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
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const { query } = useRouter();

  const toast = useToast();

  const [event, setEvent] = useState();
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");

  const { id } = query;

  const inscricao = () => {
    if (key !== "" && key.length === 36) {
      const config = {
        headers: {
          event_id: id,
          user_key: key,
        },
      };

      axios.get("http://localhost:8001/event/participantInEvent", config).then((response) => {
        if (!response.data) {
          axios
            .post("http://localhost:8001/event/registerInEvent", {
              eventId: id,
              userKey: key,
            })
            .then((response) => {
              toast({
                title: "Success!",
                description: "Você se inscrivel no evento com sucesso!",
                status: "success",
                duration: 2000,
                isClosable: true,
              });
              setKey("");
            })
            .catch((error) => {
              toast({
                title: "Error!",
                description: error.response.data.error,
                status: "error",
                duration: 2000,
                isClosable: true,
              });
            });
        } else {
          toast({
            title: "Error!",
            description: "Você já está inscrito neste evento",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        }
      });
    } else {
      toast({
        title: "Error!",
        description: "Preencha o campo Chave corretamente",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    const config = {
      headers: {
        id_event: id,
      },
    };

    axios.get("http://localhost:8001/event/findById", config).then((response) => {
      console.log(response.data);
      setEvent(response.data);
    });
  }, []);

  const intlDateOptions: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  return (
    <Flex flexDir="column" alignItems="center">
      <Card background="white">
        <CardHeader>
          <Heading fontSize="6xl">{event?.name}</Heading>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Data Início:
              </Heading>
              <Text pt="2" fontSize="sm">
                {Intl.DateTimeFormat("pt-br", intlDateOptions).format(
                  new Date(event?.init_date ?? new Date())
                )}
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Data Fim:
              </Heading>
              <Text pt="2" fontSize="sm">
                {Intl.DateTimeFormat("pt-br", intlDateOptions).format(
                  new Date(event?.end_date ?? new Date())
                )}
              </Text>
            </Box>
            <Box>
              <Select
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Lista de atividades"
                paddingBottom={5}
              >
                {event?.activity.map((activity) => (
                  // eslint-disable-next-line react/jsx-key
                  <option value={activity.id}>{activity.name}</option>
                ))}
              </Select>
              {value ? (
                <Box>
                  <Text>
                    Palestrante: {event?.activity?.find((a) => a.id === value)?.speaker_name}
                  </Text>
                  <Text>
                    Data de inicio:{" "}
                    {Intl.DateTimeFormat("pt-br", intlDateOptions).format(
                      new Date(
                        event?.activity?.find((a) => a.id === value)?.init_date ?? new Date()
                      )
                    )}
                  </Text>
                  <Text>
                    Data de termino:{" "}
                    {Intl.DateTimeFormat("pt-br", intlDateOptions).format(
                      new Date(event?.activity?.find((a) => a.id === value)?.end_date ?? new Date())
                    )}
                  </Text>
                </Box>
              ) : null}
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Sua chave
              </Heading>
              <Input onChange={(e) => setKey(e.target.value)} value={key} />
            </Box>
            <Button onClick={inscricao} colorScheme="twitter">
              Inscrever
            </Button>
          </Stack>
        </CardBody>
      </Card>

      <Link marginTop={4} color="gray.400" alignSelf="center" as={NextLink} href="/">
        Voltar
      </Link>
    </Flex>
  );
}
