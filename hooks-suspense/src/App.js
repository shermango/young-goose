import React, { Component, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function withCounter(initialState = 0, step = 1) {
  const [count, setCount] = useState(initialState);
  const increment = () => setCount(count + step);
  return { count, increment };
}

function Counter() {
  const { count, increment } = withCounter();
  return <button onClick={increment}>{count}</button>;
}

function AnotherCounter() {
  const { count, increment } = withCounter(5, 3);
  return <button onClick={increment}>{count}</button>;
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Counter />
        <AnotherCounter />
      </div>
    );
  }
}

export default App;
