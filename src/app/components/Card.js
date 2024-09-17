import { Box, Heading, Text, Flex } from '@chakra-ui/react';
import ChakraNextLink from './Link';
import Image from 'next/image';

function Card({ month, name, club, date, categoriesSummary, link }) {
  return (
    <ChakraNextLink href={link}>
      <Box
        backgroundColor={'white'}
        maxW='350px'
        w='350px'
        borderRadius={'5%'}
        overflow='hidden'
      >
        <Flex position='relative' w={'100%'} p='33%'>
          <Image fill src={'/kids_playing.webp'} alt={name} />
        </Flex>
        <Box p={'15px'}>
          <Flex
            fontSize={'small'}
            width={'100%'}
            placeContent={'space-between'}
          >
            <Text>Västra götalands län</Text> <Text>{date}</Text>
          </Flex>
          <Heading fontSize={'large'} mt={'5px'} mb={'15px'}>
            {name.length < 30 ? name : name.substring(0, 25) + '...'}
          </Heading>
          <Flex fontSize={'small'} placeContent={'space-between'}>
            <Box>
              <Text fontWeight={'bold'}>Åldersklass:</Text>
              <Text mt={'5px'}>{categoriesSummary}</Text>
            </Box>
            <Box>
              <Text fontWeight={'bold'}>Arrangör:</Text>
              <Text mt={'5px'}>{club}</Text>
            </Box>
          </Flex>
        </Box>
      </Box>
    </ChakraNextLink>
  );
}

export default Card;
