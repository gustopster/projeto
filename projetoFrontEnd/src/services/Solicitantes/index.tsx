// Services/Solicitantes/index.ts
import { AxiosError, AxiosResponse } from "axios";
import api from "../api";
import { Solicitante } from "../../Types/Solicitante"; // Importando a interface Solicitante

export const getSolicitantes = async (): Promise<Solicitante[]> => {
    try {
        const response = await api.get<Solicitante[]>('/api/solicitantes');
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error('Erro ao buscar lista de solicitantes');
        }
        throw error;
    }
};

export const deleteSolicitante = async (id: number): Promise<number> => {
    try {
        const response: AxiosResponse = await api.delete(`/api/solicitantes/${id}`);
        return response.status;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(`Erro ao deletar o solicitante com id ${id}`);
        }
        throw error;
    }
};

export const updateSolicitante = async (id: number, updatedSolicitante: Solicitante): Promise<number> => {
    try {
        const response = await api.put(`/api/solicitantes/${id}`, updatedSolicitante);
        return response.status;
    } catch (error) {
        if (error instanceof AxiosError) {
            if (error.response && error.response.status === 404) {
                throw new Error(`Solicitante com id ${id} não encontrado.`);
            }
            throw new Error(`Erro ao atualizar o solicitante com id ${id}: ${error.message}`);
        }
        throw error;
    }
};

export const createSolicitante = async (newSolicitante: Solicitante): Promise<Solicitante> => {
    try {
        const response = await api.post<Solicitante>('/api/solicitantes', newSolicitante);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error('Erro ao criar novo solicitante');
        }
        throw error;
    }
};

export const getSolicitanteById = async (id: number): Promise<Solicitante> => {
    try {
        const response = await api.get<Solicitante>(`/api/solicitantes/${id}`);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(`Erro ao buscar o solicitante com id ${id}`);
        }
        throw error;
    }
};

export const getSolicitanteByName = async (nome: string): Promise<Solicitante> => {
    try {
        const response = await api.get<Solicitante>(`/api/solicitantes/por-nome/${nome}`);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(`Erro ao buscar o solicitante com nome ${nome}`);
        }
        throw error;
    }
};