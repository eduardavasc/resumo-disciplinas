/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useDisciplinas } from "../../hooks/useDisciplinas";

const schema = yup
  .object({
    nome: yup
      .string()
      .min(4, "Mínimo de 4 caracteres.")
      .required("Campo obrigatório."),
    descricao: yup
      .string()
      .min(4, "Mínimo de 4 caracteres.")
      .required("Campo obrigatório."),
    createDate: yup.string().required("Campo obrigatório."),
  })
  .required();

const CustomForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });
  const navigate = useNavigate()
  const {disciplinas, setDisciplinas} = useDisciplinas()

  function onSubmit(values) {
      const disciplinaAdd = values
      disciplinas.push(disciplinaAdd)
      setDisciplinas(disciplinas)

      alert('Disciplina cadastrada com sucesso!')

      navigate('/')
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
        <FormControl isInvalid={errors.nome}>
         <Box marginBottom={4}><Text fontSize={'xx-large'} fontWeight={'bold'} >Cadastrar disciplinas</Text></Box> 
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

        <FormControl isInvalid={errors.descricao} mt={4}>
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

        <FormControl isInvalid={errors.createDate} mt={4}>
          <FormLabel htmlFor="createDate">
            Data de criação da disciplinas:
          </FormLabel>
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
