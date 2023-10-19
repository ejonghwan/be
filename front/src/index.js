import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ScrollTop from './components/common/scroll/ScrollToTop';
import { BrowserRouter } from 'react-router-dom';
import { ImageProvider } from './context/ImageContext';
import { UserProvider } from './context/UserContext';
import { GlobalProvider } from './context/UiContext';
import { SearchProvider } from './context/SearchContext';
import { ProjectProvider } from './context/ProjectContext';
import { WriteProvider } from './context/WriteContext';
import { HelmetProvider } from 'react-helmet-async';

// css
import './assets/css/fonts.css'
import './assets/css/reset.css'
import './assets/css/global.css'

import 'swiper/css';
import 'swiper/css/virtual';
import "swiper/css/navigation";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <ScrollTop />
      <HelmetProvider>
        <UserProvider>
          <ProjectProvider>
            <WriteProvider>
              <ImageProvider>
                <SearchProvider>
                      <GlobalProvider>
                        <App />
                      </GlobalProvider>
                </SearchProvider>
              </ImageProvider>
            </WriteProvider>
          </ProjectProvider>
        </UserProvider>
      </HelmetProvider>
    </BrowserRouter>
);

