import { Routes, Route } from 'react-router-dom';
import AnimalsComponent from '../Components/AnimalsComponent';
import SolicitantesPage from '../Pages/SolicitantesPage';
import ExamesPage from '../Pages/ExamesPage';
import ProtectedRoute from './ProtectedRoute';
import PaginaDeBoasVindas from '../Pages/PaginaDeBoasVindas';
import { useAuth } from '../Contexts/AuthContext';
import EspeciesPage from '../Pages/EspeciePage';

const AppRoutes: React.FC = () => {
    const { username } = useAuth();

    return (
        <Routes>
            <Route path="/animais" element={<AnimalsComponent />} />
            <Route path="/solicitantes" element={<SolicitantesPage />} />
            <Route path="/exames" element={<ExamesPage />} />
            <Route path="/especies" element={<EspeciesPage />} />
            <Route path="/projeto" element={
                <ProtectedRoute
                    component={PaginaDeBoasVindas}
                    render={({ }) => <PaginaDeBoasVindas nomeDoUsuario={username || ""} />}
                />
            } />
        </Routes>
    );
};

export default AppRoutes;