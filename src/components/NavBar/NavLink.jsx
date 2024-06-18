import { useColorModeValue, Link as ChakraLink } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const NavLink = ({ children, page }) => {
  
  return (
    <ChakraLink
      as={Link}
      to={page}
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('teal.700', 'teal.200'),
      }}

      >
      {children}
    </ChakraLink>
  );
};

export default NavLink;
