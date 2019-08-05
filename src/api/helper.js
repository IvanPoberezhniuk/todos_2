const cashedVisibleTodos = callback => {
  let prevArgs = [];
  let prevValue = [];

  return (...args) => {
    if (args.every((arg, index) => arg === prevArgs[index])) {
      return prevValue;
    }

    prevArgs = args;
    prevValue = callback(...args);

    return prevValue;
  };
};

export default cashedVisibleTodos;
