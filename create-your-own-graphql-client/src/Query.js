import React from 'react';
import { isEqual } from 'lodash';

import withClient from './withClient';

// this is a implementation of the <Query /> component libraries like Apollo provide
// uses render prop pattern to provide fetched data to children
class Query extends React.Component {
  state = {
    data: null,
    loading: null,
    errors: null
  };

  // performs a first time query on mount
  componentDidMount() {
    const { query, variables } = this.props;

    this.query({ query, variables });
  }

  // if new variables are provided perform a refetch
  componentDidUpdate(prevProps) {
    if (!isEqual(this.props.variables, prevProps.variables)) {
      const { query, variables } = this.props;

      this.query({ query, variables });
    }
  }

  query = ({ query, variables }) => {
    this.props.client
      .query({ query, variables })
      .then(result =>
        this.setState({
          data: result.data.data,
          errors: result.data.errors,
          loading: false
        })
      )
      .catch(error =>
        this.setState({
          errors: [error],
          loading: false
        })
      );
  };

  render() {
    return this.props.children({
      ...this.state
    });
  }
}

export default withClient(Query);
