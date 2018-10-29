import React, { Component } from 'react';
import GraphQLClient, { query as GET_ISSUES_OF_REPO } from './GraphQL';

import Organization from './Organization';

class App extends Component {
  state = {
    path: 'the-road-to-learn-react/the-road-to-learn-react',
    organization: null,
    errors: null
  };

  componentDidMount = () => {
    this.fetchGitHub(this.state.path);
  };

  onChange = e => {
    this.setState({ path: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.fetchGitHub(this.state.path);
  };

  fetchGitHub = async path => {
    const [organization, repository] = path.split('/');

    const { data } = await GraphQLClient.post('', {
      query: GET_ISSUES_OF_REPO,
      variables: { organization, repository }
    });

    this.setState(() => ({
      organization: data.data.organization,
      errors: data.errors
    }));
  };

  render() {
    const { path, organization, errors } = this.state;

    return (
      <div>
        <h1>Simple React GraphQL GitHub Client</h1>

        <form onSubmit={this.onSubmit}>
          <label htmlFor="url">Show open issues for https://github.com/</label>
          <input
            id="url"
            type="text"
            onChange={this.onChange}
            style={{ width: '300px' }}
            value={path}
          />
          <button type="submit">Search</button>
        </form>

        <hr />

        {organization && (
          <Organization organization={organization} errors={errors} />
        )}
      </div>
    );
  }
}

export default App;
