import React, { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [completedTasks, setCompletedTasks] = useState([]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      const editedTodos = [...todos];
      editedTodos[editIndex] = inputValue;
      setTodos(editedTodos);
      setEditIndex(null);
    } else {
      setTodos([...todos, inputValue]);
    }
    setInputValue('');
  };

  const deleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const editTodoList = (index, todo) => {
    setEditIndex(index);
    setInputValue(todo);
  };

  const toggleCompleted = (index) => {
    const newCompletedTasks = [...completedTasks];
    newCompletedTasks[index] = !newCompletedTasks[index];
    setCompletedTasks(newCompletedTasks);
  };

  return (
    <div className=' mx-40'>

      <h2 className=' text-3xl font-semibold  py-4 '>Todo List</h2>

      <form onSubmit={handleSubmit}>
        <input
          className='py-[2px] mr-3 border-2 border-black  rounded-full px-4'
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Add a new todo"
          required
        />
        <button className="py-1 rounded-full bg-blue-500 text-white px-5" type="submit">{editIndex !== null ? "Update" : "Add"}</button>
      </form>

      <ul>
        {todos.map((todo, index) => (
          <div key={index} style={{ display: "flex", gap: "29px" }} className='py-2 relative bg-blue-400 max-w-[400px] flex items-center rounded-full px-4 mt-5'>
            <h1 className='-ml-8'>{index + 1}</h1>
            <input
              type='checkbox'
              className=' rounded-full bg-blue-600'
              checked={completedTasks[index]}
              onChange={() => toggleCompleted(index)}
            />
            <li className={`text-white font-semibold ${completedTasks[index] ? 'line-through text-blue-200' : ''}`}>{todo}</li>
            <div className='flex justify-end absolute items-center h-full top-0 mt-[1.5px] right-5 gap-3'>
              <button onClick={() => deleteTodo(index)} className='flex justify-center items-center rounded-full text-red-700 font-semibold text-md py-[1px] px-5 bg-blue-100'>x</button>
              <button onClick={() => editTodoList(index, todo)} className={`rounded-xl px-4 bg-blue-100 ${completedTasks[index] ? 'opacity-25 pointer-events-none' : ''}`} disabled={completedTasks[index]}>Edit</button>
            </div>
          </div>
        ))}
      </ul>

    </div>
  );
}

export default TodoList;
