import styles from "./Footer.module.scss";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <p>&copy; {currentYear}, murtmo</p>
    </footer>
  );
};

export default Footer;
