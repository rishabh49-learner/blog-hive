import React from "react";
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const Layout = ({ children }) => {
  const showNavbarAndFooter = !window.location.pathname.includes('/login') && !window.location.pathname.includes('/register');

  return (
    <>
      {showNavbarAndFooter && <Navbar />}
      {children}
      {showNavbarAndFooter && <Footer />}
    </>
  );
};

export default Layout;
