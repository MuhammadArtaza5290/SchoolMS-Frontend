import "./footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Left: Copyright */}
        <p className="footer__copy">
          © {year} CRESTFIELD INTERNATIONAL SCHOOL. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
