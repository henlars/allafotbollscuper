'use client';
import React, { useEffect, useState } from 'react';
import { Grid, Text, Stack, Flex } from '@chakra-ui/react';
import {
  Pagination,
  usePagination,
  PaginationPage,
  PaginationNext,
  PaginationPrevious,
  PaginationPageGroup,
  PaginationContainer,
} from '@ajna/pagination';
import Card from './Card';
import Image from 'next/image';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import ListCard from './ListCard';

export const Tournaments = ({ tournaments }) => {
  const [gridViewSelected, setGridViewSelected] = useState(true);
  const outerLimit = 2;
  const innerLimit = 2;
  const [lastPageNumberOfTournaments, setLastPageNumberOfTournaments] =
    useState();
  let listViewCount = 3;

  const {
    pages,
    pagesCount,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
  } = usePagination({
    total: tournaments.length > 0 ? tournaments.length : 1,
    limits: {
      outer: outerLimit,
      inner: innerLimit,
    },
    initialState: {
      pageSize: 8,
      currentPage: 1,
    },
  });

  const handlePageChange = (nextPage) => {
    setCurrentPage(nextPage);
  };

  useEffect(() => {
    const w = screen.width;

    if (currentPage == pagesCount) {
      if (tournaments.length > 0 && tournaments.length % pageSize > 0) {
        setLastPageNumberOfTournaments(tournaments.length % pageSize);
      } else {
        setLastPageNumberOfTournaments();
      }
    } else {
      setLastPageNumberOfTournaments();
    }
  }, [tournaments, currentPage]);

  return tournaments.length > 0 ? (
    <>
      <Flex
        position='relative'
        h={{ sm: '40px', '2xl': '60px', '3xl': '80px' }}
        mt={10}
        visibility={{ sm: 'hidden', md: 'inherit' }}
      >
        <Flex
          position={'absolute'}
          right={'20px'}
          width={{ sm: '66px', '2xl': '100px', '3xl': '140px' }}
          h={'100%'}
          justifyContent={'space-evenly'}
          alignItems={'center'}
        >
          {gridViewSelected ? (
            <>
              <Flex
                width={{ sm: '33px', '2xl': '50px', '3xl': '70px' }}
                height={{ sm: '33px', '2xl': '50px', '3xl': '70px' }}
                position={'relative'}
                cursor={'pointer'}
              >
                <Image
                  src='/grid_selected.webp'
                  fill
                  sizes='50px'
                  alt='grid selected'
                ></Image>
              </Flex>
              <Flex
                width={{ sm: '33px', '2xl': '50px', '3xl': '70px' }}
                height={{ sm: '33px', '2xl': '50px', '3xl': '70px' }}
                position={'relative'}
                onClick={() => {
                  setGridViewSelected(false);
                  if (tournaments.length > 0) {
                    setPageSize(
                      tournaments.length > 2 ? 6 : tournaments.length
                    );
                  }
                }}
                cursor={'pointer'}
              >
                <Image
                  src='/list_unselected.webp'
                  fill
                  sizes='50px'
                  alt='list unselected'
                ></Image>
              </Flex>
            </>
          ) : (
            <>
              <Flex
                width={{ sm: '33px', '2xl': '50px', '3xl': '70px' }}
                height={{ sm: '33px', '2xl': '50px', '3xl': '70px' }}
                position={'relative'}
                onClick={() => {
                  setGridViewSelected(true);
                  if (tournaments.length > 0) {
                    setPageSize(
                      tournaments.length > 7 ? 8 : tournaments.length
                    );
                  }
                }}
                cursor={'pointer'}
              >
                <Image
                  src='/grid_unselected.webp'
                  fill
                  sizes='30px'
                  alt='grid unselected'
                ></Image>
              </Flex>
              <Flex
                width={{ sm: '33px', '2xl': '50px', '3xl': '70px' }}
                height={{ sm: '33px', '2xl': '50px', '3xl': '70px' }}
                position={'relative'}
                cursor={'pointer'}
              >
                <Image
                  src='/list_selected.webp'
                  fill
                  sizes='30px'
                  alt='list selected'
                ></Image>
              </Flex>
            </>
          )}
        </Flex>
      </Flex>
      {pageSize > 0 && (
        <Flex
          display='flex'
          fontSize={{ sm: 'xl', xl: '3xl', '2xl': '4xl', '3xl': '6xl' }}
          width={'100%'}
          justifyContent={'center'}
        >
          {lastPageNumberOfTournaments ? (
            <Text color='black'>
              {'Visar ' +
                lastPageNumberOfTournaments +
                ' av ' +
                tournaments.length +
                ' cuper'}
            </Text>
          ) : (
            <Text color='black'>
              {'Visar ' + pageSize + ' av ' + tournaments.length + ' cuper'}
            </Text>
          )}
        </Flex>
      )}

      <Stack alignItems={'center'}>
        <Grid
          gap={{
            sm: '8px',
            md: '10px',
            lg: '12px',
            xl: '14px',
            '2xl': '16px',
            '3xl': '40px',
          }}
          mt={'40px'}
          templateColumns={{
            md: gridViewSelected ? 'repeat(2, 1fr)' : 'repeat(1, 1fr)',
            lg: gridViewSelected ? 'repeat(3, 1fr)' : 'repeat(1, 1fr)',
            xl: gridViewSelected ? 'repeat(4, 1fr)' : 'repeat(1, 1fr)',
          }}
          p={0}
          justifyItems={'center'}
          w={!gridViewSelected && '100%'}
        >
          {gridViewSelected
            ? tournaments
                .slice(
                  currentPage == 1 ? 0 : currentPage * pageSize - pageSize,
                  currentPage * pageSize
                )
                ?.map((tournament, index) => (
                  <Card {...tournament} key={index} index={index} />
                ))
            : tournaments
                .slice(
                  currentPage == 1 ? 0 : currentPage * pageSize - pageSize,
                  currentPage * pageSize
                )
                ?.map((tournament, index) => (
                  <ListCard {...tournament} key={index} index={index} />
                ))}
        </Grid>
        <Pagination
          pagesCount={pagesCount}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        >
          <PaginationContainer
            align='center'
            justify='space-between'
            p={'32px'}
            w={'fit-content'}
          >
            <PaginationPrevious
              mr={'8px'}
              _hover={{
                bg: 'transparent',
              }}
              background={'transparent'}
            >
              <Flex
                h={{ sm: '40px', '2xl': '60px', '3xl': '80px' }}
                w={{ sm: '40px', '2xl': '60px', '3xl': '80px' }}
                zIndex={20}
                alignItems={'center'}
                backgroundColor={'#FFFFFF'}
                borderRadius={'50%'}
                justifyContent={'center'}
                cursor={'pointer'}
              >
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  fontSize={'20px'}
                ></FontAwesomeIcon>
              </Flex>
            </PaginationPrevious>
            <PaginationPageGroup isInline align='center'>
              {pages.map((page) => (
                <PaginationPage
                  w={{ sm: '32px', '2xl': '40px', '3xl': '50px' }}
                  h={{ sm: '32px', '2xl': '40px', '3xl': '50px' }}
                  borderRadius={'50%'}
                  bg='#FFFFFF'
                  key={`pagination_page_${page}`}
                  page={page}
                  fontSize={{ sm: 'sm', '2xl': 'lg', '3xl': '2xl' }}
                  _hover={{
                    bg: '#A5AFB9',
                  }}
                  _current={{
                    bg: '#1F1F1F',

                    color: '#FFFFFF',
                  }}
                />
              ))}
            </PaginationPageGroup>
            <PaginationNext
              ml={'8px'}
              _hover={{
                bg: 'transparent',
              }}
              background={'transparent'}
            >
              <Flex
                h={{ sm: '40px', '2xl': '60px', '3xl': '80px' }}
                w={{ sm: '40px', '2xl': '60px', '3xl': '80px' }}
                zIndex={20}
                alignItems={'center'}
                backgroundColor={'#FFFFFF'}
                borderRadius={'50%'}
                justifyContent={'center'}
                cursor={'pointer'}
              >
                <FontAwesomeIcon
                  icon={faChevronRight}
                  fontSize={'20px'}
                ></FontAwesomeIcon>
              </Flex>
            </PaginationNext>
          </PaginationContainer>
        </Pagination>
      </Stack>
    </>
  ) : (
    <Flex
      justifyContent='center'
      alignItems='center'
      flexDir='column'
      marginTop='20px'
      marginBottom='20px'
    >
      <Text fontSize={'4xl'} marginTop='12px' color='black'>
        Inga cuper hittade med valda filter
      </Text>
    </Flex>
  );
};
