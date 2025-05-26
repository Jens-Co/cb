import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Cloudburst from './pages/Cloudburst';
import Nukkit from './pages/Nukkit';
import NotFound from './pages/NotFound';

export default function AppRoutes() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      const main = document.getElementById('primary-app-container');
      if (main) main.focus();
    }, 50);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cloudburst" element={<Cloudburst />} />
      <Route path="/nukkit" element={<Nukkit />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
