import React from 'react';
import ReactDOM from 'react-dom/client';


import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageProvider } from './context/ImageContext.js'
import { UserProvider, UserContext } from './context/UserContext.js'
import { GlobalProvider } from './context/UiContext'

// css
import './assets/css/fonts.css'
import './assets/css/reset.css'
import './assets/css/global.css'

import 'swiper/css';
import 'swiper/css/virtual';
import "swiper/css/navigation";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    // <App />
  // </React.StrictMode>

  <BrowserRouter>
      <ToastContainer />
        <UserProvider>
          <ImageProvider>
            <GlobalProvider>
              <App />
            </GlobalProvider>
          </ImageProvider>
        </UserProvider>
  </BrowserRouter>
);

