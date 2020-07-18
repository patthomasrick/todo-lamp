
export interface Task {
    id: number;
    username: string;
    name: string;
    description: string;
    done: number;
    priority: string;
    date_created: Date;
    date_due: Date;
}
