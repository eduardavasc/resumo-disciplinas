import { Image, Link} from '@chakra-ui/react';

const Logo = () => {
    
    return(
        <Link href="/" display="block">
            <Image borderRadius='full' boxSize='160px' src='/cat.png' alt='Cute Cat' />
        </Link>
        
    );
 
};

export default Logo;