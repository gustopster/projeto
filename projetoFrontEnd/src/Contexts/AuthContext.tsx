import React, { createContext, useContext, useState } from 'react';
import { getSolicitanteByName, getSolicitantes } from '../Services/Solicitantes'; // Importar o serviço de solicitantes

interface AuthContextType {
    isAuthenticated: boolean;
    username: string | null;
    login: (username: string) => Promise<boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [username, setUsername] = useState<string | null>(null);

    const login = async (user: string): Promise<boolean> => {
        try {
            const solicitante = await getSolicitanteByName(user);
            if (solicitante && solicitante.nome) {
                setIsAuthenticated(true);
                setUsername(solicitante.nome);
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error("Erro ao tentar fazer login", error);
            return false;
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUsername(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, username, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};