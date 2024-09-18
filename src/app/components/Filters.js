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
    genderCode: '',
    age: 'Alla',
    ageCode: '',
    counties: [],
    year: '2024',
  });
  const counties = ['Västra götalands län', 'Stockholm'];
  const genders = ['Flick', 'Pojk', 'Dam', 'Herr'];
  const years = ['2024', '2025'];
  function getBirthYears() {
    const birthYears = [];
    const currentYear = new Date().getFullYear();

    for (let year = currentYear - 6; year >= currentYear - 19; year--) {
      birthYears.push(year.toString());
    }

    return birthYears;
  }
  function getMonthNames() {
    const months = [];
    for (let i = 0; i < 12; i++) {
      const month = new Date(2024, i, 1).toLocaleString('sv-SE', {
        month: 'long',
      });
      const capitalizedMonth =
        month.charAt(0).toUpperCase() + month.slice(1).toLowerCase();
      months.push(capitalizedMonth);
    }
    return months;
  }
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

  const handleFilterChange = (filterKey, filterValue) => {
    if (filterKey == 'gender') {
      let modifiedGender = '';
      if (filterValue == 'Flick') {
        modifiedGender = 'F';
      } else if (filterValue == 'Pojk') {
        modifiedGender = 'P';
      } else if (filterValue == 'Herr') {
        modifiedGender = 'Herr';
      } else if (filterValue == 'Dam') {
        modifiedGender = 'Dam';
      } else {
        modifiedGender = 'Alla';
      }
      setSelectedFilters((prevFilters) => ({
        ...prevFilters,
        [filterKey]: filterValue,
        genderCode: modifiedGender,
      }));
    } else if (filterKey == 'age') {
      let modifiedAge = parseInt(selectedFilters.year) - parseInt(filterValue);
      modifiedAge =
        modifiedAge < 10 ? `0${modifiedAge}` : modifiedAge.toString();

      setSelectedFilters((prevFilters) => ({
        ...prevFilters,
        [filterKey]: filterValue,
        ageCode: modifiedAge,
      }));
    } else if (filterKey == 'months') {
      if (filterValue.includes('Alla')) {
        setSelectedFilters((prevFilters) => ({
          ...prevFilters,
          months: [],
        }));
      } else {
        setSelectedFilters((prevFilters) => ({
          ...prevFilters,
          months: filterValue,
        }));
      }
    } else if (filterKey == 'counties') {
      if (filterValue.includes('Alla')) {
        setSelectedFilters((prevFilters) => ({
          ...prevFilters,
          counties: [],
        }));
      } else {
        setSelectedFilters((prevFilters) => ({
          ...prevFilters,
          counties: filterValue,
        }));
      }
    } else {
      setSelectedFilters((prevFilters) => ({
        ...prevFilters,
        [filterKey]: filterValue,
      }));
    }
  };
  useEffect(() => {
    const filteredData = data.filter((item) => {
      return (
        (selectedFilters.months.includes(item.month) ||
          selectedFilters.months.length == 0) &&
        (selectedFilters.gender === 'Alla' ||
          item.categories.some((category) =>
            category.includes(selectedFilters.genderCode)
          )) &&
        (selectedFilters.age === 'Alla' ||
          item.categories.some((category) =>
            category.includes(selectedFilters.ageCode)
          )) &&
        (selectedFilters.counties.includes(item.county) ||
          selectedFilters.counties.length == 0) &&
        selectedFilters.year == item.year
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
              <FormLabel htmlFor='age'>{'Åldersgrupp (födelseår)'}</FormLabel>

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
                    {getBirthYears().map((age) => (
                      <MenuItemOption key={age} value={age}>
                        {age}
                      </MenuItemOption>
                    ))}
                  </MenuOptionGroup>
                </MenuList>
              </Menu>
            </Box>
            <Box w={'45%'}>
              <FormLabel htmlFor='gender'>Kategori</FormLabel>
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
                  <MenuItemOption value='Alla' key='Alla'>
                    Alla
                  </MenuItemOption>
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
                      <MenuItemOption value='Alla' key='Alla'>
                        Alla
                      </MenuItemOption>
                      {getMonthNames().map((month) => (
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
                    {selectedFilters.year}
                  </MenuButton>
                  <MenuList minWidth={'202.5px'}>
                    <MenuOptionGroup
                      type='radio'
                      onChange={(e) => handleFilterChange('year', e)}
                      value={selectedFilters.year}
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
                  genderCode: '',
                  age: 'Alla',
                  ageCode: '',
                  counties: [],
                  year: '2024',
                });
                onFilter(data);
              }}
              padding={'8px'}
              width={'75px'}
              _hover={{ backgroundColor: 'gray.800' }}
            >
              Rensa{' '}
            </Button>
            {/* <Button
              backgroundColor='black'
              color='white'
              onClick={() => console.log(selectedFilters)}
              padding={'8px'}
              width={'75px'}
              _hover={{ backgroundColor: 'gray.800' }}
            >
              Sök
            </Button> */}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
