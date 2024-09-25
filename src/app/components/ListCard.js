import { Box, Heading, Text, Flex } from '@chakra-ui/react';
import ChakraNextLink from './Link';
import Image from 'next/image';

function ListCard({
  county,
  name,
  club,
  date,
  categoriesSummary,
  link,
  index,
}) {
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
      <Flex
        backgroundColor={'white'}
        width={'90%'}
        borderRadius={'10px'}
        overflow='hidden'
        margin={'auto'}
      >
        <Flex position='relative' w={'10%'}>
          <Image fill src={images[index]} alt={name} sizes={'100px'} />
        </Flex>
        <Box
          width={'40%'}
          textAlign={'center'}
          alignContent={'center'}
          p={'15px'}
        >
          <Text
            fontWeight={'bold'}
            fontSize={{ sm: 'sm', md: 'md', lg: 'lg', xl: 'x-large' }}
          >
            {name.length < 40 ? name : name.substring(0, 35) + '...'}
          </Text>
          <Flex
            mt={'5px'}
            placeContent={'space-between'}
            fontSize={{ sm: 'xs', md: 'sm', lg: 'md', xl: 'lg' }}
          >
            <Text>{county}</Text> <Text>{date}</Text>
          </Flex>
        </Box>{' '}
        <Box width={'25%'} textAlign={'center'} alignContent={'center'}>
          <Text
            fontWeight={'bold'}
            fontSize={{ sm: 'sm', md: 'md', lg: 'lg', xl: 'x-large' }}
          >
            Åldersklass:
          </Text>
          <Text
            mt={'5px'}
            fontSize={{ sm: 'xs', md: 'sm', lg: 'md', xl: 'lg' }}
          >
            {categoriesSummary.length < 25
              ? categoriesSummary
              : categoriesSummary.substring(0, 25) + '...'}
          </Text>
        </Box>
        <Box width={'25%'} textAlign={'center'} alignContent={'center'}>
          <Text
            fontWeight={'bold'}
            fontSize={{ sm: 'sm', md: 'md', lg: 'lg', xl: 'x-large' }}
          >
            Arrangör:
          </Text>
          <Text
            mt={'5px'}
            fontSize={{ sm: 'xs', md: 'sm', lg: 'md', xl: 'lg' }}
          >
            {club}
          </Text>
        </Box>
      </Flex>
    </ChakraNextLink>
  );
}

export default ListCard;
