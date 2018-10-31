import React, { Component, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function Counter() {
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);
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
