import {Flex} from "@chakra-ui/react";
import NavLink from "../NavLink/NavLink";

const Menu = (direction) => {
    return(
        <Flex gap="5rem" flexDir={direction} >
        <NavLink href="#" text="Home"/>
        <NavLink href="#" text="Cadastro de disciplinas"/>
        </Flex>
    )
}

export default Menu;