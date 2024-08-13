import React from 'react'

export default function Todo({ todo, toggleTodo }) {
    function handleTodoClick() {
        toggleTodo(todo.id);
    }

    return (
        <div className='pl-2 w-64 mt-1 block bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'>
            <label>
                <input className="mr-2 mt-2 mb-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="checkbox" checked={todo.complete} onChange={handleTodoClick} />
                {todo.name}
            </label>
        </div>
    )
}
