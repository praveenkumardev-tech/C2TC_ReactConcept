import React from 'react';
import TodoList from './components/TodoList';

function App() {
  const initialTasks = [
    { id: 1, title: "Learn React", completed: true },
    { id: 2, title: "Build a project", completed: false },
    { id: 3, title: "Read documentation", completed: false }
  ];

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>React Props Todo List</h1>
      <TodoList tasks={initialTasks} />
    </div>
  );
}

export default App;