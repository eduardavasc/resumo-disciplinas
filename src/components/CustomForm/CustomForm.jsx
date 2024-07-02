/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  useToast
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useDisciplinas } from "../../hooks/useDisciplinas";
import { criarDisciplina } from "../../services/disciplinasService";

const schema = z.object({
  nome: z
    .string()
    .min(4, "Mínimo de 4 caracteres.")
    .min("Campo obrigatório."),
  descricao: z
    .string()
    .min(4, "Mínimo de 4 caracteres.")
    .min("Campo obrigatório."),
  createDate: z.string().nonempty("Campo obrigatório."),
});

const CustomForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });
  const navigate = useNavigate();
  const { disciplinas, setDisciplinas } = useDisciplinas();
  const toast = useToast();

  async function onSubmit(values) {
    const disciplinaAdd = values;
    await criarDisciplina(disciplinaAdd);

    toast({
      status: 'success',
      title: 'Disciplina cadastrada com sucesso!',
    });

    navigate('/');
  }

  return (
    <Flex justifyContent="center" alignItems="center" height="100vh" bg="teal.50">
      <Box 
        bg="white" 
        p={8} 
        borderRadius="md" 
        boxShadow="md"
        width="400px"
        textAlign={'center'}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={touchedFields.nome && errors.nome}>
            <Box marginBottom={4}>
              <Text fontSize={'xx-large'} fontWeight={'bold'}>Cadastrar disciplinas</Text>
            </Box>
            <FormLabel htmlFor="nome">Nome da disciplinas:</FormLabel>
            <Input
              id="nome"
              placeholder="Nome"
              _focusVisible={{
                borderColor: "teal.400",
                boxShadow: "0 0 0 1px var(--chakra-colors-teal-400)",
              }}
              {...register("nome")}
            />
            <FormErrorMessage>
              {errors.nome && errors.nome.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={touchedFields.descricao && errors.descricao} mt={4}>
            <FormLabel htmlFor="descricao">Descrição da disciplinas:</FormLabel>
            <Input
              id="descricao"
              placeholder="Descrição"
              _focusVisible={{
                borderColor: "teal.400",
                boxShadow: "0 0 0 1px var(--chakra-colors-teal-400)",
              }}
              {...register("descricao")}
            />
            <FormErrorMessage>
              {errors.descricao && errors.descricao.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={touchedFields.createDate && errors.createDate} mt={4}>
            <FormLabel htmlFor="createDate">Data de criação da disciplinas:</FormLabel>
            <Input
              id="createDate"
              type="date"
              _placeholder={{ color: "gray.300" }}
              _focusVisible={{
                borderColor: "teal.400",
                boxShadow: "0 0 0 1px var(--chakra-colors-teal-400)",
              }}
              {...register("createDate")}
            />
            <FormErrorMessage>
              {errors.createDate && errors.createDate.message}
            </FormErrorMessage>
          </FormControl>

          <Flex justifyContent="center">
            <Button
              mt={4}
              colorScheme="teal"
              isLoading={isSubmitting}
              type="submit"
            >
              Enviar
            </Button>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};

export default CustomForm;
