import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ImageProvider } from './context/ImageContext';
import { UserProvider } from './context/UserContext';
import { GlobalProvider } from './context/UiContext';
import { SearchProvider } from './context/SearchContext';
import { ProjectProvider } from './context/ProjectContext';
import { WriteProvider } from './context/WriteContext';
import { CommentProvider } from './context/CommentContext';
import { RecommentProvider } from './context/RecommentContext';

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
          <ProjectProvider>
            <WriteProvider>
              <ImageProvider>
                <SearchProvider>
                  <CommentProvider>
                    <RecommentProvider>
                      <GlobalProvider>
                        <App />
                      </GlobalProvider>
                    </RecommentProvider>
                  </CommentProvider>
                </SearchProvider>
              </ImageProvider>
            </WriteProvider>
          </ProjectProvider>
        </UserProvider>
    </BrowserRouter>
);

