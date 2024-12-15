import { PropsWithChildren } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import UserShop from '@/components/UserShop';
import style from '@/styles/Layout.module.css';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  weight: ['400'], 
  subsets: ['latin', 'cyrillic'], 
});

interface LayoutProps extends PropsWithChildren {
  showHeader?: boolean;
}

export default function Layout({ children, showHeader = true }: LayoutProps) {
  return (
    <div className={montserrat.className}>
      <Head>
        <title>Bookshop</title>
        <meta name="description" content="Online Bookshop" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={style.container}>
        {showHeader && (
          <header className={style.header}>
            <Link href="/">
              <div className={style.logo}>Bookshop</div>
            </Link>
            <Navigation />
            <UserShop />
          </header>
        )}

        <main className={style.main}>{children}</main>
      </div>
    </div>
  );
}
