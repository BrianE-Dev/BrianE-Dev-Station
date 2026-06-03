export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-800 pt-8 text-sm text-slate-500">
      <p>&copy; {new Date().getFullYear()} BrianE-Dev. Built with React, Vite, Express, PostgreSQL, Paystack, R2, Mux, and PostHog.</p>
    </footer>
  )
}
