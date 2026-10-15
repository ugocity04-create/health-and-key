import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header({ savedCount }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);
  const linkClass = ({ isActive }) => (isActive ? "nav-link active" : "nav-link");

  return (
    <header className="header">
      <div className="container header-inner">
        <Link className="logo" to="/" onClick={close}>
          Hearth <span>&amp;</span> Key
        </Link>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>

        <nav className={menuOpen ? "nav open" : "nav"}>
          <NavLink to="/" end className={linkClass} onClick={close}>
            Home
          </NavLink>
          <NavLink to="/properties" className={linkClass} onClick={close}>
            Properties
          </NavLink>
          <NavLink to="/saved" className={linkClass} onClick={close}>
            Saved
            {savedCount > 0 && <span className="badge">{savedCount}</span>}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}