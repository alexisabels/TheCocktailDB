import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop';

import './Main.css';

function Main() {
  return (
    <div className="main-container">
      <ScrollToTop />
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>
      <Header />
      <main id="main-content" className="main-content" tabIndex="-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Main;
