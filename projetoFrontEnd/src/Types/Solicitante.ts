import { BaseType } from "./BaseType";

export interface Solicitante extends BaseType {
    nome?: string;
    contato?: string;
    endereco?: string;
}