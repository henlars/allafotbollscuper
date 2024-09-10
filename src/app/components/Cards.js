import { Flex } from '@chakra-ui/react';
import Card from './Card';

function Cards({ cards }) {
  return (
    <Flex flexWrap={'wrap'} gap={'50px'} placeContent={'center'}>
      {cards.map((card) => (
        <Card key={card.name} {...card} />
      ))}
    </Flex>
  );
}

export default Cards;
