import { Flex } from "@chakra-ui/react"
import CustomForm from "../../components/CustomForm/CustomForm"


const CadastrarDisciplina = () => {
  return (
    <Flex 
    bgColor={"white"}
    height="50vh"
    justifyContent="center"
    alignItems="center"
    textAlign="center">
        <CustomForm/>
    </Flex>
  )
}

export default CadastrarDisciplina
