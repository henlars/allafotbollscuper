import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Alla fotbollscuper',
  description: 'Sök, filtrera och sortera alla fotbollscuper i Sverige',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        {' '}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
