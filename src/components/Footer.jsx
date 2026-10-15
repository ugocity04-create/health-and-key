import { Link } from "react-router-dom";
import { cities } from "../data/listings.js";
import { EMAIL, ADDRESS, OPENING_HOURS, PHONE_DISPLAY, WHATSAPP_NUMBER, generalLink } from "../utils.js";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <p className="footer-logo">
            Hearth <span>&amp;</span> Key
          </p>
          <p className="footer-text">
            Verified homes, apartments and land in Lagos and Abuja, with honest
            prices and people who pick up the phone.
          </p>
        </div>

        <div>
          <h3>Explore</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/properties">All properties</Link></li>
            <li><Link to="/saved">Saved</Link></li>
          </ul>
        </div>

        <div>
          <h3>Browse by city</h3>
          <ul>
            {cities.map((city) => (
              <li key={city}>
                <Link to={"/properties?city=" + city}>Properties in {city}</Link>
              </li>
            ))}
            <li>
              <Link to="/properties?status=rent">Properties to rent</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3>Contact</h3>
          <ul className="footer-contact">
            <li>{ADDRESS}</li>
            <li>{OPENING_HOURS}</li>
            <li><a href={"tel:+" + WHATSAPP_NUMBER}>{PHONE_DISPLAY}</a></li>
            <li><a href={"mailto:" + EMAIL}>{EMAIL}</a></li>
            <li>
              <a href={generalLink()} target="_blank" rel="noreferrer">
                Chat on WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>&copy; 2026 Hearth &amp; Key. Concept website built as a portfolio project.</p>
        </div>
      </div>
    </footer>
  );
}