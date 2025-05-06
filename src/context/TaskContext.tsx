import { createContext, JSX, ReactNode, useContext, useState } from 'react';

export type Task = {
    title: string;
    description?: string;
    status: string;
    deadline?: string;
    estimatedWorkload?: number;
    currentWorkload?: number;
    subtasks?: Task[];
}
  
type TaskContextType = {
    tasks: Task[];
    addTask: (task: Task) => void;
    deleteTask: (index: number) => void;
    clearTasks: () => void;
    editTask: (index: number, task: Task) => void;
};

const TaskContext = createContext<TaskContextType | null>(null);

export function TaskProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (newValue: Task) => {

    //vl. paar if-abfragen
    setTasks([...tasks, newValue]);
};

const editTask = (index: number, newValue: Task) => {
    const updatedItems = [...tasks];
    updatedItems[index] = newValue;
    setTasks(updatedItems);
};

const deleteTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
};

const clearTasks = () => {
    setTasks([]);
};

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, clearTasks, editTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks(): TaskContextType {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within a TaskProvider");
  return context;
}

