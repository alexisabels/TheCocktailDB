import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import './Main.css'; 

const Main = () => {
  return (
    <div className="main-container"> {/* Aplica la clase main-container */}
      <Header />
      <Outlet />
      <Footer /> 
    </div>
  );
}

export default Main;
