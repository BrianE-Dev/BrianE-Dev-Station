import { BrowserRouter, Link, NavLink, Route, Routes } from 'react-router-dom'

import './App.css'
import Footer from '../components/footer'
import Hero from '../features/marketing/hero'
import { homeFeatures, navLinks } from '../lib/site-config'

function SiteNav() {
  return (
    <header className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
      <Link to="/" className="text-lg font-semibold text-white">
        BrianE-Dev
      </Link>
      <nav className="flex flex-wrap items-center gap-4 sm:gap-6">
        {navLinks.map((link) => (
          <NavLink
            key={link.href}
            to={link.href}
            className={({ isActive }) =>
              `text-sm transition hover:text-white ${isActive ? 'text-cyan-300' : 'text-slate-300'}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}

function SectionCard({ title, description, href }) {
  return (
    <Link to={href} className="group rounded-lg border border-slate-800 bg-slate-900/70 p-6 transition hover:border-cyan-500">
      <h3 className="text-xl font-semibold text-white transition group-hover:text-cyan-300">{title}</h3>
      <p className="mt-4 text-slate-300">{description}</p>
    </Link>
  )
}

function HomePage() {
  return (
    <section className="space-y-12 py-10">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">React SPA platform</p>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
            Build courses, tutorials, ebooks, and student dashboards without Next.js.
          </h1>
          <p className="max-w-2xl text-slate-300 sm:text-lg">
            BrianE-Dev starts as a Vite-powered React app with REST API integration, secure digital product delivery, and a path toward a full learning marketplace.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link to="/courses" className="rounded-lg bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
              Browse courses
            </Link>
            <Link to="/ebooks" className="rounded-lg border border-slate-700 px-5 py-3 text-sm text-slate-100 transition hover:border-slate-500">
              Visit ebook shop
            </Link>
          </div>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-6 shadow-soft">
          <h2 className="text-xl font-semibold text-white">MVP architecture</h2>
          <ul className="mt-6 space-y-4 text-slate-300">
            <li>React, Vite, Tailwind CSS, React Router</li>
            <li>Express REST API with PostgreSQL and Redis</li>
            <li>Paystack checkout with webhook access grants</li>
            <li>Cloudflare R2 for PDFs and Mux for video</li>
          </ul>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {homeFeatures.map((feature) => (
          <SectionCard key={feature.title} title={feature.title} description={feature.description} href={feature.href} />
        ))}
      </div>
    </section>
  )
}

function CoursesPage() {
  const courseTitles = ['Frontend Foundations with React', 'Express API Architecture', 'PostgreSQL for Product Apps']

  return (
    <section className="space-y-6 py-10">
      <h1 className="text-3xl font-semibold text-white">Courses</h1>
      <p className="max-w-3xl text-slate-300">
        The course module supports videos, ordered lessons, lesson content, progress tracking, and future quizzes through the Express API.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {courseTitles.map((title) => (
          <article key={title} className="rounded-lg border border-slate-800 bg-slate-900/70 p-6">
            <h2 className="text-xl font-semibold text-white">{title}</h2>
            <p className="mt-2 text-slate-300">A modular course with secure video hosting, notes, and downloadable resources.</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function TutorialsPage() {
  return (
    <section className="space-y-6 py-10">
      <h1 className="text-3xl font-semibold text-white">Tutorials</h1>
      <p className="max-w-3xl text-slate-300">
        Publish hands-on developer guides that support search, categories, and learning pathways inside the SPA.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {['Modern stack guides', 'Publishing workflows'].map((title) => (
          <article key={title} className="rounded-lg border border-slate-800 bg-slate-900/70 p-6">
            <h2 className="text-xl font-semibold text-white">{title}</h2>
            <p className="mt-3 text-slate-300">Step-by-step content for frontend, backend, cloud, and creator operations.</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function BlogPage() {
  return (
    <section className="space-y-6 py-10">
      <h1 className="text-3xl font-semibold text-white">Blog</h1>
      <p className="max-w-3xl text-slate-300">
        Publish launch notes, case studies, and developer articles that bring visitors into the course and ebook funnel.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {['Launch architecture for creators', 'Build trust with storytelling'].map((title) => (
          <article key={title} className="rounded-lg border border-slate-800 bg-slate-900/70 p-6">
            <h2 className="text-xl font-semibold text-white">{title}</h2>
            <p className="mt-3 text-slate-300">Plan content around secure downloads, streaming video, and learner conversion loops.</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function EbooksPage() {
  const ebookTitles = ['API Design Patterns', 'Cloud Cost Optimization', 'Developer Growth Kit']

  return (
    <section className="space-y-6 py-10">
      <h1 className="text-3xl font-semibold text-white">Ebooks</h1>
      <p className="max-w-3xl text-slate-300">
        Sell PDFs, cheat sheets, and architecture guides with purchase verification and temporary signed download URLs.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ebookTitles.map((title) => (
          <article key={title} className="rounded-lg border border-slate-800 bg-slate-900/70 p-6">
            <h2 className="text-xl font-semibold text-white">{title}</h2>
            <p className="mt-2 text-slate-300">Protected download delivery through Cloudflare R2 or Amazon S3.</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function PricingPage() {
  const plans = [
    { name: 'Starter', price: 'NGN 15k', description: 'Basic course access and newsletter updates.' },
    { name: 'Creator', price: 'NGN 35k', description: 'All courses plus ebook library and downloads.' },
    { name: 'Pro', price: 'NGN 75k', description: 'Full access, premium content, and community perks.' },
  ]

  return (
    <section className="space-y-6 py-10">
      <h1 className="text-3xl font-semibold text-white">Pricing</h1>
      <p className="max-w-3xl text-slate-300">
        Define Paystack-ready plans for courses, ebooks, memberships, or bundled creator products.
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <article key={plan.name} className="rounded-lg border border-slate-800 bg-slate-900/70 p-6">
            <h2 className="text-xl font-semibold text-white">{plan.name}</h2>
            <p className="mt-2 text-4xl font-semibold text-cyan-300">{plan.price}</p>
            <p className="mt-4 text-slate-300">{plan.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function AboutPage() {
  return (
    <section className="space-y-6 py-10">
      <h1 className="text-3xl font-semibold text-white">About BrianE-Dev</h1>
      <p className="max-w-3xl text-slate-300">
        BrianE-Dev is designed for creators who want to publish developer training, sell ebooks, and build community-driven growth programs.
      </p>
      <p className="max-w-3xl text-slate-300">
        The product starts as a React SPA and connects to an Express backend for auth, courses, purchases, downloads, analytics, and admin workflows.
      </p>
    </section>
  )
}

function ContactPage() {
  return (
    <section className="space-y-6 py-10">
      <h1 className="text-3xl font-semibold text-white">Contact</h1>
      <p className="max-w-3xl text-slate-300">
        Add support, partnership, and learner enquiry flows here, backed by the Express API or your preferred email service.
      </p>
      <form className="grid max-w-2xl gap-4">
        <input className="rounded-lg border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 focus:border-cyan-400 focus:outline-none" placeholder="Name" />
        <input className="rounded-lg border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 focus:border-cyan-400 focus:outline-none" placeholder="Email" type="email" />
        <textarea className="min-h-32 rounded-lg border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 focus:border-cyan-400 focus:outline-none" placeholder="Message" />
        <button className="w-fit rounded-lg bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
          Send message
        </button>
      </form>
    </section>
  )
}

function DashboardPage() {
  const cards = ['My Courses', 'Purchased Ebooks', 'Progress Tracking', 'Account Settings', 'Downloads']

  return (
    <section className="space-y-6 py-10">
      <h1 className="text-3xl font-semibold text-white">Dashboard</h1>
      <p className="max-w-3xl text-slate-300">
        Authenticated users can track lessons, access purchases, update account details, and download protected assets.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <article key={card} className="rounded-lg border border-slate-800 bg-slate-900/70 p-6">
            <h2 className="text-xl font-semibold text-white">{card}</h2>
            <p className="mt-3 text-slate-300">Connect this panel to JWT-protected Express endpoints.</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function NotFoundPage() {
  return (
    <section className="space-y-6 py-10">
      <h1 className="text-3xl font-semibold text-white">Page not found</h1>
      <p className="max-w-3xl text-slate-300">This route is not part of the BrianE-Dev React SPA yet.</p>
      <Link to="/" className="inline-flex rounded-lg bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
        Back home
      </Link>
    </section>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-6 text-left lg:px-8">
        <SiteNav />
        <main className="flex-1">
          <Hero />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/tutorials" element={<TutorialsPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/ebooks" element={<EbooksPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
