import "./Footer.scss";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <p>&copy; {currentYear}, murtmo</p>
    </footer>
  );
};

export default Footer;
