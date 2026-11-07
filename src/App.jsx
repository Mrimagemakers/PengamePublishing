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
import Shop from '@/pages/Shop';
import Resources from '@/pages/Resources';
import Games from '@/pages/Games';

const AuthenticatedApp = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/experiences" element={<Games />} />
        <Route path="/games" element={<Games />} />
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
        <Router basename={window.location.hostname.endsWith('github.io') ? '/PengamePublishing' : '/'}>
          <AuthenticatedApp />
        </Router>
        <Toaster />
    </QueryClientProvider>
  )
}

export default App
