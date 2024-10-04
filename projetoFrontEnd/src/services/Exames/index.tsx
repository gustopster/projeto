// Services/Exames/index.ts
import { AxiosError, AxiosResponse } from "axios";
import api from "../api";
import { Exame } from "../../Types/Exame"; // Importando a interface Exame

export const getExames = async (): Promise<Exame[]> => {
    try {
        const response = await api.get<Exame[]>('/api/exames');
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error('Erro ao buscar lista de exames');
        }
        throw error;
    }
};

export const deleteExame = async (id: number): Promise<number> => {
    try {
        const response: AxiosResponse = await api.delete(`/api/exames/${id}`);
        return response.status;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(`Erro ao deletar o exame com id ${id}`);
        }
        throw error;
    }
};

export const updateExame = async (id: number, updatedExame: Exame): Promise<number> => {
    try {
        const response = await api.put(`/api/exames/${id}`, updatedExame);
        return response.status;
    } catch (error) {
        if (error instanceof AxiosError) {
            if (error.response && error.response.status === 404) {
                throw new Error(`Exame com id ${id} não encontrado.`);
            }
            throw new Error(`Erro ao atualizar o exame com id ${id}: ${error.message}`);
        }
        throw error;
    }
};

export const createExame = async (newExame: Exame): Promise<Exame> => {
    try {
        const response = await api.post<Exame>('/api/exames', newExame);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error('Erro ao criar novo exame');
        }
        throw error;
    }
};

export const getExameById = async (id: number): Promise<Exame> => {
    try {
        const response = await api.get<Exame>(`/api/exames/${id}`);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(`Erro ao buscar o exame com id ${id}`);
        }
        throw error;
    }
};