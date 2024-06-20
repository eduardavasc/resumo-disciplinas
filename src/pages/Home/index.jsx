/* eslint-disable react/prop-types */
import { Flex } from "@chakra-ui/react";
import CustomCard from "../../components/CustomCard/CustomCard";
import { useDisciplinas } from "../../hooks/useDisciplinas";

const Home = () => {
  const {disciplinas} = useDisciplinas()
  
  return (
    <Flex
      bgColor={"white"}
      height="50vh"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
    >
      {disciplinas.map((item, index) => {
        return (
          <CustomCard
            key={index}
            item={item}
            itemIndex={index}
            disciplinas={disciplinas}
          />
        );
      })}
    </Flex>
  );
};

export default Home;
