'use client';
import { useState } from 'react';
import {
  Flex,
  Select,
  Box,
  Text,
  Button,
  Menu,
  MenuList,
  MenuOptionGroup,
  MenuButton,
  MenuItemOption,
  FormLabel,
} from '@chakra-ui/react';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Filters() {
  const [selectedFilters, setSelectedFilters] = useState({
    months: [],
    gender: '',
    age: '',
    counties: [],
    years: [],
  });
  const counties = ['Göteborg', 'Stockholm'];
  const ages = ['2010', '2009'];
  const genders = ['Tjej', 'Pojk'];
  const months = ['januari', 'februari', 'mars'];
  const years = ['2024', '2025'];
  const countyMenuButtonText = () => {
    if (selectedFilters.counties.length == 1) {
      return '1 län valt';
    } else if (selectedFilters.counties.length > 1) {
      return selectedFilters.counties.length + 'län valda';
    } else return 'Vart vill ni spela?';
  };
  const monthMenuButtonText = () => {
    if (selectedFilters.months.length == 1) {
      return '1 månad vald';
    } else if (selectedFilters.months.length > 1) {
      return selectedFilters.months.length + 'månader valda';
    } else return 'Alla';
  };
  const yearMenuButtonText = () => {
    if (selectedFilters.years.length == 1) {
      return '1 månad vald';
    } else if (selectedFilters.years.length > 1) {
      return selectedFilters.years.length + 'månader valda';
    } else return 'Alla';
  };

  return (
    <>
      <Flex borderRadius='5%' height={'500px'} w={'400px'} background='white'>
        <Flex
          flexDirection={'column'}
          alignItems='center'
          w={'90%'}
          height={'100%'}
          margin={'auto'}
          placeContent={'center'}
        >
          <Text color={'black'} fontSize={'30px'}>
            Hitta nästa cup här!
          </Text>
          <Flex
            flexDirection='row'
            w={'100%'}
            placeContent='space-between'
            mt={'30px'}
          >
            <Box w={'45%'}>
              <FormLabel htmlFor='age'>Ålder</FormLabel>

              <Select
                onChange={(e) => {
                  setSelectedFilters({
                    ...selectedFilters,
                    age: e.target.value,
                  });
                }}
                fontSize={'md'}
                color={'black'}
                placeholder={'Alla'}
                value={selectedFilters.age || ''}
                focusBorderColor='black'
                id='age'
              >
                {ages.map((age) => (
                  <option value={age} key={age}>
                    {age}
                  </option>
                ))}
              </Select>
            </Box>
            <Box w={'45%'}>
              <FormLabel htmlFor='age'>Kön</FormLabel>

              <Select
                onChange={(e) => {
                  setSelectedFilters({
                    ...selectedFilters,
                    gender: e.target.value,
                  });
                }}
                fontSize={'md'}
                color={'black'}
                placeholder={'Alla'}
                value={selectedFilters.gender || ''}
                focusBorderColor='black'
                id='gender'
              >
                {genders.map((gender) => (
                  <option value={gender} key={gender}>
                    {gender}
                  </option>
                ))}
              </Select>
            </Box>
          </Flex>

          <Flex w={'100%'} flexDirection={'column'} mt={'30px'}>
            <FormLabel htmlFor='counties'>Län</FormLabel>
            <Menu closeOnSelect={false} flip={false} id='counties'>
              <MenuButton
                as={Button}
                rightIcon={
                  <FontAwesomeIcon icon={faChevronDown} width='12px' />
                }
                borderWidth='1px'
                backgroundColor={'transparent'}
                color='black'
                fontWeight={'normal'}
                width={'100%'}
                h={'40px'}
              >
                {countyMenuButtonText()}
              </MenuButton>
              <MenuList minWidth={'360px'} zIndex={20}>
                <MenuOptionGroup
                  type='checkbox'
                  onChange={(e) => {
                    setSelectedFilters({
                      ...selectedFilters,
                      counties: e,
                    });
                  }}
                >
                  {counties.map((county) => (
                    <MenuItemOption key={county} value={county}>
                      {county}
                    </MenuItemOption>
                  ))}
                </MenuOptionGroup>
              </MenuList>
            </Menu>
          </Flex>
          <Flex
            flexDirection='row'
            w={'100%'}
            placeContent='space-between'
            mt={'30px'}
          >
            <Box w={'45%'}>
              <Flex w={'100%'} flexDirection={'column'}>
                <FormLabel htmlFor='months'>Månad</FormLabel>
                <Menu closeOnSelect={false} flip={false} id='months'>
                  <MenuButton
                    as={Button}
                    rightIcon={
                      <FontAwesomeIcon icon={faChevronDown} width='12px' />
                    }
                    borderWidth='1px'
                    backgroundColor={'transparent'}
                    color='black'
                    fontWeight={'normal'}
                    width={'100%'}
                    h={'40px'}
                  >
                    {monthMenuButtonText()}
                  </MenuButton>
                  <MenuList minW={'162px'}>
                    <MenuOptionGroup
                      type='checkbox'
                      onChange={(e) => {
                        setSelectedFilters({
                          ...selectedFilters,
                          months: e,
                        });
                      }}
                    >
                      {months.map((month) => (
                        <MenuItemOption key={month} value={month}>
                          {month}
                        </MenuItemOption>
                      ))}
                    </MenuOptionGroup>
                  </MenuList>
                </Menu>
              </Flex>
            </Box>
            <Box w={'45%'}>
              <Flex w={'100%'} flexDirection={'column'}>
                <FormLabel htmlFor='years'>År</FormLabel>
                <Menu closeOnSelect={false} flip={false} id='years'>
                  <MenuButton
                    as={Button}
                    rightIcon={
                      <FontAwesomeIcon icon={faChevronDown} width='12px' />
                    }
                    borderWidth='1px'
                    backgroundColor={'transparent'}
                    color='black'
                    fontWeight={'normal'}
                    h={'40px'}
                  >
                    {yearMenuButtonText()}
                  </MenuButton>
                  <MenuList minW={'162px'}>
                    <MenuOptionGroup
                      type='checkbox'
                      onChange={(e) => {
                        setSelectedFilters({
                          ...selectedFilters,
                          years: e,
                        });
                      }}
                    >
                      {years.map((year) => (
                        <MenuItemOption key={year} value={year}>
                          {year}
                        </MenuItemOption>
                      ))}
                    </MenuOptionGroup>
                  </MenuList>
                </Menu>
              </Flex>
            </Box>
          </Flex>
          <Flex
            flexDirection={'row'}
            placeContent='space-evenly'
            mt={'30px'}
            w='80%'
          >
            <Button
              backgroundColor='black'
              color='white'
              onClick={() => {
                setSelectedFilters({
                  months: [],
                  gender: '',
                  age: '',
                  counties: [],
                  years: [],
                });
              }}
              padding={'8px'}
              width={'75px'}
            >
              Rensa{' '}
            </Button>
            <Button
              backgroundColor='black'
              color='white'
              onClick={() => console.log('test')}
              padding={'8px'}
              width={'75px'}
            >
              Sök
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
