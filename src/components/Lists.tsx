import { JSX } from 'react';
import Button from './Buttons.tsx';
import { type Task } from '../context/TaskContext.tsx';

interface TaskEditListProps {
  selection: number;
  items: Task[];
  SetMode: (mode: number, index: number) => void;
  DeleteItem: (index: number) => void;
}

interface TaskOverviewListProps {
  items: Task[];
}

export const TaskEditList = (props: TaskEditListProps): JSX.Element => {

  let temp = "taskitem grid grid-cols-3 items-center";
  
  return (
    <ul>
      {props.items.map((item, index) => (
        <li className={temp} key={index}>
          <div className="col-start-1 mx-1">
            <p className="break-words">{item.title}</p>
          </div>
          <div className="col-start-2 mx-1 justify-self-center">
            <Button variant="secondary" text="Ändern" onClick={() => props.SetMode(1, index)}/>
          </div>
          <div className="col-start-3 mx-1 justify-self-end">
            <Button variant="danger" text="Löschen" onClick={() => props.DeleteItem(index)}/>
          </div>
        </li>
      ))}
    </ul>
  );
};

export const TaskOverviewList = (props: TaskOverviewListProps): JSX.Element => {

  return (
    <ul>
      {props.items.map((item, index) => (
        <li className="taskitem grid grid-rows-2 grid-cols-3 items-center" key={index}>
          <div className="col-start-1">
            <p className="break-words">{item.title}</p>
          </div>
          <div className="col-start-1">
            <p className="break-words">{item.description}</p>
          </div>
          <div className="col-start-1">
            <p className="break-words">{item.status}</p>
          </div>
          <div className="col-start-1">
            <p className="break-words">{item.deadline?.toString()}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};