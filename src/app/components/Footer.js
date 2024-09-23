import { Box, Flex, Text } from '@chakra-ui/layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faGithub,
  faInstagram,
  faLinkedin,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import ChakraNextLink from './Link';

const Footer = () => (
  <Flex
    height={{ sm: '80px', md: '160px' }}
    justifyContent={'center'}
    alignItems='center'
    backgroundColor={'gray.800'}
    mt={'50px'}
  >
    <Flex w={'50%'} justifyContent={'center'} h={'100%'} alignItems={'center'}>
      <Text color={'white'} fontSize={{ sm: 'xs', md: 'lg', lg: '2xl' }}>
        © 2024 allafotbollscuper.se
      </Text>
    </Flex>
    <Flex w={'50%'} justifyContent={'center'} h={'100%'}>
      <Flex
        w={{ sm: '80%', md: '50%' }}
        alignItems={'center'}
        justifyContent={'space-around'}
      >
        <Text color={'white'} fontSize={{ sm: 'xs', md: 'lg', lg: '2xl' }}>
          Social:
        </Text>
        <ChakraNextLink href='mailto:henriklarssonmail@gmail.com' newTab>
          <Flex
            justifyContent={'center'}
            fontSize={{ sm: '12px', md: '18px', lg: '24px' }}
          >
            <FontAwesomeIcon icon={faEnvelope} color='white' />
          </Flex>{' '}
        </ChakraNextLink>

        <ChakraNextLink href='https://github.com/henlars'>
          <Flex
            justifyContent={'center'}
            fontSize={{ sm: '12px', md: '18px', lg: '24px' }}
          >
            <FontAwesomeIcon icon={faGithub} color='white' />
          </Flex>
        </ChakraNextLink>
        <ChakraNextLink href='https://www.linkedin.com/in/henrik-larsson-46470a192/'>
          <Flex
            justifyContent={'center'}
            fontSize={{ sm: '12px', md: '18px', lg: '24px' }}
          >
            <FontAwesomeIcon icon={faLinkedin} color='white' />
          </Flex>
        </ChakraNextLink>
      </Flex>
    </Flex>
  </Flex>
);

export default Footer;
