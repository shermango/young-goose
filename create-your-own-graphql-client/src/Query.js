import React from 'react';
import { isEqual } from 'lodash';

import withClient from './withClient';

// this is a implementation of the <Query /> component libraries like Apollo provide
// uses render prop pattern to provide fetched data to children
class Query extends React.Component {
  // assuming <Query /> is created without props it will blow up, so we provide default props
  // on second thought maybe we want to blow up so dev knows they need to add in props
  // can probably just add required prop types?
  // static defaultProps = {
  //   query: null,
  //   variables: null,
  //   resolveFetchMore: () => {},
  //   client: {
  //     query: () => {}
  //   }
  // };

  state = {
    data: null,
    loading: null,
    errors: null,
    fetchMoreLoading: null
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

  // this is for pagination control
  queryMore = ({ query, variables }) => {
    this.props.client
      .query({ query, variables })
      .then(result =>
        this.setState(state => ({
          data: this.props.resolveFetchMore(result.data.data, state),
          errors: result.data.errors,
          fetchMoreLoading: false
        }))
      )
      .catch(error =>
        this.setState({
          errors: [error],
          fetchMoreLoading: false
        })
      );
  };

  // we expose pagination control via the fetch more prop func
  render() {
    return this.props.children({
      ...this.state,
      fetchMore: this.queryMore
    });
  }
}

export default withClient(Query);
