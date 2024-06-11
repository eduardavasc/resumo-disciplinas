import { HStack, useMediaQuery, Box, Flex, Heading, Text} from '@chakra-ui/react';
import Logo from '../Logo/Logo';
import Menu from '../Menu/Menu';
import MenuMobile from '../Menu/MenuMobile';

const Header = () => {

    const [isLargerThanMD] = useMediaQuery('(min-width: 768px)')

  return (
    <Box position={"relative"}>

    <HStack
    bgColor='grey.400'
    w="full"
    p = {{base: "1rem 3rem", md: "1rem 8rem"}}
    justifyContent={"space-between"}
    >
        <Logo size ="5rem"/>
        <Flex direction="column">
            <Heading  >Your Studies Place</Heading>
            <Text textAlign="center">Seu espaço para registro de disciplinas</Text>
            </Flex>
            {isLargerThanMD ? <Menu/> : <MenuMobile/>}
    </HStack>
    </Box>

);
}


export default Header;
