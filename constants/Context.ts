import { createContext } from "react";

interface Task {
    id: string;
    name: string;
    date: Date;
    money: number;
    completed: boolean;
}

export const TaskContext = createContext<{
    tasks: Task[],
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}>({
    tasks: [],
    setTasks: () => void(null)
});

export const AuthContext = createContext<{
    wallet: string,
    setWallet: React.Dispatch<React.SetStateAction<string>>
    password: string,
    setPassword: React.Dispatch<React.SetStateAction<string>>
}>({
    wallet: "",
    setWallet: () => void(null),
    password: "",
    setPassword: () => void(null)
});