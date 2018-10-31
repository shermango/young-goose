import React, { useReducer, useRef, useEffect } from 'react';

// useReducer allows for combining multiple state pieces and has a redux like API

const reducer = (currentState, newState) => {
  return { ...currentState, ...newState };
};

const useStopwatchReducer = () => {
  const [{ lapse, running }, setState] = useReducer(reducer, {
    running: false,
    lapse: 0
  });
  // we can use a ref to keep track of things like setIntervals
  const intervalRef = useRef(null);

  /**
   * useEffect takes 3 params, an effect to run, a return callback
   * to be run on cleanup/unmount of compoenent and an array of the useState
   * that you wish to rerender the component on if there is any change
   */

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  function handleRunClick() {
    if (running) {
      clearInterval(intervalRef.current);
    } else {
      const startTime = Date.now() - lapse;

      intervalRef.current = setInterval(() => {
        setState({ lapse: Date.now() - startTime });
      }, 0);
    }

    setState({ running: !running });
  }

  function handleClearClick() {
    clearInterval(intervalRef.current);
    setState({ lapse: 0, running: false });
  }

  return { handleRunClick, handleClearClick, lapse, running };
};

const StopwatchReducer = () => {
  const StopWatch1 = useStopwatchReducer();
  const StopWatch2 = useStopwatchReducer();

  return (
    <div style={{ textAlign: 'center' }}>
      <label style={{ fontSize: '5em', display: 'block' }}>
        {StopWatch1.lapse} ms
      </label>
      <button onClick={StopWatch1.handleRunClick} style={buttonStyles}>
        {StopWatch1.running ? 'Stop' : 'Start'}
      </button>
      <button onClick={StopWatch1.handleClearClick} style={buttonStyles}>
        Clear
      </button>

      <hr />
      <strong>Difference:</strong>
      <span>{StopWatch1.lapse - StopWatch2.lapse}</span>
      <hr />

      <label style={{ fontSize: '5em', display: 'block' }}>
        {StopWatch2.lapse} ms
      </label>
      <button onClick={StopWatch2.handleRunClick} style={buttonStyles}>
        {StopWatch2.running ? 'Stop' : 'Start'}
      </button>
      <button onClick={StopWatch2.handleClearClick} style={buttonStyles}>
        Clear
      </button>
    </div>
  );
};

const buttonStyles = {
  border: '1px solid #ccc',
  background: '#fff',
  fontSize: '2em',
  padding: 15,
  margin: 5,
  width: 200
};

export default StopwatchReducer;
