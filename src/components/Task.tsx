import { useState, useEffect } from "react";
import { JSX } from "react";
import Button from "./Buttons.tsx";
import { TaskEditList } from "./Lists.tsx";
import { TaskOverviewList } from "./Lists.tsx";
import { TextInput, TextEdit } from "./TextInputs.tsx";
import { Task, useTasks } from "../context/TaskContext.tsx";

export const TaskEdit = (): JSX.Element =>
{   
    const {tasks, addTask, editTask, deleteTask, clearTasks} = useTasks();
    const [mode, setMode] = useState<number>(0);
    const [selectedItem, setSelectedItem] = useState<number>(-1);

    const SetMode = (mode: number, index?: number) => {
        setMode(mode);

        if(mode == 1 && (index || index === 0))
        {
            console.log(index);
            setSelectedItem(index);
        }
    };

    const AddItem = (newValue: Task) => {
        addTask(newValue);
    };

    const ClearItems = () => {
        clearTasks();
        SetMode(0);
        setSelectedItem(-1);
    };

    const DeleteItem = (index: number) => {
        deleteTask(index);

        if(index === selectedItem)
        {
            SetMode(0);
            setSelectedItem(-1);
        }
        else if(index < selectedItem)
        {
            setSelectedItem(selectedItem - 1);
        }
    };

    const SubmitEditItem = (newValue: Task) => {

        editTask(selectedItem, newValue);
        
        setSelectedItem(-1);
        SetMode(0);
    };

    const CancelEditItem = () => {
        setSelectedItem(-1);
        SetMode(0);
    };

    return (
        <div className="grid grid-cols-10 gap-4 h-screen">
            <div className="col-span-3">
                <div className="container-item justify-items-center">
                    <Button variant="danger" text="Alle Aufgaben löschen" onClick={ClearItems}/>
                    
                    {/* Hier geben wir die deleteItem-Funktion an die List-Komponente weiter */}
                    <TaskEditList selection={selectedItem} items={tasks} SetMode={SetMode} DeleteItem={DeleteItem}/>
                </div>
            </div>
            <div className="col-span-7">
                {mode == 1 && selectedItem !== -1
                    ? <TextEdit item={tasks[selectedItem]} EditTask={SubmitEditItem} CancelEditTask={CancelEditItem}/>
                    : <TextInput AddTask={AddItem}/>
                }
            </div>
        </div>
    );
};

export const TaskOverview = (): JSX.Element =>
{
    const { tasks } = useTasks(); 

    console.log("props.items");
    console.log(tasks);



    return (
        <div className="h-screen">
            <div className="container-item">
                <TaskOverviewList items={tasks}/>
            </div>
        </div>
    );
};