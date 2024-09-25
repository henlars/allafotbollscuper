import { Box, Heading, Text, Flex } from '@chakra-ui/react';
import ChakraNextLink from './Link';
import Image from 'next/image';

function Card({ county, name, club, date, categoriesSummary, link, index }) {
  const images = [
    '/8_year_boy.webp',
    '/17_year_girl.webp',
    '/11_year_boy.webp',
    '/14_year_girl.webp',
    '/14_year_boy.webp',
    '/11_year_girl.webp',
    '/17_year_boy.webp',
    '/8_year_girl.webp',
  ];
  return (
    <ChakraNextLink href={link}>
      <Box
        backgroundColor={'white'}
        maxW='330px'
        w='330px'
        borderRadius={'5%'}
        overflow='hidden'
      >
        <Flex position='relative' w={'100%'} p='33%'>
          <Image fill src={images[index]} alt={name} sizes={'300px'} />
        </Flex>
        <Box p={'15px'}>
          <Flex
            fontSize={'small'}
            width={'100%'}
            placeContent={'space-between'}
          >
            <Text>{county}</Text> <Text>{date}</Text>
          </Flex>
          <Heading fontSize={'large'} mt={'5px'} mb={'15px'}>
            {name.length < 30 ? name : name.substring(0, 25) + '...'}
          </Heading>
          <Flex fontSize={'small'} placeContent={'space-between'}>
            <Box>
              <Text fontWeight={'bold'}>Åldersklass:</Text>
              <Text mt={'5px'}>
                {categoriesSummary.length < 25
                  ? categoriesSummary
                  : categoriesSummary.substring(0, 25) + '...'}
              </Text>
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
