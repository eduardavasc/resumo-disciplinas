import {Flex} from "@chakra-ui/react";
import NavLink from "../NavLink/NavLink";

const Menu = (direction) => {
    return(
        <Flex gap="2rem" flexDir={direction} >
        <NavLink href="#" text="Home"/>
        <NavLink href="#" text="Cadastrar disciplinas"/>
        <NavLink href="#" text="Disciplinas cadastradas"/>
        </Flex>
    )
}

export default Menu;