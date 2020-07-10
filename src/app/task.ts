
export enum Priority {
    high, normal, low
}

export interface Task {
    id: number;
    username: string;
    name: string;
    description: string;
    done: number;
    priority: Priority;
    date_created: Date;
    date_due: Date;
}
