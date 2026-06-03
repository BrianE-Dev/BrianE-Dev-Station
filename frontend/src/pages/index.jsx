import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Hero from "../features/marketing/hero.jsx";
import SectionCard from "../components/section-card.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import { getCourses } from "../services/api.js";
import { homeFeatures } from "../lib/site-config.js";

function StatusMessage({ title, description, className = "" }) {
  return (
    <section
      className={`rounded-3xl border border-slate-800 bg-slate-900/80 p-8 ${className}`}
    >
      <h1 className="text-3xl font-semibold text-white">{title}</h1>
      <p className="mt-3 text-slate-300">{description}</p>
    </section>
  );
}

export function HomePage() {
  return (
    <section className="space-y-10 py-10">
      <Hero />
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">
            React SPA platform
          </p>
          <h2 className="max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
            Build a course marketplace and student dashboard with real API data.
          </h2>
          <p className="max-w-2xl text-slate-300 sm:text-lg">
            Connect React Router, TanStack Query, and Express REST APIs to
            surface courses, auth, and protected dashboard views.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              to="/courses"
              className="rounded-lg bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              Browse courses
            </Link>
            <Link
              to="/dashboard"
              className="rounded-lg border border-slate-700 px-5 py-3 text-sm text-slate-100 transition hover:border-slate-500"
            >
              Go to dashboard
            </Link>
          </div>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8">
          <h3 className="text-xl font-semibold text-white">
            Live API-backed screen
          </h3>
          <p className="mt-4 text-slate-300">
            The courses page now loads from `/api/courses`, with loading, error,
            and empty UI states powered by TanStack Query.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {homeFeatures.map((feature) => (
          <SectionCard
            key={feature.title}
            title={feature.title}
            description={feature.description}
            href={feature.href}
          />
        ))}
      </div>
    </section>
  );
}

export function CoursesPage() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: getCourses,
  });
  const courses = data?.courses ?? [];

  if (isLoading) {
    return (
      <StatusMessage
        title="Loading courses"
        description="Fetching published courses from the API..."
        className="text-cyan-300"
      />
    );
  }

  if (error) {
    return (
      <StatusMessage
        title="Unable to load courses"
        description={
          error instanceof Error
            ? error.message
            : "An unexpected error occurred while fetching courses."
        }
        className="border-red-500 text-red-300"
      />
    );
  }

  if (!courses.length) {
    return (
      <StatusMessage
        title="No courses found"
        description="There are no published courses to display yet."
      />
    );
  }

  return (
    <section className="space-y-8 py-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-white">Courses</h1>
          <p className="max-w-3xl text-slate-300">
            Browse available courses loaded from the backend API, including
            titles, descriptions, and links to details.
          </p>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 px-5 py-4 text-sm text-slate-300">
          {courses.length} published course{courses.length === 1 ? "" : "s"}{" "}
          available
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {courses.map((course) => (
          <SectionCard
            key={course.id}
            title={course.title}
            description={course.description}
            href={`/courses/${course.slug}`}
          />
        ))}
      </div>
    </section>
  );
}

