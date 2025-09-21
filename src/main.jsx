// Alternative if you prefer
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import "./config/global";
import AuthContext from './contexts/Auth.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      {/* <AuthContext> */}
        <App />
      {/* </AuthContext> */}
    </BrowserRouter>
  </StrictMode>
);
