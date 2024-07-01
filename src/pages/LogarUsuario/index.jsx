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
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { recuperarUsuario } from "../../services/userService";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Email inválido").required("Email é obrigatório"),
  senha: Yup.string().required("Senha é obrigatória"),
});

const LogarUsuario = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false)
  const {setUsuario} = useAuth()

  const navigate = useNavigate();

  const handleShowClick = () => setShowPassword(!showPassword);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      const usuario = await recuperarUsuario(data)
      if (usuario) {
        setUsuario({
          email: usuario.email,
          nome: usuario.nome,
          logado: true
        })
        setLoading(false)
        alert('Usuário logado com sucesso')
        navigate('/')
      } else {
        setLoading(false)
        alert('Usuário não encontrado')
      }
    } catch (e) {
      setLoading(false)
      alert(e.message)
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
              <FormControl isInvalid={errors.email}>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                  />
                </InputGroup>
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.senha}>
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
                <FormErrorMessage>
                  {errors.senha && errors.senha.message}
                </FormErrorMessage>
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
                      bg: 'teal.700',}}
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