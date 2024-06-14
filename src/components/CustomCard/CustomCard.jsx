import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
  SimpleGrid,
  CardFooter,
  Button,
  Flex,
  Stack,
  Box,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

const CustomCard = () => {
  return (
    <Flex
      bgColor={"orange"}
      height="50vh"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
    >
      <SimpleGrid spacing={"1"} columns={1}>
        <Card bgColor={"orange.100"}>
          <CardHeader>
            <Heading size="md">P.O.O</Heading>
        
          </CardHeader>
          <CardBody>
            <Stack spacing="4">
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Descrição:
                </Heading>
                <Text pt="2" fontSize="sm">
                  ----------------------------
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Data da criação:
                </Heading>
                <Text pt="2" fontSize="sm">
                  -------------
                </Text>
              </Box>
            </Stack>
          </CardBody>
          <CardFooter justifyContent={"center"}>
            <Button
              style={{
                width: 200,
              }}
              colorScheme="orange"
            >
              {" "}
              <EditIcon />{" "}
            </Button>
          </CardFooter>
        </Card>
      </SimpleGrid>
    </Flex>
  );
};

export default CustomCard;
