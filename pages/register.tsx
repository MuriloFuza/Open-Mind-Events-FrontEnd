/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import {
  Button,
  Flex,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import axios from "axios";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineIdcard, AiOutlineMail, AiOutlineUser } from "react-icons/ai";

export default function Home() {
  const [cpf, setcpf] = useState("");
  const [key, setKey] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [university, setUniversity] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    console.log(cpf);
  }, [cpf]);

  const format = (val: string) => {
    return val
      .replace(/\D/g, "") // substitui qualquer caracter que nao seja numero por nada
      .replace(/(\d{3})(\d)/, "$1.$2") // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1"); // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
  };

  const cadastrar = () => {
    axios
      .post("http://localhost:8001/user/create", {
        name,
        cpf,
        email,
        university,
      })
      .then((response) => {
        console.log(response);
        console.table(response.data);

        if (!response.data.error) {
          onOpen();
          setKey(response.data.key);
        }
      });
  };

  return (
    <Flex pb={10} flexDir="column" alignItems="center">
      <Text marginTop={4} fontSize="3xl" textAlign="center">
        Open Mind Events
      </Text>

      <Text marginTop={4} color="gray.400" textAlign="center">
        Faça o Cadastro e começe a usar!
      </Text>

      <FormLabel width="sm" textAlign="left" marginTop={4}>
        Nome Completo
      </FormLabel>
      <InputGroup marginBottom={2} background="#202020" alignSelf="center" width="sm">
        <InputLeftElement pointerEvents="none">
          <AiOutlineUser color="gray.100" />
        </InputLeftElement>
        <Input
          onChange={(e) => setName(e?.target.value)}
          value={name}
          errorBorderColor="crimson"
          type="email"
          placeholder="Username"
          textColor="#7C7C8A"
        />
      </InputGroup>

      <FormLabel width="sm" textAlign="left">
        {" "}
        E-mail
      </FormLabel>
      <InputGroup marginBottom={2} background="#202020" alignSelf="center" width="sm">
        <InputLeftElement pointerEvents="none">
          <AiOutlineMail color="gray.100" />
        </InputLeftElement>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          errorBorderColor="crimson"
          type="email"
          placeholder="gabriel@example.com"
          textColor="#7C7C8A"
        />
      </InputGroup>

      <FormLabel width="sm" textAlign="left">
        {" "}
        CPF
      </FormLabel>

      <InputGroup marginBottom={2} background="#202020" alignSelf="center" width="sm">
        <InputLeftElement>
          <AiOutlineIdcard color="gray.100" />
        </InputLeftElement>
        <Input
          width="full"
          maxLength={14}
          errorBorderColor="crimson"
          textColor="#7C7C8A"
          value={format(cpf)}
          onChange={(e) => setcpf(e.target.value)}
        />
      </InputGroup>

      <FormLabel width="sm" textAlign="left">
        {" "}
        Faculdade
      </FormLabel>
      <InputGroup marginBottom={2} background="#202020" alignSelf="center" width="sm">
        <InputLeftElement pointerEvents="none">
          <AiOutlineIdcard color="gray.100" />
        </InputLeftElement>
        <Input
          onChange={(e) => setUniversity(e.target.value)}
          value={university}
          errorBorderColor="crimson"
          type="email"
          placeholder="UNIR"
          textColor="#7C7C8A"
        />
      </InputGroup>

      <Button
        onClick={cadastrar}
        marginTop={4}
        alignSelf="center"
        width="280px"
        textColor="black"
        colorScheme="twitter"
        variant="solid"
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
        Cancelar
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textColor="black">Cadastro Realizado</ModalHeader>
          <ModalCloseButton />
          <ModalBody textColor="black">
            Seu cadastro foi realizado com sucesso! A chave de acesso lhe será mostrada apenas está
            vez, guarde bem pois a mesma será necessária para se cadastrar nos eventos.
            <br />
            Chave: {key}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="twitter" mr={3} onClick={onClose} as={NextLink} href="/event_list">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
