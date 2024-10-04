// src/index.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import AppRoutes from './Routes';
import { ConfirmProvider } from './Components/ConfirmComponent/indexContext';
import { CreateModalProvider } from './Components/CreateModalComponent/indexContext';
import HeaderComponent from './Components/HeaderComponent/index';
import LoginComponent from './Components/LoginComponent';
import { useAuth, AuthProvider } from './Contexts/AuthContext';

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated ? (
        <>
          <HeaderComponent />
          <AppRoutes />
        </>
      ) : (
        <LoginComponent />
      )}
    </>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <ConfirmProvider>
          <CreateModalProvider>
            <App />
          </CreateModalProvider>
        </ConfirmProvider>
      </AuthProvider>
    </Router>
  </StrictMode>
);