import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ tasks }) {
  return (
    <div style={{ marginTop: '20px' }}>
      {tasks.map(task => (
        <TodoItem key={task.id} task={task} />
      ))}
    </div>
  );
}

export default TodoList;