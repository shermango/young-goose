import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import GraphQLClient from './GraphQLClient';
import GraphQLClientContext from './GraphQLClientContext';

const client = new GraphQLClient({
  baseURL: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer ${process.env.REACT_APP_YOUNG_GOOSE}`
  }
});

// we use react context to provide the gql client
// we access the context via the withClient HOC
ReactDOM.render(
  <GraphQLClientContext.Provider value={client}>
    <App />
  </GraphQLClientContext.Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
