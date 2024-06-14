import { Text, Box, Link} from '@chakra-ui/react';

// eslint-disable-next-line react/prop-types
const NavLink = ({href, text}) => {
    return(

        <Box>
            <Link href={href}>
            <Text fontWeight="bold" color="black.800">{text}</Text>
            </Link>
        </Box>
    );
};

export default NavLink;