import React from "react";

let ToDosList = props => {
  return props.data.map(task => {
    return (
      <div className="toDos--dropDownTask" key={task.id}>
        <div>
          <input
            onClick={() => props.toggleIsCompleted(task.id)}
            type="checkbox"
            className="toDos--toggle"
            defaultChecked={task.isCompleted}
          />
          <span className="toDos--task">{task.task}</span>
        </div>
        <button
          type="button"
          className="toDos--button-delete"
          onClick={() => props.removeTask(task.id)}
        >
          x
        </button>
      </div>
    );
  });
};

export default ToDosList;
