import './App.css';
import 'react-notifications/lib/notifications.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';


function App() {

  let [todolist, setTodolist] = useState([])

  let saveToDoList = (event) => {

    let todoName = event.target.todoName.value;

    if (!todolist.includes(todoName)) {
      let finalToDoList = [...todolist, todoName]
      setTodolist(finalToDoList)
    } else {
      // NotificationManager.warning('This task is already exist.', 'Warning');
      NotificationManager.error('This task is already exist.', 'Error', 5000,);
    }

    event.preventDefault();

  }
  return (
    <div className="App w-full flex items-center flex-col justify-center">
      <NotificationContainer />
      <h1 className='select-none w-full text-center text-5xl m-10 font-[500]'>ToDo List</h1>
      <form onSubmit={saveToDoList}>
        <input type="text" name='todoName' />
        <button><FontAwesomeIcon icon={faPlus} /></button>
        <button className='bg-red-600'><FontAwesomeIcon icon={faTrash} /></button>
      </form>
    </div >
  );
}

export default App;
