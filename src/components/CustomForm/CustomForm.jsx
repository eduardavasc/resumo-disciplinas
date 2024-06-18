import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Flex,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


const schema = yup.object({
  nome: yup.string().min(4, 'Mínimo de 4 caracteres.').required('Campo obrigatório.'),
  descricao: yup.string().min(4, 'Mínimo de 4 caracteres.').required('Campo obrigatório.'),
  createDate: yup.string().required('Campo obrigatório.'),
}).required();

const CustomForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur'
  });

  function onSubmit(values) {
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        resolve();
      }, 3000);
    });
  }

  return (
    <Flex justifyContent="center" alignItems="center" height="100vh">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.nome}>
          <FormLabel htmlFor="nome">Nome da disciplina:</FormLabel>
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
          <FormLabel htmlFor="descricao">Descrição da disciplina:</FormLabel>
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
          <FormLabel htmlFor="createDate">Data de criação da disciplina:</FormLabel>
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

        <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
          Enviar
        </Button>
      </form>
    </Flex>
  );
}

export default CustomForm;
