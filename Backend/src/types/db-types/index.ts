export type TodoAttributes= {
    id: number;
    task: string;
    completed: boolean;
    user_id_FK: number;
}
export type  UserAttributes= {
    id: number;
    username: string;
    password: string;
}