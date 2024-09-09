'use client';
import { Link } from '@chakra-ui/next-js';

export default function ChakraNextLink({ href, newTab, children }) {
  return (
    <Link
      href={href ? href : ''}
      _hover={href ? { cursor: 'pointer' } : { cursor: 'not-allowed' }}
      target={newTab && '_blank'}
      width={'100%'}
    >
      {children}
    </Link>
  );
}
