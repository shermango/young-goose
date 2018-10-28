import React, { Component } from 'react';
import axios from 'axios';

const GQL_CLIENT = axios.create({
  baseURL: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer ${process.env.REACT_APP_YOUNG_GOOSE}`
  }
});

const TITLE = 'React GraphQL GitHub Client';

class App extends Component {
  render() {
    return (
      <div>
        <h1>{TITLE}</h1>
      </div>
    );
  }
}

export default App;
