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
  useDisclosure 
} from '@chakra-ui/react';


const MenuMobile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <Button ref={btnRef} colorScheme='teal' textColor={'black'} onClick={onOpen}>
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
              <Button >
                Home
              </Button>
              <Button >
                Cadastrar Disciplina
              </Button>
              <Button >
                Disciplinas Cadastradas
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MenuMobile;



