'use client';
import { Box, Center, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Filters from './Filters';
import Footer from './Footer';
import { Tournaments } from './Tournaments';
import { useState } from 'react';
import ChakraNextLink from './Link';

/* import Batch from './Batch';
import Create from './Create';
 */
export default function Content({ data }) {
  const [filteredData, setFilteredData] = useState(data);

  const handleFilter = (updatedData) => {
    setFilteredData(updatedData);
  };
  return (
    <Box maxW={'1500px'} margin={'auto'} backgroundColor={'#F1F1F1'}>
      {/*  <Create></Create> <Batch></Batch> */}
      <Box pt={'40%'} position={'relative'}>
        <Image
          src={'/winner.webp'} // Replace with your image path
          alt='Image description'
          fill
          priority
        />
        <ChakraNextLink href={'/'}>
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
        </ChakraNextLink>
        <Center
          height={'100%'}
          position={'absolute'}
          width={'100%'}
          top={0}
          backgroundColor={'rgba(0, 0, 0, 0.8)'}
        >
          {data && <Filters data={data} onFilter={handleFilter}></Filters>}
        </Center>
      </Box>
      {filteredData && <Tournaments tournaments={filteredData}></Tournaments>}
      <Footer></Footer>
    </Box>
  );
}
