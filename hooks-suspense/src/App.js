import React, { Component, useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function withCounter(initialState = 0, step = 1) {
  const initialCount = () =>
    parseInt(window.localStorage.getItem('count') || 0);
  const [count, setCount] = useState(initialCount);
  const increment = () => setCount(count + step);
  useEffect(
    () => {
      window.localStorage.setItem('count', count);
    },
    [count]
  );
  return { count, increment };
}

function Counter() {
  const { count, increment } = withCounter();
  return <button onClick={increment}>{count}</button>;
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Counter />
      </div>
    );
  }
}

export default App;
