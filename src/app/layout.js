import './globals.css';
import { Providers } from './providers';

export const metadata = {
  title: 'Alla fotbollscuper',
  description: 'Sök, filtrera och sortera alla fotbollscuper i Sverige',
};

export default function RootLayout({ children }) {
  return (
    <html lang='sv'>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
