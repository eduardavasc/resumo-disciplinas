import { useState } from "react";
import { Flex, Wrap, WrapItem, Button} from "@chakra-ui/react";
import CustomCard from "../../components/CustomCard/CustomCard";
import { useDisciplinas } from "../../hooks/useDisciplinas";

const ITEMS_PER_PAGE = 8;

const Home = () => {
  const { disciplinas } = useDisciplinas();
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const displayedDisciplinas = disciplinas.slice(startIndex, endIndex);

  const totalPages = Math.ceil(disciplinas.length / ITEMS_PER_PAGE);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <Flex
      bgColor={"white"}
      minHeight="100vh"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      flexDirection="column"
      p={4}
    >
      <Wrap spacing="30px" justify="center">
        {displayedDisciplinas.map((item, index) => (
          <WrapItem key={index}>
            <CustomCard
              item={item}
              itemIndex={index}
              disciplinas={disciplinas}
            />
          </WrapItem>
        ))}
      </Wrap>

      <Flex mt={16} justifyContent="center">
        <Button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          mr={2}
          textColor={'white'}
          bgColor="teal.100"
          _hover={{ bgColor: "teal.700" }}
          _active={{ bgColor: "teal.100" }}
        >
          Voltar
        </Button>
        <Button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          textColor={'white'}
          bgColor="teal.100"
          _hover={{ bgColor: "teal.700" }}
          _active={{ bgColor: "teal.100" }}
        >
          Avançar
        </Button>
      </Flex>
    </Flex>
  );
};

export default Home;


