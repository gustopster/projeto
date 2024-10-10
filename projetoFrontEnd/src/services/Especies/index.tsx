import { AxiosError, AxiosResponse } from "axios";
import api from "../api";
import { Especie } from "../../Types/Especie";

export const getEspecies = async (): Promise<Especie[]> => {
    try {
        const response = await api.get<Especie[]>('/api/especies');
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error('Erro ao buscar lista de espécies');
        }
        throw error;
    }
};

export const deleteEspecie = async (id: number): Promise<number> => {
    try {
        const response: AxiosResponse = await api.delete(`/api/especies/${id}`);
        return response.status;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(`Erro ao deletar a espécie com id ${id}`);
        }
        throw error;
    }
};

export const updateEspecie = async (id: number, updatedEspecie: Especie): Promise<number> => {
    try {
        const response = await api.put(`/api/especies/${id}`, updatedEspecie);
        return response.status;
    } catch (error) {
        if (error instanceof AxiosError) {
            if (error.response && error.response.status === 404) {
                throw new Error(`Espécie com id ${id} não encontrada.`);
            }
            throw new Error(`Erro ao atualizar a espécie com id ${id}: ${error.message}`);
        }
        throw error;
    }
};

export const createEspecie = async (newEspecie: Especie): Promise<Especie> => {
    try {
        const response = await api.post<Especie>('/api/especies', newEspecie);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error('Erro ao criar nova espécie');
        }
        throw error;
    }
};

export const getEspecieById = async (id: number): Promise<Especie> => {
    try {
        const response = await api.get<Especie>(`/api/especies/${id}`);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(`Erro ao buscar a espécie com id ${id}`);
        }
        throw error;
    }
};