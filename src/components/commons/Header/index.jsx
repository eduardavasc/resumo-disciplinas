import { Flex, Image, Heading, Text } from '@chakra-ui/react';

const Header = () => {
  return (
    <Flex p="5" position="sticky" top="0" bgColor="white" boxShadow="xs" zIndex="2">
    <a href="/">
      <Flex align="center" gap="3">
        <Image src="/cat.png" color="gray.500" alt="cute cat" />
        <Flex direction="column">
          <Heading>Your Studies Place</Heading>
          <Text>Seu espaço para registro de disciplinas</Text>
        </Flex>
      </Flex>
    </a>
  </Flex>
);
}


export default Header;
