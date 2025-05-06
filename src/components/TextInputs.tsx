import { JSX, useEffect } from 'react';
import { useState } from 'react';
import Button from './Buttons.jsx';
import { type Task } from "../context/TaskContext.js";

interface TextInputProps{
    AddTask: (props: Task) => void;
}

interface TextEditProps{
    item: Task;
    EditTask: (props: Task) => void;
    CancelEditTask: () => void;
}

export const TextInput = (props: TextInputProps): JSX.Element => {
    const [title, setTitle] = useState("Aufgabe");
    const [description, setDescription] = useState("Beschreibung");
    const [status, setStatus] = useState("1");
    const [deadline, setDeadline] = useState("");
    const [estimatedWorkload, setEstimatedWorkload] = useState<number | "">(0);
    const [currentWorkload, setCurrentWorkload] = useState<number | "">(0);
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault(); // verhindert Neuladen der Seite

      if (!title.trim()) {
        alert("Titel darf nicht leer sein!");
        return;
      }
      
      const task: Task = {
        title: title.trim(),
        description: description.trim() || undefined,
        status: status,
        deadline: deadline || "",
        estimatedWorkload: estimatedWorkload === "" ? undefined : estimatedWorkload,
        currentWorkload: currentWorkload === "" ? undefined : currentWorkload,
        subtasks: [],
      };
      
      props.AddTask(task);
  
      setTitle("Aufgabe");
      setDescription("Beschreibung");
      setStatus("1");
      setDeadline("");
      setEstimatedWorkload(0);
      setCurrentWorkload(0);
    };

    return (
        <form onSubmit={handleSubmit} className="container-item space-y-2">
            <div>
                <label>Überschrift:</label><br/>
                <input
                    placeholder="Überschrift der Aufgabe"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border-black border-2 rounded text-white p-1.5 w-full"
                />
            </div>
            <div>
                <label>Beschreibung:</label><br/>
                <textarea
                    placeholder="Beschreibung der Aufgabe"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border-black border-2 rounded text-white p-1.5 w-full  resize-none"
                />
            </div>
            <div>
                <label>Status:</label><br/>
                <select value={status} className="border-black border-2 rounded bg-gray-500 text-white p-1.5 w-1/4" onChange={(e) => setStatus(e.target.value)}>
                    <option value="1">Offen</option>
                    <option value="2">In Arbeit</option>
                    <option value="3">Erledigt</option>
                    <option value="4">Obsolet</option>
                </select>
            </div>
            <div>
                <label>Deadline:</label><br/>
                <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="border-black border-2 rounded text-white p-1.5 w-full"
                />
            </div>
            <div>
                <label>Geplanter Aufwand (in h):</label><br/>
                <input
                    type="number"
                    value={estimatedWorkload}
                    onChange={(e) => setEstimatedWorkload(e.target.value === "" ? "" : Number(e.target.value))}
                    className="border-black border-2 rounded text-white p-1.5 w-full"
                />
            </div>
            <div>
                <label>Aktueller Aufwand (in h):</label><br/>
                <input
                    type="number"
                    value={currentWorkload}
                    onChange={(e) => setCurrentWorkload(e.target.value === "" ? "" : Number(e.target.value))}
                    className="border-black border-2 rounded text-white p-1.5 w-full"
                />
            </div>
            <Button variant="primary" text="Aufgabe hinzufügen" type="submit"/>
        </form>
    );
}



export const TextEdit = (props: TextEditProps):JSX.Element => {
    
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("1");
    const [deadline, setDeadline] = useState("");
    const [estimatedWorkload, setEstimatedWorkload] = useState<number | "">(0);
    const [currentWorkload, setCurrentWorkload] = useState<number | "">(0);


    useEffect(() => {
        if(props.item)
        {
            setTitle(props.item.title);
            setDescription(props.item.description || "");
            setStatus(props.item.status);
            setDeadline(props.item.deadline || "");
            setEstimatedWorkload(props.item.estimatedWorkload || 0);
            setCurrentWorkload(props.item.currentWorkload || 0);
        }
        else
        {
            setTitle("");
            setDescription("");
            setStatus("1");
            setDeadline("");
            setEstimatedWorkload(0);
            setCurrentWorkload(0);
        }
    }, [props.item]);
    
    const handleAbort = () => {
        props.CancelEditTask();

        setTitle("");
        setDescription("");
        setStatus("1");
        setDeadline("");
        setEstimatedWorkload(0);
        setCurrentWorkload(0);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); //verhindert Neuladen der Seite

        if (!title.trim()) {
            alert("Titel darf nicht leer sein!");
            return;
        }
      
        const task: Task = {
            title: title.trim(),
            description: description?.trim() || undefined,
            status: status,
            deadline: deadline || "",
            estimatedWorkload: estimatedWorkload === "" ? undefined : estimatedWorkload,
            currentWorkload: currentWorkload === "" ? undefined : currentWorkload,
            subtasks: [],
        };
      
        props.EditTask(task);

        setTitle("");
        setDescription("");
        setStatus("1");
        setDeadline("");
        setEstimatedWorkload(0);
        setCurrentWorkload(0);
    };

    return (
        <form onReset={handleAbort} onSubmit={handleSubmit} className="container-item space-y-2">
            <div>
                <label>Überschrift:</label><br/>
                <input
                    placeholder="Überschrift der Aufgabe"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border-black border-2 rounded text-white p-1.5 w-full"
                />
            </div>
            <div>
                <label>Beschreibung:</label><br/>
                <textarea
                    placeholder="Beschreibung der Aufgabe"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border-black border-2 rounded text-white p-1.5 w-full  resize-none"
                />
            </div>
            <div>
                <label>Status:</label><br/>
                <select value={status} className="border-black border-2 rounded bg-gray-500 text-white p-1.5 w-1/4" onChange={(e) => setStatus(e.target.value)}>
                    <option value="1">Offen</option>
                    <option value="2">In Arbeit</option>
                    <option value="3">Erledigt</option>
                    <option value="4">Obsolet</option>
                </select>
            </div>
            <div>
                <label>Deadline:</label><br/>
                <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="border-black border-2 rounded text-white p-1.5 w-full"
                />
            </div>
            <div>
                <label>Geplanter Aufwand (in h):</label><br/>
                <input
                    type="number"
                    value={estimatedWorkload}
                    onChange={(e) => setEstimatedWorkload(e.target.value === "" ? "" : Number(e.target.value))}
                    className="border-black border-2 rounded text-white p-1.5 w-full"
                />
            </div>
            <div>
                <label>Aktueller Aufwand (in h):</label><br/>
                <input
                    type="number"
                    value={currentWorkload}
                    onChange={(e) => setCurrentWorkload(e.target.value === "" ? "" : Number(e.target.value))}
                    className="border-black border-2 rounded text-white p-1.5 w-full"
                />
            </div>
            <Button variant="danger" text="Abbrechen" type="reset"/>
            <Button className="mx-1.5" variant="primary" text="Aufgabe ändern" type="submit"/>
        </form>
    );
}