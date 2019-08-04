import React from 'react';

const TABS = [{ type: 'All' }, { type: 'Active' }, { type: 'Completed' }];

const ToDosFooter = ({
  itemsLeft,
  changeFilter,
  clearCompleted,
  activeTabIndex
}) => {
  const activeTabStyle = {
    color: 'rgba(175, 47, 47, 0.452)'
  };

  return (
    <>
      <div className="toDos__footer">
        <div>{itemsLeft} items left</div>
        <div className="toDos__filter">
          {TABS.map((tab, index) => (
            <div
              key={index}
              onClick={() => changeFilter(tab.type, index)}
              style={index === activeTabIndex ? activeTabStyle : null}
            >
              {tab.type}
            </div>
          ))}
        </div>
        <div onClick={clearCompleted} className="toDos__clearCompleted">
          Clear Completed
        </div>
      </div>
    </>
  );
};

export default ToDosFooter;
