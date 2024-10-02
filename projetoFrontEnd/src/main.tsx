import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AnimalsComponent from './Components/AnimalsComponent';
import HeaderComponent from './Components/HeaderComponent';
import { ConfirmProvider } from './Components/ConfirmComponent/indexContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfirmProvider>
      <HeaderComponent />
      <AnimalsComponent />
    </ConfirmProvider>
  </StrictMode>,
);