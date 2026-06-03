import { Link, NavLink } from "react-router-dom";
import { navLinks } from "../lib/site-config.js";

export default function SiteNav() {
  return (
    <header className="mb-10 flex items-center justify-between border-b border-slate-800 pb-5">
      <Link to="/" className="text-lg font-semibold text-white">
        BrianE-Dev
      </Link>
      <nav className="hidden items-center gap-6 md:flex">
        {navLinks.map((link) => (
          <NavLink
            key={link.href}
            to={link.href}
            className={({ isActive }) =>
              `text-sm transition ${isActive ? "text-cyan-300" : "text-slate-300"} hover:text-white`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
