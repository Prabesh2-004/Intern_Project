import React, { useRef } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';

const Layout = ({ children, pid, token }) => {
  const location = useLocation();
  const hideNavbarRoutes = [
    '/login',
    '/register',
    '/onboarding',
    `/product/${pid}`,
  ];
  const scrollRef = useRef(null);

  const showNavbar = !hideNavbarRoutes.includes(location.pathname);
  return (
    <>
      <Navbar token={token} />
      <div ref={scrollRef}>
        {children}
        {showNavbar && <Footer />}
      </div>
    </>
  );
};

export default Layout;
