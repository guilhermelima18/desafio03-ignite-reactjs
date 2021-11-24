import styles from './header.module.scss';

export const Header = (): JSX.Element => {
  return (
    <header className={styles.header}>
      <img src="/Logo.svg" alt="Logo Space Traveling" />
    </header>
  );
};
