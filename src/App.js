import './App.css';
import 'react-notifications/lib/notifications.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';

function App() {
  const [todolist, setTodolist] = useState([]);

  const saveToDoList = (event) => {
    event.preventDefault();
    const todoName = event.target.todoName.value;

    if (!todolist.find(item => item.name === todoName)) {
      const finalToDoList = [...todolist, { name: todoName, completed: false }];
      setTodolist(finalToDoList);
      event.target.todoName.value = '';
      NotificationManager.success('Your task is successfully added.', 'Done');
    } else {
      NotificationManager.error('This task is already exist.', 'Error', 5000);
    }
  };

  const toggleCompletion = (index) => {
    const updatedTodolist = [...todolist];
    updatedTodolist[index].completed = !updatedTodolist[index].completed;
    setTodolist(updatedTodolist);
  };

  const deleteTask = (index) => {
    const dConfirm = window.confirm("Do you want to delete this task?");
    if (dConfirm) {
      const finalData = todolist.filter((_, i) => i !== index);
      setTodolist(finalData);
      NotificationManager.info('Your task successfully deleted!', 'Deleted');

    }
  };

  return (
    <div className="App w-full flex items-center flex-col justify-start">
      <NotificationContainer />
      <h1 className='select-none w-full text-center text-5xl m-10 font-[500]'>ToDo List</h1>
      <form onSubmit={saveToDoList}>
        <input type="text" name='todoName' />
        <button><FontAwesomeIcon icon={faPlus} /></button>
      </form>
      <ul>
        {todolist.map((item, index) => (
          <li key={index}>
            <p className={item.completed ? "line-through text-zinc-500" : "no-underline"}>{item.name}</p>
            <span>
              <button onClick={() => toggleCompletion(index)} className='delete-button bg-[#008000]'><FontAwesomeIcon icon={faCheck} /></button>
              <button onClick={() => deleteTask(index)} className='bg-red-600 delete-button'><FontAwesomeIcon icon={faTrash} /></button>
            </span>
          </li>
        ))}
      </ul>
    </div >
  );
}

export default App;
