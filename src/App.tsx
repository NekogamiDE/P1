import {JSX} from 'react';
import TaskContainer from './components/TaskContainer.tsx';
import NotFound from './components/NotFound.tsx';
import Layout from './components/Layout.tsx';
import Index from './components/Index.tsx';
import { Routes, useLocation, Route, Link } from "react-router-dom";
import { TaskProvider } from './context/TaskContext.tsx';

const App = (): JSX.Element => {
    const location = useLocation();

    const isOnIndex = location.pathname === "/";

    return (
        <TaskProvider>
            <div>
                <nav className="p-4 bg-gray-800 text-white space-x-4">
                    <Link to="/">Index</Link>
                    <Link to="/task/edit">Add/Edit/Delete</Link>
                    <Link to="/task/overview">Overview</Link>
                </nav>

                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route path="/task/*" element={<TaskContainer/>}/>
                        <Route path="*" element={<NotFound/>}/>
                    </Route>
                </Routes>
                {isOnIndex && (
                    <Index/>
                )}
            </div>
        </TaskProvider>
    );
};

export default App;