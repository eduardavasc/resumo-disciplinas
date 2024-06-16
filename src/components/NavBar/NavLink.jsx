import { Box, useColorModeValue } from '@chakra-ui/react';

const NavLink = ({ children }) => {
  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('teal.700', 'teal.200'),
      }}
      href={'#'}>
      {children}
    </Box>
  );
};

export default NavLink;
