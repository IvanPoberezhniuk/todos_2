import React from 'react';

let ToDosList = ({ data, toggleIsCompleted, removeTask }) => {
  return data.map(task => {
    return (
      <div className="toDos__dropDownTask" key={task.id}>
        <div>
          <input
            onClick={() => toggleIsCompleted(task.id)}
            type="checkbox"
            className="toDos__toggle"
            defaultChecked={task.isCompleted}
          />
          <span className="toDos__task">{task.task}</span>
        </div>
        <button
          type="button"
          className="toDos__button-delete"
          onClick={() => removeTask(task.id)}
        >
          x
        </button>
      </div>
    );
  });
};

export default ToDosList;
