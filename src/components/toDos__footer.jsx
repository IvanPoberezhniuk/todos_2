import React from 'react';
const randomstring = require('randomstring');

const TABS = [{ type: 'All' }, { type: 'Active' }, { type: 'Completed' }];

const TodosFooter = ({
  itemsLeft,
  changeFilter,
  clearCompleted,
  activeTabIndex
}) => {
  return (
    <>
      <div className="todos__footer">
        <div>{itemsLeft} items left</div>
        <div className="todos__filter">
          {TABS.map((tab, index) => (
            <div
              key={randomstring.generate(3)}
              onClick={() => changeFilter(tab.type, index)}
              className={index === activeTabIndex ? 'activeTab' : null}
            >
              {tab.type}
            </div>
          ))}
        </div>
        <div onClick={clearCompleted} className="todos__clearCompleted">
          Clear Completed
        </div>
      </div>
    </>
  );
};

export default TodosFooter;
