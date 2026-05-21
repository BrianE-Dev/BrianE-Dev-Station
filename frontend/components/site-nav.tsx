import { navLinks } from '../lib/site-config'

export default function SiteNav() {
  return (
    <header className="mb-10 flex items-center justify-between border-b border-slate-800 pb-5">
      <a href="/" className="text-lg font-semibold text-white">
        BrianE-Dev
      </a>
      <nav className="hidden items-center gap-6 md:flex">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} className="text-sm text-slate-300 transition hover:text-white">
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  )
}
