import React, { createContext, useContext, useState } from 'react';
import { definirSenha, getSolicitanteByName, verificarSenha } from '../Services/Solicitantes'; // Importar o serviço de solicitantes
import { AxiosError } from 'axios';

interface AuthContextType {
    isAuthenticated: boolean;
    username: string | null;
    login: (username: string) => Promise<boolean | AxiosError>;
    logout: () => void;
    authSenha: (nome: string, senha: string) => Promise<boolean | AxiosError>;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    authSenhaDefinir: (nome: string, senha: string) => Promise<boolean | AxiosError>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [username, setUsername] = useState<string | null>(null);

    const login = async (user: string): Promise<boolean | AxiosError> => {
        try {
            const resultado = await getSolicitanteByName(user);
            setUsername(user);
            return resultado;
        } catch (error) {
            if (error instanceof AxiosError) {
                return error;
            }
            return new AxiosError('Erro desconhecido ao tentar fazer login');
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUsername(null);
    };

    const authSenha = async (nome: string, senha: string): Promise<boolean | AxiosError> => {
        try {
            const resultado = await verificarSenha({ nome, senha });
            return resultado;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error('Erro ao verificar senha:', error.message);
                return error;
            }
            return new AxiosError('Erro desconhecido ao tentar verificar senha');
        }
    };

    const authSenhaDefinir = async (nome: string, senha: string): Promise<boolean | AxiosError> => {
        try {
            const resultado = await definirSenha({ nome, senha });
            return resultado;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error('Erro ao verificar senha:', error.message);
                return error;
            }
            return new AxiosError('Erro desconhecido ao tentar verificar senha');
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, username, login, logout, authSenha, setIsAuthenticated, authSenhaDefinir }}>
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