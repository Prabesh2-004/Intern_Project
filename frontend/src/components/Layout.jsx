import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavbarRoutes = ['/login', '/register', '/onboarding'];

  const showNavbar = !hideNavbarRoutes.includes(location.pathname)
  return (
    <div>
      <Navbar />
      {children}
      {showNavbar && <Footer />}
    </div>
  );
};

export default Layout;
