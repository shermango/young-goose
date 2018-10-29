import React from 'react';
import GraphQLClientContext from './GraphQLClientContext';

// higher order component for accessing the gql client
// this way you dont have to pass/drill down the client
const withClient = Component => props => (
  <GraphQLClientContext.Consumer>
    {client => <Component {...props} client={client} />}
  </GraphQLClientContext.Consumer>
);

export default withClient;
