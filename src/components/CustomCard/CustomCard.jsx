/* eslint-disable react/prop-types */
import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";

const CustomCard = ({ item, itemIndex, disciplinas }) => {

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
              <Text pt="2" fontSize="sm">
                {item.descricao}
              </Text>
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
          >
            {" "}
            <EditIcon />{" "}
          </Button>
        </CardFooter>
      </Card>
    </Flex>
  );
};

export default CustomCard;
