import axios from 'axios';

const GQL_CLIENT = axios.create({
  baseURL: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer ${process.env.REACT_APP_YOUNG_GOOSE}`
  }
});

export default GQL_CLIENT;
