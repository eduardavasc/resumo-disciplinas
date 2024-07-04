import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Link,
  Menu,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import Logo from "../commons/Logo/Logo";
import NavLink from "./NavLink";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { usuario, setUsuario } = useAuth()

  const navigate = useNavigate()
  const toast = useToast();

  const handleLogout = () => {
    setUsuario({
      email: '',
      nome: '',
      logado: false
    })

    toast({
      status: 'success',
      title: 'Usuário deslogado com sucesso!',
      duration: 2000,
      isClosable: true,
    });
    
    navigate('/')
  }

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
              {usuario.logado && (
                <NavLink page='cadastrar-disciplinas'>
                  <Text color={"white"} fontWeight="bold">
                    Cadastrar disciplinas
                  </Text>
                </NavLink>
              )}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Menu>
              <Stack
                flex={{ base: 1, md: 0 }}
                justify={'flex-end'}
                direction={'row'}
                spacing={6}>
                {usuario.logado ? (
                  <Text color={"white"} fontWeight="bold">
                    Olá, {usuario.nome}
                  </Text>
                ) :
                  (
                    <Button as={Link} fontSize={'sm'} fontWeight={400} variant={'link'} href={'/logar-usuario'} textColor={'white'} >
                      Entrar
                    </Button>
                  )}
                {usuario.logado ? (
                  <Button
                    onClick={handleLogout}
                    display={{ base: 'none', md: 'inline-flex' }}
                    fontSize={'sm'}
                    fontWeight={600}
                    color={'white'}
                    bg={'teal.300'}
                    width={'100px'}
                    _hover={{
                      bg: 'teal.700',
                    }}>
                    Sair
                  </Button>
                ) : (
                  <Button
                    as={Link}
                    display={{ base: 'none', md: 'inline-flex' }}
                    fontSize={'sm'}
                    fontWeight={600}
                    color={'white'}
                    bg={'teal.400'}
                    href={'/cadastrar-usuario'}
                    _hover={{
                      bg: 'teal.700',
                    }}>
                    Cadastre-se
                  </Button>
                )}
              </Stack>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {
                usuario.logado && (
                  <NavLink page='cadastrar-disciplinas'>
                    <Text color={"white"} fontWeight="bold">
                      Cadastrar disciplinas
                    </Text>
                  </NavLink>
                )
              }
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
