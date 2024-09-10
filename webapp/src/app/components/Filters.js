'use client';
import { useEffect, useState } from 'react';
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

export default function Filters({ data, onFilter }) {
  const [selectedFilters, setSelectedFilters] = useState({
    months: [],
    gender: 'Alla',
    age: 'Alla',
    counties: [],
    years: [],
  });
  const counties = ['Göteborg', 'Stockholm'];
  const ages = ['2010', '2009'];
  const genders = ['Tjej', 'Pojk'];
  const months = ['Januari', 'Februari', 'Mars'];
  const years = ['2024', '2025'];
  const countyMenuButtonText = () => {
    if (selectedFilters.counties.length == 1) {
      return '1 län valt';
    } else if (selectedFilters.counties.length > 1) {
      return selectedFilters.counties.length + ' län valda';
    } else return 'Vart vill ni spela?';
  };
  const monthMenuButtonText = () => {
    if (selectedFilters.months.length == 1) {
      return '1 månad vald';
    } else if (selectedFilters.months.length > 1) {
      return selectedFilters.months.length + ' månader valda';
    } else return 'Alla';
  };
  const yearMenuButtonText = () => {
    if (selectedFilters.years.length == 1) {
      return '1 år valt';
    } else if (selectedFilters.years.length > 1) {
      return selectedFilters.years.length + ' år valda';
    } else return 'Alla';
  };
  const handleFilterChange = (filterKey, filterValue) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: filterValue,
    }));
  };
  useEffect(() => {
    const filteredData = data.filter((item) => {
      return (
        (selectedFilters.months.includes(item.month) ||
          selectedFilters.months.length == 0) &&
        (selectedFilters.gender === 'Alla' ||
          item.gender === selectedFilters.gender) &&
        (selectedFilters.age === 'Alla' || item.age === selectedFilters.age) &&
        (selectedFilters.counties.includes(item.county) ||
          selectedFilters.counties.length == 0) &&
        (selectedFilters.years.includes(item.year) ||
          selectedFilters.years.length == 0)
      );
    });

    onFilter(filteredData);
  }, [selectedFilters]);
  return (
    <>
      <Flex borderRadius='5%' height={'500px'} w={'500px'} background='white'>
        <Flex
          flexDirection={'column'}
          alignItems='center'
          w={'90%'}
          height={'100%'}
          margin={'auto'}
          placeContent={'center'}
        >
          <Text color={'black'} fontSize={'30px'}>
            Sök cuper i hela Sverige
          </Text>
          <Flex
            flexDirection='row'
            w={'100%'}
            placeContent='space-between'
            mt={'30px'}
          >
            <Box w={'45%'}>
              <FormLabel htmlFor='age'>Ålder</FormLabel>

              <Menu closeOnSelect={false} flip={false} id='age'>
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
                  {selectedFilters.age}
                </MenuButton>
                <MenuList minWidth={'202.5px'} zIndex={20}>
                  <MenuOptionGroup
                    type='radio'
                    onChange={(e) => handleFilterChange('age', e)}
                    value={selectedFilters.age}
                  >
                    <MenuItemOption value='Alla' key='Alla'>
                      Alla
                    </MenuItemOption>
                    {ages.map((age) => (
                      <MenuItemOption key={age} value={age}>
                        {age}
                      </MenuItemOption>
                    ))}
                  </MenuOptionGroup>
                </MenuList>
              </Menu>
            </Box>
            <Box w={'45%'}>
              <FormLabel htmlFor='gender'>Kön</FormLabel>
              <Menu closeOnSelect={false} flip={false} id='gender'>
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
                  {selectedFilters.gender}
                </MenuButton>
                <MenuList minWidth={'202.5px'} zIndex={20}>
                  <MenuOptionGroup
                    type='radio'
                    onChange={(e) => handleFilterChange('gender', e)}
                    value={selectedFilters.gender}
                  >
                    <MenuItemOption value='Alla' key='Alla'>
                      Alla
                    </MenuItemOption>
                    {genders.map((gender) => (
                      <MenuItemOption key={gender} value={gender}>
                        {gender}
                      </MenuItemOption>
                    ))}
                  </MenuOptionGroup>
                </MenuList>
              </Menu>
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
              <MenuList minWidth={'450px'} zIndex={20}>
                <MenuOptionGroup
                  type='checkbox'
                  onChange={(e) => handleFilterChange('counties', e)}
                  value={selectedFilters.counties}
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
                  <MenuList minWidth={'202.5px'}>
                    <MenuOptionGroup
                      type='checkbox'
                      onChange={(e) => handleFilterChange('months', e)}
                      value={selectedFilters.months}
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
                  <MenuList minWidth={'202.5px'}>
                    <MenuOptionGroup
                      type='checkbox'
                      onChange={(e) => handleFilterChange('years', e)}
                      value={selectedFilters.years}
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
                  gender: 'Alla',
                  age: 'Alla',
                  counties: [],
                  years: [],
                });
                onFilter(data);
              }}
              padding={'8px'}
              width={'75px'}
              _hover={{ backgroundColor: 'gray.800' }}
            >
              Rensa{' '}
            </Button>
            <Button
              backgroundColor='black'
              color='white'
              onClick={() => console.log(selectedFilters)}
              padding={'8px'}
              width={'75px'}
              _hover={{ backgroundColor: 'gray.800' }}
            >
              Sök
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
