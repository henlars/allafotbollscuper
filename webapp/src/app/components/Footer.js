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
      <Text color={'white'} fontSize={'2xl'}>
        © 2024 allafotbollscuper.se
      </Text>
    </Flex>
    <Flex w={'50%'} justifyContent={'center'} h={'100%'}>
      <Flex w={'50%'} alignItems={'center'} justifyContent={'space-around'}>
        <Text color={'white'} fontSize={'2xl'}>
          Social:
        </Text>
        <ChakraNextLink href='mailto:henriklarssonmail@gmail.com'>
          <Flex>
            <FontAwesomeIcon icon={faEnvelope} color='white' fontSize='24px' />
          </Flex>{' '}
        </ChakraNextLink>

        <ChakraNextLink href='https://github.com/henlars'>
          <Flex>
            <FontAwesomeIcon icon={faGithub} color='white' fontSize='24px' />
          </Flex>
        </ChakraNextLink>
        <ChakraNextLink href='https://www.linkedin.com/in/henrik-larsson-46470a192/'>
          <Flex>
            <FontAwesomeIcon icon={faLinkedin} color='white' fontSize='24px' />
          </Flex>
        </ChakraNextLink>
      </Flex>
    </Flex>
  </Flex>
);

export default Footer;
