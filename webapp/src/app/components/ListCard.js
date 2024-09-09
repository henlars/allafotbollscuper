import { Box, Image, Heading, Text, Flex } from '@chakra-ui/react';
import ChakraNextLink from './Link';

function ListCard({ month, name, club, date, category, link }) {
  return (
    <ChakraNextLink href={link}>
      <Flex
        backgroundColor={'white'}
        width={'90%'}
        borderRadius={'10px'}
        overflow='hidden'
        margin={'auto'}
      >
        <Image
          width={'10%'}
          src={'/kids_playing.jpeg'}
          alt={name}
          borderRadius='10px 0 0 10px'
        />
        <Box
          width={'40%'}
          textAlign={'center'}
          alignContent={'center'}
          p={'15px'}
        >
          <Text fontWeight={'bold'} fontSize={'x-large'}>
            {name.length < 30 ? name : name.substring(0, 25) + '...'}
          </Text>
          <Flex mt={'5px'} placeContent={'space-between'} fontSize={'larger'}>
            <Text>Västra götalands län</Text> <Text>{date}</Text>
          </Flex>
        </Box>{' '}
        <Box width={'25%'} textAlign={'center'} alignContent={'center'}>
          <Text fontWeight={'bold'} fontSize={'x-large'}>
            Åldersklass:
          </Text>
          <Text mt={'5px'} fontSize={'larger'}>
            {category}
          </Text>
        </Box>
        <Box width={'25%'} textAlign={'center'} alignContent={'center'}>
          <Text fontWeight={'bold'} fontSize={'x-large'}>
            Arrangör:
          </Text>
          <Text mt={'5px'} fontSize={'larger'}>
            {club}
          </Text>
        </Box>
      </Flex>
    </ChakraNextLink>
  );
}

export default ListCard;
