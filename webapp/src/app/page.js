import data from '../../public/cuper2024.json';
import Cards from './components/Cards';
import { Box, Center, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Filters from './components/Filters';
export default function Home() {
  return (
    <Box maxW={'1500px'} margin={'auto'} backgroundColor={'#F1F1F1'}>
      <Box pt={'50%'} position={'relative'} mb={'100px'}>
        <Image
          src={'/winner.jpeg'} // Replace with your image path
          alt='Image description'
          fill
        />
        <Center
          height={'100%'}
          position={'absolute'}
          width={'100%'}
          top={0}
          backgroundColor={'rgba(0, 0, 0, 0.8)'}
        >
          <Filters></Filters>
        </Center>
      </Box>
      <Cards cards={data} />
    </Box>
  );
}
