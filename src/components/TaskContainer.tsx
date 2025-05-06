import { Routes, Route } from "react-router-dom";
import { TaskEdit } from "./Task";
import { TaskOverview } from "./Task";

export default function TaskContainer() {
    return (
        <div className="container">
            <Routes>
                <Route
                    path="/edit"
                    element={<TaskEdit/>}
                />
                <Route
                    path="/overview"
                    element={<TaskOverview/>}
                />
            </Routes>
        </div>
    );
}