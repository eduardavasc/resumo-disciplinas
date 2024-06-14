import React from 'react';
import { 
  Drawer, 
  DrawerBody, 
  DrawerHeader, 
  DrawerOverlay, 
  DrawerContent, 
  DrawerCloseButton, 
  Button, 
  VStack, 
  useDisclosure, 
} from '@chakra-ui/react';
import NavLink from '../NavLink/NavLink';



const MenuMobile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <Button ref={btnRef} colorScheme='teal'  textColor={'white'} onClick={onOpen}>
        Abra para navegar:
      </Button>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Páginas:</DrawerHeader>
          <DrawerBody>
            <VStack spacing="24px" align="start">
            <NavLink href="#" text="Home"/>
        <NavLink href="#" text="Cadastrar disciplinas"/>
        <NavLink href="#" text="Discilinas cadastradas"/>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MenuMobile;



