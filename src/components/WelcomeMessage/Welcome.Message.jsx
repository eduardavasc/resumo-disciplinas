import { Box, Text, Heading, VStack, Image, Link } from "@chakra-ui/react";

const WelcomeMessage = () => {
  return (
    <Box
      bg="teal.500"
      color="white"
      p={4}
      borderRadius="lg"
      boxShadow="md"
      maxWidth="800px"
      mx="auto"
      mt={8}
      textAlign="justify"
    >
      <VStack spacing={2}>
        <Image
          src="/coffereal.png" 
          alt="Tech Cat"
          boxSize="50px"
          mx="auto"
        />
        <Heading as="h1" size="xl" mt={4}>
          Bem-vindo ao Studies Place!
        </Heading>
        <Text fontSize="lg">
          Olá! Eu sou o Studies Place, um projeto criado com o objetivo de auxiliar o aprendizado sobre frontend e React. Aqui, você pode se cadastrar, fazer login e logout. Ao estar logado, você pode cadastrar suas disciplinas, que se transformam em cards. Cada card de disciplina pode conter uma descrição e a data de criação. Além disso, você pode filtrar as disciplinas por nome.
        </Text>
        
        <Text fontSize="lg">
          Este é um projeto em andamento, e muitas melhorias ainda estão por vir. Fique ligado!
        </Text>

        <Link href="https://www.linkedin.com/in/mariaeduardavasconcelos/" isExternal mt={4}>
          <Image
            src="/eu.jpg" 
            alt="Sua Foto"
            boxSize="100px"
            borderRadius="full"
            mx="auto"
            border="2px solid white"
            _hover={{ opacity: 0.8 }}
          />
        </Link>
      </VStack>
    </Box>
  );
};

export default WelcomeMessage;
