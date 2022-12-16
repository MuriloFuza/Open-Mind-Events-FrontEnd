/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Select,
  Stack,
  StackDivider,
  Text
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [eventList, setEventList] = useState([]);
  const [attendanceList, setAttendanceList] = useState({});
  const [value, setValue] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8001/event/list").then((response) => {
      setEventList(response.data);
    });
  }, []);

  useEffect(() => {
    if (value !== "") {
      const config = {
        headers: {
          event_id: value,
        },
      };

      axios.get("http://localhost:8001/event/listParticipants", config).then((response) => {
        if (response.data?.list) {
          setAttendanceList(response.data);
        } else {
          setAttendanceList({});
        }
      });
    }
  }, [value]);

  return (
    <Flex marginBottom="16" flexDir="column" alignItems="center">
      <Card marginTop={10} background="white">
        <CardHeader>
          <Heading fontSize="6xl">Lista de participantes</Heading>
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
              {attendanceList?.list?.length >= 0 ? (
                <Box>
                  {attendanceList?.list?.map((name) => (
                    <Text key={name}> Nome: {name} </Text>
                  ))}
                </Box>
              ) : null}
            </Box>
          </Stack>
        </CardBody>
      </Card>
    </Flex>
  );
}
