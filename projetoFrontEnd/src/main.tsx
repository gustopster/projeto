import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AnimalsComponent from './Components/AnimalsComponent';
import HeaderComponent from './Components/HeaderComponent';
import { ConfirmProvider } from './Components/ConfirmComponent/indexContext';
import { CreateModalProvider } from './Components/CreateModalComponent/indexContext';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfirmProvider>
      <CreateModalProvider>
        <HeaderComponent />
        <AnimalsComponent />
      </CreateModalProvider>
    </ConfirmProvider>
  </StrictMode>,
);