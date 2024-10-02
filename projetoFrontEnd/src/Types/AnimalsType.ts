import { BaseType } from "./BaseType";

export interface Animal extends BaseType {
    dataColeta?: Date;
    numeroIdIpram?: string;
    fai?: string;
    observacoes?: string;
}