export function DashboardPage() {
  const { user, logout, authLoading } = useAuth();
  const { data, error, isLoading } = useQuery({
    queryKey: ["dashboard", "courses"],
    queryFn: getCourses,
  });
  const courses = data?.courses ?? [];

  if (authLoading) {
    return (
      <StatusMessage
        title="Checking auth"
        description="Validating your session before showing dashboard content."
      />
    );
  }

  return (
    <section className="space-y-8 py-10">
      <div className="flex flex-col gap-6 rounded-3xl border border-slate-800 bg-slate-900/80 p-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">
            Protected dashboard
          </p>
          <h1 className="text-3xl font-semibold text-white">
            Welcome back, {user?.username || "learner"}.
          </h1>
          <p className="max-w-3xl text-slate-300">
            Your dashboard is protected and can be extended with user progress,
            purchases, and content access.
          </p>
        </div>
        <button
          onClick={logout}
          className="rounded-lg border border-slate-700 bg-slate-950/80 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-500"
        >
          Log out
        </button>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">
            My account
          </p>
          <p className="mt-4 text-lg font-semibold text-white">{user?.email}</p>
          <p className="mt-2 text-slate-300">Role: {user?.role || "student"}</p>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">
            Course data
          </p>
          {isLoading ? (
            <p className="mt-4 text-slate-300">Loading summary...</p>
          ) : error ? (
            <p className="mt-4 text-red-300">Unable to load course summary.</p>
          ) : (
            <p className="mt-4 text-slate-300">
              {courses.length} published course{courses.length === 1 ? "" : "s"}{" "}
              currently available.
            </p>
          )}
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">
            Next step
          </p>
          <p className="mt-4 text-slate-300">
            Extend this panel with lesson progress, purchases, and protected
            downloads from the Express API.
          </p>
        </div>
      </div>
    </section>
  );
}

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState(null);
  const { login, user, authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  if (user) {
    return <Navigate to={from} replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setFormError(null);

    try {
      await login({ email, password });
      navigate(from, { replace: true });
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Unable to sign in.");
    }
  }

  return (
    <section className="py-10">
      <div className="mx-auto max-w-2xl space-y-6 rounded-3xl border border-slate-800 bg-slate-900/80 p-8">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">
            Sign in
          </p>
          <h1 className="text-3xl font-semibold text-white">
            Access your dashboard
          </h1>
          <p className="max-w-2xl text-slate-300">
            Sign in with your email and password to unlock the protected
            dashboard and course progress.
          </p>
        </div>

        {formError ? (
          <p className="rounded-lg border border-red-600 bg-red-950/50 px-4 py-3 text-sm text-red-300">
            {formError}
          </p>
        ) : null}

        <form className="grid gap-4" onSubmit={handleSubmit}>
          <label className="grid gap-2 text-sm text-slate-300">
            Email
            <input
              className="rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white outline-none focus:border-cyan-500"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              required
            />
          </label>
          <label className="grid gap-2 text-sm text-slate-300">
            Password
            <input
              className="rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white outline-none focus:border-cyan-500"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              required
            />
          </label>
          <button
            type="submit"
            className="rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
            disabled={authLoading}
          >
            {authLoading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="text-sm text-slate-400">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-cyan-300 underline hover:text-cyan-200"
          >
            Create one
          </Link>
        </p>
      </div>
    </section>
  );
}

export function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState(null);
  const { signup, user, authLoading } = useAuth();
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setFormError(null);

    try {
      await signup({ username, email, password });
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : "Unable to create account.",
      );
    }
  }

  return (
    <section className="py-10">
      <div className="mx-auto max-w-2xl space-y-6 rounded-3xl border border-slate-800 bg-slate-900/80 p-8">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">
            Create account
          </p>
          <h1 className="text-3xl font-semibold text-white">Join BrianE-Dev</h1>
          <p className="max-w-2xl text-slate-300">
            Register for a new account and start using the protected student
            dashboard immediately.
          </p>
        </div>

        {formError ? (
          <p className="rounded-lg border border-red-600 bg-red-950/50 px-4 py-3 text-sm text-red-300">
            {formError}
          </p>
        ) : null}

        <form className="grid gap-4" onSubmit={handleSubmit}>
          <label className="grid gap-2 text-sm text-slate-300">
            Username
            <input
              className="rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white outline-none focus:border-cyan-500"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              type="text"
              required
            />
          </label>
          <label className="grid gap-2 text-sm text-slate-300">
            Email
            <input
              className="rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white outline-none focus:border-cyan-500"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              required
            />
          </label>
          <label className="grid gap-2 text-sm text-slate-300">
            Password
            <input
              className="rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white outline-none focus:border-cyan-500"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              required
            />
          </label>
          <button
            type="submit"
            className="rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
            disabled={authLoading}
          >
            {authLoading ? "Creating account…" : "Create account"}
          </button>
        </form>

        <p className="text-sm text-slate-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-cyan-300 underline hover:text-cyan-200"
          >
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
}

