import { BaseType } from "./BaseType";

export interface Exame extends BaseType {
    tipo?: string;
    data?: Date;
    resultado?: string;
    observacoes?: string;
}