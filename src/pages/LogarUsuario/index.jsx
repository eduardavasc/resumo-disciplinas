/* eslint-disable react/no-children-prop */
import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  FormErrorMessage,
  useToast,
  FormLabel
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { recuperarUsuario } from "../../services/userService";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const validationSchema = z.object({
  email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
  senha: z.string().min(1, "Senha é obrigatória")
});

const LogarUsuario = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setUsuario } = useAuth();

  const navigate = useNavigate();
  const toast = useToast();

  const handleShowClick = () => setShowPassword(!showPassword);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm({
    resolver: zodResolver(validationSchema),
    mode: "onBlur"
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const usuario = await recuperarUsuario(data);
      if (usuario) {
        setUsuario({
          email: usuario.email,
          nome: usuario.nome,
          logado: true
        });
        setLoading(false);
        toast({
          status: 'success',
          title: 'Usuário logado com sucesso.',
          duration: 2000,
          isClosable: true,
        });
        navigate('/');
      } else {
        setLoading(false);
        toast({
          status: 'error',
          title: 'Usuário não encontrado.',
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (e) {
      setLoading(false);
      alert(e.message);
    }
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="teal.50"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.700">Entrar</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
              borderRadius={10}
            >
              <FormControl isInvalid={touchedFields.email && errors.email}>
                <FormLabel>E-mail:</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    type="email"
                    placeholder="E-mail"
                    {...register("email")}
                  />
                </InputGroup>
                {touchedFields.email && errors.email && (
                  <FormErrorMessage>
                    {errors.email.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={touchedFields.senha && errors.senha}>
                <FormLabel>Senha:</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Senha"
                    {...register("senha")}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Ocultar" : "Mostrar"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {touchedFields.senha && errors.senha && (
                  <FormErrorMessage>
                    {errors.senha.message}
                  </FormErrorMessage>
                )}
                <FormHelperText textAlign="right">
                  <Link>Esqueceu a senha?</Link>
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={10}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
                isLoading={loading}
                bg={'teal.500'}
                _hover={{
                  bg: 'teal.700',
                }}
              >
                Entrar
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        Novo aqui?{" "}
        <Link color="teal.500" href="/cadastrar-usuario">
          Cadastre-se
        </Link>
      </Box>
    </Flex>
  );
};

export default LogarUsuario;
