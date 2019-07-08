import React from 'react';

const FILTER = {
  active: 'active',
  completed: 'completed'
};

let ToDosFooter = ({ completedTasks, filterTasks, clearCompleted }) => {
  return (
    <>
      <div className="toDos__footer">
        <div>{completedTasks} items left</div>
        <div className="toDos__filter">
          <div onClick={filterTasks}>All</div>
          <div onClick={() => filterTasks(FILTER.active)}>Active</div>
          <div onClick={() => filterTasks(FILTER.completed)}>Completed</div>
        </div>
        <div onClick={clearCompleted} className="toDos__clearCompleted">
          Clear Completed
        </div>
      </div>
    </>
  );
};

export default ToDosFooter;
