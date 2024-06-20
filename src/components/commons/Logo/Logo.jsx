import { Box, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Logo = () => {
    const navigate = useNavigate();
  
    return (
      <Box display="block" onClick={() => navigate('/')} cursor="pointer">
        <Image borderRadius="full" boxSize="100px" src="/techcat.png" alt="Cute Cat" />
      </Box>
    );
  };

export default Logo;