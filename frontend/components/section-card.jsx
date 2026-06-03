import { Link } from "react-router-dom";

export default function SectionCard({ title, description, href }) {
  return (
    <Link
      to={href}
      className="group rounded-3xl border border-slate-800 bg-slate-900/70 p-8 transition hover:border-cyan-500"
    >
      <h3 className="text-xl font-semibold text-white transition group-hover:text-cyan-300">
        {title}
      </h3>
      <p className="mt-4 text-slate-300">{description}</p>
    </Link>
  );
}
