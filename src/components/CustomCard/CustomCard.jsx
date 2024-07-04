/* eslint-disable react/prop-types */
import { EditIcon, CheckIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useDisciplinas } from "../../hooks/useDisciplinas";
import {
  atualizarDisciplina,
  recuperarDisciplinas,
} from "../../services/disciplinasService";

const CustomCard = ({ item }) => {
  const { setDisciplinas } = useDisciplinas();
  const [isEditing, setIsEditing] = useState(false);
  const [descricao, setDescricao] = useState(item.descricao);
  const toast = useToast();

  // função de atualizar disciplina
  // recebe o objeto disciplina
  const submitEdit = async (disciplina) => {
    // aguarda chamada
    await atualizarDisciplina(disciplina)
      .then((res) => {
        // 'res' é o resultado da requisição
        if (res.ok) {
          toast({
            status: "success",
            title: "Disciplina editada com sucesso!",
            duration: 2000,
            isClosable: true,
          });
        } else {
          toast({
            status: "error",
            title: "Disciplina não pode ser editada, tente mais tarde.",
            duration: 2000,
            isClosable: true,
          });
        }
      })
      .catch((error) => {
        toast({
          status: "error",
          title: error,
          duration: 2000,
          isClosable: true,
        });
      });
    setIsEditing(false);
  };

  // useEffect que vai ser chamado toda vez que o valor de 'isEditing' mudar
  useEffect(() => {
    // função para buscar disciplinas salvas no banco
    const fetchDisciplinas = async () => {
      // atribuo as disciplinas salvas no banco à constante
      const disciplinasDb = await recuperarDisciplinas();
      // atualizo o nosso estado 'disciplinas' com o que tá no banco
      setDisciplinas(disciplinasDb);
    };
    // apenas quero buscar as disciplinas do banco quando isEditing for falso
    if (!isEditing) {
      fetchDisciplinas();
    }
  }, [isEditing, setDisciplinas]);

  // função que lida com o clique do botão de editar
  const handleEditClick = () => {
    // valida o estado de isEditing
    if (isEditing) {
      // chama a função de atualizar disciplina
      submitEdit({ ...item, descricao });
      // define o estado como contrário, nesse caso, false
      setIsEditing(!isEditing);
    } else {
      // caso o valor de isEditing já seja falso, apenas altera o estado
      setIsEditing(!isEditing);
    }
  };

  const handleDescricaoChange = (e) => {
    setDescricao(e.target.value);
  };

  return (
    <Flex marginRight={"2"}>
      <Card bgColor={"teal.100"}>
        <CardHeader>
          <Heading size="md"> {item.nome} </Heading>
        </CardHeader>
        <CardBody>
          <Stack spacing="4">
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Descrição:
              </Heading>
              {isEditing ? (
                <Input
                  value={descricao}
                  onChange={handleDescricaoChange}
                  pt="2"
                  fontSize="sm"
                />
              ) : (
                <Text pt="2" fontSize="sm">
                  {item.descricao}
                </Text>
              )}
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Data da criação:
              </Heading>
              <Text pt="2" fontSize="sm">
                {item.createDate}
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Código da disciplina:
              </Heading>
              <Text pt="2" fontSize="sm">
                {item.codigoDisciplina}
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Professor responsável:
              </Heading>
              <Text pt="2" fontSize="sm">
                {item.professorResponsavel}
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Pré-requisitos:
              </Heading>
              <Text pt="2" fontSize="sm">
                {item.prerequisitos}
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Créditos:
              </Heading>
              <Text pt="2" fontSize="sm">
                {item.creditos}
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Horários de aula:
              </Heading>
              <Text pt="2" fontSize="sm">
                {item.horariosAulas}
              </Text>
            </Box>
          </Stack>
        </CardBody>
        <CardFooter justifyContent={"center"}>
          <Button
            style={{
              width: 200,
            }}
            colorScheme="teal"
            onClick={handleEditClick}
          >
            {isEditing ? <CheckIcon /> : <EditIcon />}
          </Button>
        </CardFooter>
      </Card>
    </Flex>
  );
};

export default CustomCard;
