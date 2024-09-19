'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
export function Providers({ children }) {
  const breakpoints = {
    sm: '320px',
    md: '768px',
    lg: '1024px',
    xl: '1300px',
    '2xl': '1600px',
    '3xl': '2000px',
  };

  const theme = extendTheme({ breakpoints });
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
