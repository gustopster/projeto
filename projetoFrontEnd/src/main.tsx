// src/main.tsx

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; // Adicione essa importação
import './index.css';
import AppRoutes from './Routes';
import { ConfirmProvider } from './Components/ConfirmComponent/indexContext';
import { CreateModalProvider } from './Components/CreateModalComponent/indexContext';
import HeaderComponent from './Components/HeaderComponent';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <ConfirmProvider>
        <CreateModalProvider>
          <HeaderComponent />
          <AppRoutes />
        </CreateModalProvider>
      </ConfirmProvider>
    </Router>
  </StrictMode>,
);