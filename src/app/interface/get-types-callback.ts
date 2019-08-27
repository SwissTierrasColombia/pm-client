export interface GetTypesCallback {
    _id: string;
    callback: string;
    fields: Field[];
    createdAt: string;
}

export interface Field {
    _id: string;
    field: string;
    typeData: TypeData;
}

export interface TypeData {
    _id: string;
    typeData: string;
    __v: number;
}