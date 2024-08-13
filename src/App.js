import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'todoApp.todos';

function App() {
  const [todos, setTodos] = useState(() => {
    return loadTodos();
  });
  const todoNameRef = useRef();

  useEffect(() => {
    const storedItems = loadTodos();
    if (storedItems) {
      setTodos(storedItems);
    }
  }, []);

  function loadTodos() {
    const storedItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    console.log('storedItems' + storedItems);
    return storedItems || [];
  }

  useEffect(() => {
    console.log(LOCAL_STORAGE_KEY);
    const storedItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    console.log('Save to local storage' + JSON.stringify(todos));
  }, [todos]);


  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find(todo => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleCleareComplete() {
    const notCompleted = todos.filter(todo => !todo.complete);
    setTodos(notCompleted);
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if (name === '') return;
    console.log(name);
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }];
    });
    todoNameRef.current.value = null;
  }

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
      <input ref={todoNameRef} type="text" id="todo" class="mt-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write todo item" />
      <button onClick={handleAddTodo} type="button" class="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add Todo</button>
      <button onClick={handleCleareComplete} type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Clear Complete</button>
      
    </>
  );
}

export default App;
