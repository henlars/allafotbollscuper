'use client';
import initialData from '../../public/cuper2024.json';
import Cards from './components/Cards';
import { Box, Center, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Filters from './components/Filters';
import Footer from './components/Footer';
import { Tournaments } from './components/Tournaments';
import { useState } from 'react';
export default function Home() {
  const [filteredData, setFilteredData] = useState(initialData);

  const handleFilter = (updatedData) => {
    setFilteredData(updatedData);
  };
  return (
    <Box maxW={'1500px'} margin={'auto'} backgroundColor={'#F1F1F1'}>
      <Box pt={'40%'} position={'relative'}>
        <Image
          src={'/winner.jpeg'} // Replace with your image path
          alt='Image description'
          fill
        />
        <Text
          position={'absolute'}
          top={'3%'}
          left={'3%'}
          zIndex={2}
          color={'white'}
          fontSize={'xx-large'}
        >
          allafotbollscuper.se
        </Text>
        <Center
          height={'100%'}
          position={'absolute'}
          width={'100%'}
          top={0}
          backgroundColor={'rgba(0, 0, 0, 0.8)'}
        >
          <Filters data={initialData} onFilter={handleFilter}></Filters>
        </Center>
      </Box>
      <Tournaments tournaments={filteredData}></Tournaments>
      <Footer></Footer>
    </Box>
  );
}
