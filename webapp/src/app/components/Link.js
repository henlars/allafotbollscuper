'use client';
import { Link } from '@chakra-ui/next-js';

export default function ChakraNextLink({ href, children }) {
  return (
    <Link
      href={href ? href : ''}
      _hover={href ? { cursor: 'pointer' } : { cursor: 'not-allowed' }}
    >
      {children}
    </Link>
  );
}
