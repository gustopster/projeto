import axios from 'axios';

const API_URL = 'http://localhost:8080/carteira';

export interface Carteira {
    id?: number;
    pedido: string;
    item: string;
}

export const CarteiraService = {
    getAll: async (): Promise<Carteira[]> => {
        const response = await axios.get<Carteira[]>(API_URL);
        return response.data;
    },

    getById: async (id: number): Promise<Carteira> => {
        const response = await axios.get<Carteira>(`${API_URL}/${id}`);
        return response.data;
    },

    create: async (carteira: Carteira): Promise<Carteira> => {
        const response = await axios.post<Carteira>(API_URL, carteira);
        return response.data;
    },

    update: async (id: number, carteira: Carteira): Promise<Carteira> => {
        const response = await axios.put<Carteira>(`${API_URL}/${id}`, carteira);
        return response.data;
    },

    delete: async (id: number): Promise<void> => {
        await axios.delete(`${API_URL}/${id}`);
    },
};