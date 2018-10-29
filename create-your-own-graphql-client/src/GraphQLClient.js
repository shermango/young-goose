import axios from 'axios';

// utility func to inform user that they are missing a required parameter
const missingParam = param => {
  throw new Error(`You must provide ${param} for initialization`);
};

// a basic GraphQL client akin to Apollo
class GraphQLClient {
  // init config
  constructor({ baseURL = missingParam('base url'), headers }) {
    this.axios = axios.create({
      baseURL,
      headers
    });
  }

  // create two methods one for query one for mutation
  query({ query, variables }) {
    return this.axios.post('', {
      query,
      variables
    });
  }

  mutate({ mutation, variables }) {
    return this.axios.post('', {
      query: mutation,
      variables
    });
  }
}

export default GraphQLClient;
