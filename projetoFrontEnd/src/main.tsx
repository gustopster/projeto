import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AnimalsComponent from './Components/AnimalsComponent'
import HeaderComponent from './Components/HeaderComponent';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HeaderComponent />
    <AnimalsComponent />
  </StrictMode>,
);