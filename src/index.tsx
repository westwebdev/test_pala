import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './common/App';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter } from 'react-router-dom';
import LocaleProvider from './provider/LocaleProvider';

import './index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    // <React.StrictMode>
        <BrowserRouter>
            <LocaleProvider>
                <Header/>
                <App />
                <Footer/>
            </LocaleProvider>
        </BrowserRouter>
    // </React.StrictMode>
);