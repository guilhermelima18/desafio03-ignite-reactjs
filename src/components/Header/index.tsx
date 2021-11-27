import Link from 'next/link';
import styles from './header.module.scss';

export const Header = (): JSX.Element => {
  return (
    <header className={styles.header}>
      <Link href="/" passHref>
        <a>
          <img src="/Logo.svg" alt="logo" />
        </a>
      </Link>
    </header>
  );
};
