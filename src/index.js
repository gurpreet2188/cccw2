import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import NewsPage from './pages/News';
import ContactUs from './pages/Contactus';
import AboutUS from './pages/AboutUS';
import Crypto from './pages/Crypto';
import Stocks from './pages/Stocks';
import StockDetail from './pages/StockDetail';
// import '../fonts/CaptureIT/capture_it.ttf'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="crypto/:id" element={<Crypto />} />
          <Route path="news" element={<NewsPage />} />
          <Route path="stocks/:id" element={<Stocks />} />
          <Route path="stocks-detail/:id" element={<StockDetail/>} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="about-us" element={<AboutUS />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
