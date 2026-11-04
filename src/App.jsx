import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';

// Page imports
import Home from '@/pages/Home';
import Publications from '@/pages/Publications';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Layout from '@/components/layout/Layout';
import BigBookOfCookies from '@/pages/BigBookOfCookies';
import LeadershipAcademy from '@/pages/LeadershipAcademy';
import Games from '@/pages/Games';
import BookExperiences from '@/pages/BookExperiences';

const AuthenticatedApp = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/book-experiences" element={<BookExperiences />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/big-book-of-cookies" element={<BigBookOfCookies />} />
        <Route path="/leadership-academy" element={<LeadershipAcademy />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
        <Router basename={import.meta.env.BASE_URL}>
          <AuthenticatedApp />
        </Router>
        <Toaster />
    </QueryClientProvider>
  )
}

export default App
