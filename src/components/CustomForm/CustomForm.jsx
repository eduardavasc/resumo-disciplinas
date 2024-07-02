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
  useToast,
  Select,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useDisciplinas } from "../../hooks/useDisciplinas";
import { criarDisciplina } from "../../services/disciplinasService";

const schema = z.object({
  nome: z.string().min(4, "Mínimo de 4 caracteres. Campo obrigatório."),
  descricao: z
    .string()
    .min(4, "Mínimo de 4 caracteres. Campo obrigatório."),
  createDate: z.string().min("Campo obrigatório."),
  codigoDisciplina: z.string().min(4, "Campo obrigatório."),
  professorResponsavel: z.string().min(4, "Campo obrigatório."),
  prerequisitos: z.string().min("Campo obrigatório."),
  creditos: z
  .string()
  .min(1, "Campo obrigatório.")
  .min("Campo obrigatório."),
  horariosAulas: z.enum(["08:00", "10:00", "14:00", "16:00"]),
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
      status: "success",
      title: "Disciplina cadastrada com sucesso!",
    });

    navigate("/");
  }

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bg="teal.50"
    >
      <Box
        bg="white"
        p={8}
        borderRadius="md"
        boxShadow="md"
        width="400px"
        textAlign={"center"}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={touchedFields.nome && errors.nome}>
            <Box marginBottom={4}>
              <Text fontSize={"xx-large"} fontWeight={"bold"}>
                Cadastrar disciplinas
              </Text>
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

          <FormControl
            isInvalid={touchedFields.descricao && errors.descricao}
            mt={4}
          >
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

          <FormControl
            isInvalid={touchedFields.createDate && errors.createDate}
            mt={4}
          >
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

          <FormControl
            isInvalid={
              touchedFields.professorResponsavel && errors.professorResponsavel
            }
            mt={4}
          >
            <FormLabel htmlFor="professorResponsavel">
              Professor responsável:
            </FormLabel>
            <Input
              id="professorResponsavel"
              placeholder="Professor responsável"
              _focusVisible={{
                borderColor: "teal.400",
                boxShadow: "0 0 0 1px var(--chakra-colors-teal-400)",
              }}
              {...register("professorResponsavel")}
            />
            <FormErrorMessage>
              {errors.professorResponsavel &&
                errors.professorResponsavel.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={
              touchedFields.codigoDisciplina && errors.codigoDisciplina
            }
            mt={4}
          >
            <FormLabel htmlFor="codigoDisciplina">
              Código da disciplina:
            </FormLabel>
            <Input
              id="codigoDisciplina"
              placeholder="Código da disciplina"
              _focusVisible={{
                borderColor: "teal.400",
                boxShadow: "0 0 0 1px var(--chakra-colors-teal-400)",
              }}
              {...register("codigoDisciplina")}
            />
            <FormErrorMessage>
              {errors.codigoDisciplina && errors.codigoDisciplina.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={touchedFields.prerequisitos && errors.prerequisitos}
            mt={4}
          >
            <FormLabel htmlFor="prerequisitos">Pré-requisitos:</FormLabel>
            <Input
              id="prerequisitos"
              as="textarea"
              placeholder="Pré-requisitos"
              rows={4}
              _focusVisible={{
                borderColor: "teal.400",
                boxShadow: "0 0 0 1px var(--chakra-colors-teal-400)",
              }}
              {...register("prerequisitos")}
            />
            <FormErrorMessage>
              {errors.prerequisitos && errors.prerequisitos.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={touchedFields.creditos && errors.creditos}
            mt={4}
          >
            <FormLabel htmlFor="creditos">Créditos:</FormLabel>
            <Input
              id="creditos"
              type="number"
              placeholder="Créditos"
              _focusVisible={{
                borderColor: "teal.400",
                boxShadow: "0 0 0 1px var(--chakra-colors-teal-400)",
              }}
              {...register("creditos")}
            />
            <FormErrorMessage>
              {errors.creditos && errors.creditos.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={touchedFields.horariosAulas && errors.horariosAulas}
            mt={4}
          >
            <FormLabel htmlFor="horariosAulas">Horários das aulas:</FormLabel>
            <Select
              id="horariosAulas"
              placeholder="Selecione um horário"
              _focusVisible={{
                borderColor: "teal.400",
                boxShadow: "0 0 0 1px var(--chakra-colors-teal-400)",
              }}
              {...register("horariosAulas")}
            >
              <option value="08:00">08:00</option>
              <option value="10:00">10:00</option>
              <option value="14:00">14:00</option>
              <option value="16:00">16:00</option>
            </Select>
            <FormErrorMessage>
              {errors.horariosAulas && errors.horariosAulas.message}
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
