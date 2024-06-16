import { Image, Link} from '@chakra-ui/react';

const Logo = () => {
    
    return(
        <Link href="/" display="block">
            <Image borderRadius='full' boxSize='100px' src='/techcat.png' alt='Cute Cat' />
        </Link>
        
    );
 
};

export default Logo;