import Link from 'next/link';
import style from '@/styles/Navigation.module.css';

export default function Navigation() {
  return (
    <nav className={style.container}>
      <ul className={style.list}>
        <li className={style.item}>
          <Link href="/" className={style.boldLink}>BOOKS</Link>
        </li>
        <li className={style.item}>
          <Link href="/audiobooks" className={style.link}>AUDIOBOOKS</Link>
        </li>
        <li className={style.item}>
          <Link href="/stationery" className={style.link}>STATIONERY & GIFTS</Link>
        </li>
        <li className={style.item}>
          <Link href="/blog" className={style.link}>BLOG</Link>
        </li>
      </ul>
    </nav>
  );
}
