import React from "react";

const FILTER = {
  active: "active",
  completed: "completed"
};

let ToDosFooter = props => {
  return (
    <>
      <div className="toDos--footer">
        <div>
          {props.completedTasks}{" "}
          items left
        </div>
        <div className="toDos--filter">
          <div onClick={() => props.filterTasks()}>All</div>
          <div onClick={() => props.filterTasks(FILTER.active)}>Active</div>
          <div onClick={() => props.filterTasks(FILTER.completed)}>
            Completed
          </div>
        </div>
        <div
          onClick={() => props.clearCompleted()}
          className="toDos--clearCompleted"
        >
          Clear Completed
        </div>
      </div>
    </>
  );
};

export default ToDosFooter;
