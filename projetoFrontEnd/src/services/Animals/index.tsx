import { AxiosError } from "axios";
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