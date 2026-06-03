import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";
import Footer from "../components/footer.jsx";
import SiteNav from "../components/site-nav.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import {
  HomePage,
  CoursesPage,
  DashboardPage,
  LoginPage,
  SignupPage,
  TutorialsPage,
  BlogPage,
  EbooksPage,
  PricingPage,
  AboutPage,
  ContactPage,
  NotFoundPage,
} from "./pages/index.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-6 text-left lg:px-8">
            <SiteNav />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/courses" element={<CoursesPage />} />
                <Route path="/tutorials" element={<TutorialsPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/ebooks" element={<EbooksPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <DashboardPage />
                    </ProtectedRoute>
                  }
                />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
