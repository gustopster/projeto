import { Routes, Route } from 'react-router-dom';
import AnimalsComponent from '../Components/AnimalsComponent';
import SolicitantesPage from '../Pages/SolicitantesPage';
import ExamesPage from '../Pages/ExamesPage';

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/animais" element={<AnimalsComponent />} />
            <Route path="/solicitantes" element={<SolicitantesPage />} />
            <Route path="/exames" element={<ExamesPage />} />
        </Routes>
    );
};

export default AppRoutes;