/* eslint-disable react/prop-types */
import { 
  Flex, 
  Input, 
  InputGroup, 
  InputLeftElement, 
  chakra, 
  Button 
} from "@chakra-ui/react";
import CustomCard from "../../components/CustomCard/CustomCard";
import { useDisciplinas } from "../../hooks/useDisciplinas";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { recuperarDisciplinas } from "../../services/disciplinasService";
import WelcomeMessage from "../../components/WelcomeMessage/Welcome.Message";

const CFaSearch = chakra(FaSearch);

const ITEMS_PER_PAGE = 8;

const Home = () => {
  const { disciplinas, setDisciplinas } = useDisciplinas();
  const [filtro, setFiltro] = useState('');
  const [disciplinasFiltradas, setDisciplinasFiltradas] = useState(disciplinas);
  const { usuario } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);

  const fetchDisciplinas = async () => {
    const disciplinasDb = await recuperarDisciplinas();
    setDisciplinas(disciplinasDb);
  };

  useEffect(() => {
    fetchDisciplinas();
  }, []);

  useEffect(() => {
    if (filtro === '') {
      setDisciplinasFiltradas(disciplinas);
    } else {
      setDisciplinasFiltradas(disciplinas.filter(item => item.nome.toLowerCase().includes(filtro.toLowerCase())));
    }
  }, [filtro, disciplinas]);


  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const displayedDisciplinas = disciplinasFiltradas.slice(startIndex, endIndex);
  const totalPages = Math.ceil(disciplinasFiltradas.length / ITEMS_PER_PAGE);

  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  return (
    <Flex
      direction="column"
      bgColor={"teal.50"}
      minHeight="100vh"
      alignItems="center"
      textAlign="center"
      p={4}
    >
     
      {usuario.logado ? (
        <>
          <Flex justifyContent="center" alignItems="center" width="100%" mt={4}>
            <InputGroup maxWidth={"300px"}>
              <InputLeftElement pointerEvents="none">
                <CFaSearch color="gray.300" />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="Pesquisar disciplina"
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
              />
            </InputGroup>
          </Flex>

          <Flex
            direction="row"
            alignItems="center"
            justifyContent="center"
            width="100%"
            flexWrap="wrap"
            mt={4}
          >
            {displayedDisciplinas.map((item, index) => (
              <CustomCard
                key={index}
                item={item}
                itemIndex={index}
                disciplinas={disciplinasFiltradas}
                mb={4}
              />
            ))}
          </Flex>

          <Flex mt={4} justifyContent="center">
            <Button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              bg="teal.400"
              color="white"
              _hover={{ bg: "teal.700" }}
              mr={2}
            >
              Voltar
            </Button>
            <Button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              bg="teal.400"
              color="white"
              _hover={{ bg: "teal.700" }}
            >
              Avançar
            </Button>
          </Flex>
        </>
      ) :(     
        <WelcomeMessage/>
      )}
    </Flex>
  );
};

export default Home;
