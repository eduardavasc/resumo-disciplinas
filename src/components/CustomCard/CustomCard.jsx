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
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useDisciplinas } from "../../hooks/useDisciplinas";

const CustomCard = ({ item, itemIndex }) => {
  const { setDisciplinas } = useDisciplinas();
  const [isEditing, setIsEditing] = useState(false);
  const [descricao, setDescricao] = useState(item.descricao);

  useEffect(() => {
    // Atualiza a descrição do item no array de disciplinas quando a descrição local mudar
    setDisciplinas((prevDisciplinas) =>
      prevDisciplinas.map((disciplina, index) =>
        index === itemIndex ? { ...disciplina, descricao } : disciplina
      )
    );
  }, [descricao, itemIndex, setDisciplinas]);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
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
