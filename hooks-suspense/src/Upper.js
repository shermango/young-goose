import React, { useState } from 'react';

const UpperMemo = React.memo(function Upper({ children }) {
  const [count, setCount] = useState(0);
  return (
    <div>
      Uppercase version: {children.toUpperCase()}{' '}
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </div>
  );
});

function Upper() {
  const [first, setFirstName] = useState('');
  const [last, setLastName] = useState('');

  console.log('rendering');

  return (
    <div>
      <label htmlFor="first-name-input">First Name</label>
      <input
        id="first-name-input"
        onChange={e => setFirstName(e.target.value)}
      />
      <UpperMemo>{first}</UpperMemo>
      <hr />
      <label htmlFor="last-name-input">Last Name</label>
      <input id="last-name-input" onChange={e => setLastName(e.target.value)} />
      <UpperMemo>{last}</UpperMemo>
    </div>
  );
}

export default Upper;
