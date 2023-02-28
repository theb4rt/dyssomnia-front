export interface IValues {
    email: string;
    name: string;
    password: string;
    terms: boolean;

}

export interface IFormValues {
    values: IValues;
    type: number; // 0 - login, 1 - register
}
