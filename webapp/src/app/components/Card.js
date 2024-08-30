import { Box, Image, Heading, Text, Flex, Link } from '@chakra-ui/react';
function Card({ month, name, club, date, category, link }) {
  return (
    <Link href={link} _hover={link && { cursor: 'pointer' }}>
      <Box
        backgroundColor={'white'}
        maxW='350px'
        borderRadius={'5%'}
        overflow='hidden'
      >
        <Image
          width={'100%'}
          src={'/kids_playing.jpeg'}
          alt={name}
          borderRadius='5% 5% 0 0'
        />
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
              <Text mt={'5px'}>{category}</Text>
            </Box>
            <Box>
              <Text fontWeight={'bold'}>Arrangör:</Text>
              <Text mt={'5px'}>{club}</Text>
            </Box>
          </Flex>
        </Box>
      </Box>
    </Link>
  );
}

export default Card;
