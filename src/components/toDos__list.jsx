import React from 'react';

const TodosList = ({ todos, toggleIsCompleted, removeTask }) => {
  return todos.map(task => {
    return (
      <div className="todos__dropDownTask" key={task.id}>
        <div className="todos__task-wrapper">
          <input
            onClick={() => toggleIsCompleted(task.id)}
            type="checkbox"
            className="todos__toggle"
            defaultChecked={task.isCompleted}
          />
          <span className="todos__toggle--helper" />
          <span className="todos__task">{task.task}</span>
        </div>
        <button
          type="button"
          className="todos__button-delete"
          onClick={() => removeTask(task.id)}
        >
          x
        </button>
      </div>
    );
  });
};

const MemoTodosList = React.memo(TodosList);

export default MemoTodosList;
