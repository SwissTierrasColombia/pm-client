
export interface GetStepsProcess {
    _id: string;
    typeStep: string;
    rules: Rule[];
    createdAt: string;
}

export interface Rule {
    conditions: Condition[];
    callbacks: Callback[];
    _id: string;
}

export interface Callback {
    _id: string;
    callback: string;
    metadata: Metadata;
}

export interface Metadata {
    to?: string;
    subject?: string;
    text?: string;
    step?: string;
}

export interface Condition {
    _id: string;
    field: string;
    operator: string;
    value: number;
}