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
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleCleareComplete}>Clear Complete</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  );
}

export default App;