export function TutorialsPage() {
  return (
    <section className="space-y-6 py-10">
      <h1 className="text-3xl font-semibold text-white">Tutorials</h1>
      <p className="max-w-3xl text-slate-300">
        Publish hands-on developer guides that support search, categories, and
        learning pathways inside the SPA.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {["Modern stack guides", "Publishing workflows"].map((title) => (
          <article
            key={title}
            className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6"
          >
            <h2 className="text-xl font-semibold text-white">{title}</h2>
            <p className="mt-3 text-slate-300">
              Step-by-step content for frontend, backend, cloud, and creator
              operations.
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function BlogPage() {
  return (
    <section className="space-y-6 py-10">
      <h1 className="text-3xl font-semibold text-white">Blog</h1>
      <p className="max-w-3xl text-slate-300">
        Publish launch notes, case studies, and developer articles that bring
        visitors into the course and ebook funnel.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {[
          "Launch architecture for creators",
          "Build trust with storytelling",
        ].map((title) => (
          <article
            key={title}
            className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6"
          >
            <h2 className="text-xl font-semibold text-white">{title}</h2>
            <p className="mt-3 text-slate-300">
              Plan content around secure downloads, streaming video, and learner
              conversion loops.
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function EbooksPage() {
  return (
    <section className="space-y-6 py-10">
      <h1 className="text-3xl font-semibold text-white">Ebooks</h1>
      <p className="max-w-3xl text-slate-300">
        Sell PDFs, cheat sheets, and architecture guides with purchase
        verification and temporary signed download URLs.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          "API Design Patterns",
          "Cloud Cost Optimization",
          "Developer Growth Kit",
        ].map((title) => (
          <article
            key={title}
            className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6"
          >
            <h2 className="text-xl font-semibold text-white">{title}</h2>
            <p className="mt-2 text-slate-300">
              Protected download delivery through Cloudflare R2 or Amazon S3.
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "NGN 15k",
      description: "Basic course access and newsletter updates.",
    },
    {
      name: "Creator",
      price: "NGN 35k",
      description: "All courses plus ebook library and downloads.",
    },
    {
      name: "Pro",
      price: "NGN 75k",
      description: "Full access, premium content, and community perks.",
    },
  ];

  return (
    <section className="space-y-6 py-10">
      <h1 className="text-3xl font-semibold text-white">Pricing</h1>
      <p className="max-w-3xl text-slate-300">
        Define Paystack-ready plans for courses, ebooks, memberships, or bundled
        creator products.
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <article
            key={plan.name}
            className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6"
          >
            <h2 className="text-xl font-semibold text-white">{plan.name}</h2>
            <p className="mt-2 text-4xl font-semibold text-cyan-300">
              {plan.price}
            </p>
            <p className="mt-4 text-slate-300">{plan.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function AboutPage() {
  return (
    <section className="space-y-6 py-10">
      <h1 className="text-3xl font-semibold text-white">About BrianE-Dev</h1>
      <p className="max-w-3xl text-slate-300">
        BrianE-Dev is designed for creators who want to publish developer
        training, sell ebooks, and build community-driven growth programs.
      </p>
      <p className="max-w-3xl text-slate-300">
        The product starts as a React SPA and connects to an Express backend for
        auth, courses, purchases, downloads, analytics, and admin workflows.
      </p>
    </section>
  );
}

export function ContactPage() {
  return (
    <section className="space-y-6 py-10">
      <h1 className="text-3xl font-semibold text-white">Contact</h1>
      <p className="max-w-3xl text-slate-300">
        Add support, partnership, and learner enquiry flows here, backed by the
        Express API or your preferred email service.
      </p>
      <form className="grid max-w-2xl gap-4">
        <input
          className="rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 focus:border-cyan-400 focus:outline-none"
          placeholder="Name"
        />
        <input
          className="rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 focus:border-cyan-400 focus:outline-none"
          placeholder="Email"
          type="email"
        />
        <textarea
          className="min-h-32 rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 focus:border-cyan-400 focus:outline-none"
          placeholder="Message"
        />
        <button className="w-fit rounded-2xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
          Send message
        </button>
      </form>
    </section>
  );
}

export function NotFoundPage() {
  return (
    <section className="space-y-6 py-10">
      <h1 className="text-3xl font-semibold text-white">Page not found</h1>
      <p className="max-w-3xl text-slate-300">
        This route is not part of the BrianE-Dev React SPA yet.
      </p>
      <Link
        to="/"
        className="inline-flex rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
      >
        Back home
      </Link>
    </section>
  );
}
