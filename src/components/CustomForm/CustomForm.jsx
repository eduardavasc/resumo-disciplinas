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
  Toast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useDisciplinas } from "../../hooks/useDisciplinas";
import { useAuth } from "../../hooks/useAuth";
import { criarDisciplina } from "../../services/disciplinasService";
import { useEffect, useState } from "react";

const schema = z.object({
  nome: z.string().min(4, "Mínimo de 4 caracteres. Campo obrigatório."),
  descricao: z.string().min(4, "Mínimo de 4 caracteres. Campo obrigatório."),
  createDate: z.string().min(1, "Campo obrigatório."),
  codigoDisciplina: z.string().min(1, "Campo obrigatório."),
  professorResponsavel: z.string().min(4, "Campo obrigatório."),
  prerequisitos: z.string().optional(),
  creditos: z.union([z.number().int().positive().min(0), z.undefined(), z.nan()]).optional(),
  horariosAulas: z.enum(
    ["08:00-10:00", "10:00-12:00", "14:00-16:00", "16:00-18:00"],
    {
      errorMap: (issue, _ctx) => {
        switch (issue.code) {
          case "invalid_type":
            return { message: "A seleção de horário é obrigatória." };
          case "invalid_enum_value":
            return { message: "A seleção de horário é obrigatória." };
          default:
            return { message: "Inválido." };
        }
      },
    }
  ),
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
  const { usuario } = useAuth();
  const [availableHorarios, setAvailableHorarios] = useState([
    { value: "08:00-10:00", label: "08:00 - 10:00", disabled: false },
    { value: "10:00-12:00", label: "10:00 - 12:00", disabled: false },
    { value: "14:00-16:00", label: "14:00 - 16:00", disabled: false },
    { value: "16:00-18:00", label: "16:00 - 18:00", disabled: false },
  ]);

  const checkCodigoDisciplina = async (codigoDisciplina) => {
    return disciplinas.some(disciplina => disciplina.codigoDisciplina === codigoDisciplina);
  }

  useEffect(() => {
    const updatedHorarios = availableHorarios.map((horario) => {
      const indisponivel = disciplinas.some(
        (disciplina) => disciplina.horariosAulas === horario.value
      );
      return { ...horario, disabled: indisponivel };
    });
    setAvailableHorarios(updatedHorarios);
  }, [disciplinas]);

  useEffect(() => {
    if (!usuario.logado) {
      toast({
        status: "warning",
        title: "Você precisa estar logado para cadastrar uma disciplina.",
      });
      navigate("/logar-usuario");
    }
  }, []);

  const onSubmit = async (values) => {
    console.log(values)
    if (!usuario.logado) {
      toast({
        status: "error",
        title: "Você precisa estar logado para enviar o formulário.",
      });
      navigate("/login"); // Substitua "/login" pelo caminho correto para sua página de login
      return;
    }

    const codigoExistente = await checkCodigoDisciplina(values.codigoDisciplina);
    if (codigoExistente) {
      toast({
        status: "error",
        title: "Código de disciplina já existe.",
      });
      return;
    }
    const disciplinaAdd = {
      ...values,
      creditos: values.creditos !== undefined ? Number(values.creditos) : undefined,
    };
    await criarDisciplina(disciplinaAdd);

    toast({
      status: "success",
      title: "Disciplina cadastrada com sucesso!",
    });

    navigate("/");}

    

  return (
    <Flex justifyContent="center" alignItems="center" bg="teal.50">
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
              
              _focusVisible={{
                borderColor: "teal.400",
                boxShadow: "0 0 0 1px var(--chakra-colors-teal-400)",
              }}
              {...register("creditos", {
                valueAsNumber: true,
            
              })}
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
              placeholder="Escolha seu horário:"
              _focusVisible={{
                borderColor: "teal.400",
                boxShadow: "0 0 0 1px var(--chakra-colors-teal-400)",
              }}
              {...register("horariosAulas")}
            >
              {availableHorarios.map((horario) => (
                <option
                  key={horario.value}
                  value={horario.value}
                  disabled={horario.disabled}
                >
                  {horario.label}
                </option>
              ))}
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
