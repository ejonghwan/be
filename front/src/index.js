import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ImageProvider } from './context/ImageContext';
import { UserProvider } from './context/UserContext';
import { GlobalProvider } from './context/UiContext';
import { SearchProvider } from './context/SearchContext';

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
        <UserProvider>
          <ImageProvider>
            <SearchProvider>
              <GlobalProvider>
                <App />
              </GlobalProvider>
            </SearchProvider>
          </ImageProvider>
        </UserProvider>
    </BrowserRouter>
);

