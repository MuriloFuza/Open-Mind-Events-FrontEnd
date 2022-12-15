/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Link,
  Stack,
  StackDivider
} from "@chakra-ui/react";
import axios from "axios";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const [eventList, setEventList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    axios.get("http://localhost:8001/event/list").then((response) => {
      console.log(response.data);
      setEventList(response.data);
    });
  }, []);

  const verEvent = (id: string) => {
    router.push({
      pathname: `/event/${id}`,
      query: { id: id },
    });
  };

  return (
    <Flex marginBottom="16" flexDir="column" alignItems="center">
      <Card background="white">
        <CardHeader>
          <Heading fontSize="6xl">Lista de Eventos</Heading>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            {eventList.map((event) => (
              <Box key={event.id}>
                <Heading size="xs" textTransform="uppercase">
                  {event.name}
                </Heading>

                <Link
                  color="blue.400"
                  alignSelf="initial"
                  as={NextLink}
                  href={`/event/${event.id}`}
                >
                  Ver evento
                </Link>
              </Box>
            ))}
          </Stack>
        </CardBody>
      </Card>
    </Flex>
  );
}
