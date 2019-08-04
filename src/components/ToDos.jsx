import React, { PureComponent } from 'react';
import ToDosFooter from './toDos__footer.jsx';
import ToDosList from './toDos__list.jsx';
const randomstring = require('randomstring');

export default class ToDos extends PureComponent {
  state = {
    todoList: [],
    inputValue: '',
    filter: '',
    areTodos: false,
    activeTabIndex: 0
  };

  componentDidMount() {
    const localData =
      JSON.parse(window.localStorage.getItem('localData')) || [];

    this.setState({
      todoList: localData,
      areTodos: true
    });

    this.saveDataToLocalStorage();
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.saveDataToLocalStorage);
    this.saveDataToLocalStorage();
  }

  saveDataToLocalStorage = () => {
    window.addEventListener('beforeunload', () =>
      window.localStorage.setItem(
        'localData',
        JSON.stringify(this.state.todoList)
      )
    );
  };

  addTask = event => {
    event.preventDefault();
    const isEmpty = value => /^ *$/.test(value);

    if (isEmpty(this.state.inputValue)) {
      return;
    } else {
      this.setState(prevState => {
        const newData = [
          ...prevState.todoList,
          {
            task: prevState.inputValue,
            isCompleted: false,
            id: randomstring.generate(5)
          }
        ];

        return {
          todoList: newData,
          inputValue: ''
        };
      });
    }
  };

  removeTask = id => {
    this.setState(prevState => {
      const newData = prevState.todoList.filter(task => task.id !== id);

      return {
        todoList: newData
      };
    });
  };

  filterTasks = data => {
    switch (this.state.filter) {
      case 'Active':
        return data.filter(task => !task.isCompleted);
      case 'Completed':
        return data.filter(task => task.isCompleted);
      default:
        return data;
    }
  };

  changeFilter = (filterBy, index) => {
    this.setState({
      filter: filterBy,
      activeTabIndex: index
    });
  };

  toggleIsCompleted = id => {
    this.setState(prevState => {
      const newData = [...prevState.todoList];
      const taskIndex = newData.findIndex(task => task.id === id);

      newData[taskIndex].isCompleted = !newData[taskIndex].isCompleted;

      return {
        todoList: newData
      };
    });
  };

  clearCompleted = () => {
    this.setState(prevState => {
      const newData = prevState.todoList.filter(task => !task.isCompleted);

      return {
        todoList: newData
      };
    });
  };

  changeStateInputValue = event => {
    this.setState({
      inputValue: event.target.value
    });
  };

  render() {
    const { todoList, inputValue, areTodos, activeTabIndex } = this.state;
    const {
      addTask,
      removeTask,
      changeFilter,
      filterTasks,
      toggleIsCompleted,
      clearCompleted,
      changeStateInputValue
    } = this;

    const visibleTodos = filterTasks(todoList);
    const itemsLeft = todoList.filter(task => task.isCompleted !== true).length;

    return (
      <div className="toDos__container">
        <h1 className="toDos__header">todos</h1>
        <form className="toDos">
          <input
            type="text"
            placeholder="What need to be done?"
            className="input-base"
            autoComplete="off"
            onChange={changeStateInputValue}
            value={inputValue}
          />
          <button type="submit" onClick={addTask} hidden />

          {areTodos ? (
            <ToDosList
              data={visibleTodos}
              toggleIsCompleted={toggleIsCompleted}
              removeTask={removeTask}
            />
          ) : null}
          <ToDosFooter
            activeTabIndex={activeTabIndex}
            changeFilter={changeFilter}
            clearCompleted={clearCompleted}
            itemsLeft={itemsLeft}
          />
        </form>
      </div>
    );
  }
}
