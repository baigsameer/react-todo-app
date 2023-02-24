import React, { useRef, useState } from 'react';

function Todo() {
  const inputRef = useRef();
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddTodo = () => {
    const newTodo = inputRef.current.value.trim();
    if (!newTodo) {
      alert('Please enter a todo.');
      return;
    }
    setTodos([...todos, { text: newTodo, completed: false }]);
    inputRef.current.value = '';
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleAddTodo();
    }
  };

  const handleCompleteTodo = (index) => {
    setTodos([
      ...todos.slice(0, index),
      { ...todos[index], completed: !todos[index].completed },
      ...todos.slice(index + 1)
    ]);
  };

  return (
    <div className="cont">
      <h1 style={{textAlign:"center",fontFamily:"sans-serif",fontSize:"3rem"}}>Please Enter Value</h1>
      <div className="Input">
      <input type="text" ref={inputRef} onKeyDown={handleKeyDown} />
      <button onClick={handleAddTodo}>Add Text</button>
      </div>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={todo.text}
                  onChange={(e) =>
                    setTodos([
                      ...todos.slice(0, index),
                      { ...todo, text: e.target.value },
                      ...todos.slice(index + 1)
                    ])
                  }
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setEditIndex(null);
                    }
                  }}
                  onBlur={() => setEditIndex(null)}
                />
                <button onClick={() => setEditIndex(null)}>Save</button>
              </>
            ) : (
              <>
                <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                  {todo.text}
                </span>
                <button onClick={() => setEditIndex(index)}>Edit</button>
                <button onClick={() => handleCompleteTodo(index)}>
                  {todo.completed ? 'Undo' : 'Complete'}
                </button>
                <button onClick={() => setTodos(todos.filter((_, i) => i !== index))}>
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
