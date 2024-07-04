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
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  useToast
} from "@chakra-ui/react";
import { FaUserAlt, FaLock, FaCalendar } from "react-icons/fa";
import { FiAtSign } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { criarUsuario } from "../../services/userService";
import { useNavigate } from "react-router-dom";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const CFaCalendar = chakra(FaCalendar);
const CFiAtSign = chakra(FiAtSign);

const signUpSchema = z.object({
  nome: z.string().min(1, { message: 'Nome é obrigatório' }),
  email: z.string().email("Email inválido").min("Email é obrigatório"),
  senha: z.string().min(6, "Senha deve ter pelo menos 6 caracteres").min("Senha é obrigatória"),
  dataNascimento: z.string().min("Data de nascimento é obrigatória")
});

const CadastrarUsuario = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }} = useForm({
    resolver: zodResolver(signUpSchema),
     mode: "onTouched"
  });
  const navigate = useNavigate();
  const toast = useToast();

  const handleShowClick = () => setShowPassword(!showPassword);

  const onSubmit = async (data) => {
    try {
      const res = await criarUsuario(data);
      if (res.ok) {
        toast({
          status: 'success',
          title: 'Usuário criado com sucesso!',
          duration: 2000,
          isClosable: true,
        });
        navigate('/logar-usuario');
      } else {
        toast({
          status: 'error',
          title: 'Não foi possível criar o usuário, tente novamente mais tarde.',
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (e) {
      toast({
        status: 'error',
        title: e.message,
        duration: 2000,
        isClosable: true,
      });
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
        <Heading color="teal.700">Cadastro</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl isInvalid={errors.nome}>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input placeholder="Nome" {...register("nome")} />
                </InputGroup>
                {errors.nome && <FormHelperText>{errors.nome.message}</FormHelperText>}
              </FormControl>
              <FormControl isInvalid={errors.email}>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFiAtSign color="gray.300" />}
                  />
                  <Input type="email" placeholder="Email" {...register("email")} />
                </InputGroup>
                {errors.email && <FormHelperText>{errors.email.message}</FormHelperText>}
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
                    <Button h="1.75rem" size="sm" onClick={handleShowClick} marginRight={2}>
                      {showPassword ? "Ocultar" : "Mostrar"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {errors.senha && <FormHelperText>{errors.senha.message}</FormHelperText>}
              </FormControl>
              <FormControl isInvalid={errors.dataNascimento}>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaCalendar color="gray.300" />}
                  />
                  <Input type="date" placeholder="Data de nascimento" {...register("dataNascimento")} />
                </InputGroup>
                {errors.dataNascimento && <FormHelperText>{errors.dataNascimento.message}</FormHelperText>}
              </FormControl>
              <Button
                borderRadius={10}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
                isLoading={isSubmitting}
                bg={'teal.500'}
                _hover={{
                  bg: 'teal.700',
                }}
              >
                Cadastrar
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default CadastrarUsuario;
