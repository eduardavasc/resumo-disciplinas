import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Flex,
    HStack,
    IconButton,
    Menu,
    Stack,
    Text,
    useColorModeValue,
    useDisclosure
} from "@chakra-ui/react";
import Logo from "../commons/Logo/Logo";
import NavLink from "./NavLink";



export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();


  return (
    <>
      <Box bg={useColorModeValue("teal", "teal.400")} px={6}>
        <Flex h={20} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>
              <Logo />
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              <NavLink page='cadastrar-disciplinas'>
                  <Text color={"white"} fontWeight="bold">
                    Cadastrar disciplinas
                  </Text>
                </NavLink>
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Menu>
            <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>
          <Button as={'a'} fontSize={'sm'} fontWeight={400} variant={'link'} href={'#'} color={'white'}>
            Entrar
          </Button>
          <Button
            as={'a'}
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'teal.300'}
            href={'#'}
            _hover={{
              bg: 'teal.700',
            }}>
            Cadastre-se
          </Button>
        </Stack>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
            <NavLink page='cadastrar-disciplinas'>
                  <Text color={"white"} fontWeight="bold">
                    Cadastrar disciplinas
                  </Text>
                </NavLink>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
