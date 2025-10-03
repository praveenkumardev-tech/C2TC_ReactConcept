import React from 'react';

function TodoItem({ task }) {
  return (
    <div 
      style={{
        border: '1px solid #ddd',
        padding: '15px',
        margin: '10px auto',
        width: '300px',
        borderRadius: '5px',
        backgroundColor: task.completed ? '#d4edda' : '#f8d7da'
      }}
    >
      <h3>{task.title}</h3>
      <p>Status: {task.completed ? "Completed ✅" : "Pending ⏳"}</p>
    </div>
  );
}

export default TodoItem;