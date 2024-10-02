import { AxiosError, AxiosResponse } from "axios";
import api from "../api";
import { Animal } from "../../Types/AnimalsType";

export const getAnimals = async (): Promise<Animal[]> => {
    try {
        const response = await api.get<Animal[]>('/api/animals');
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error('Erro ao buscar lista de animais');
        }
        throw error;
    }
};

export const deleteAnimal = async (id: number): Promise<number> => {
    try {
        const response: AxiosResponse = await api.delete(`/api/animals/${id}`);
        return response.status;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(`Erro ao deletar o animal com id ${id}`);
        }
        throw error;
    }
};

export const updateAnimal = async (id: number, updatedAnimal: Animal): Promise<number> => {
    try {
        const response = await api.put(`/api/animals/${id}`, updatedAnimal);
        return response.status;
    } catch (error) {
        if (error instanceof AxiosError) {
            if (error.response && error.response.status === 404) {
                throw new Error(`Animal com id ${id} não encontrado.`);
            }
            throw new Error(`Erro ao atualizar o animal com id ${id}: ${error.message}`);
        }
        throw error;
    }
};

export const createAnimal = async (newAnimal: Animal): Promise<Animal> => {
    try {
        const response = await api.post<Animal>('/api/animals', newAnimal);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error('Erro ao criar novo animal');
        }
        throw error;
    }
};

export const getAnimalById = async (id: number): Promise<Animal> => {
    try {
        const response = await api.get<Animal>(`/api/animals/${id}`);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(`Erro ao buscar o animal com id ${id}`);
        }
        throw error;
    }
};