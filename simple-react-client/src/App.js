import React, { Component } from 'react';
import GraphQLClient, { query as getIssuesOfRepositoryQuery } from './GraphQL';

import Organization from './Organization';

const getIssuesOfRepository = (path, cursor) => {
  const [organization, repository] = path.split('/');

  return GraphQLClient.post('', {
    query: getIssuesOfRepositoryQuery,
    variables: { organization, repository, cursor }
  });
};

// returns a set state updater function
const resolveIssuesQuery = (queryResult, cursor) => state => {
  const { data, errors } = queryResult.data;

  if (!cursor) {
    return {
      organization: data.organization,
      errors
    };
  }

  // add merge in new issues
  const { edges: oldIssues } = state.organization.repository.issues;
  const { edges: newIssues } = data.organization.repository.issues;
  const updatedIssues = [...oldIssues, ...newIssues];

  return {
    organization: {
      ...data.organization,
      repository: {
        ...data.organization.repository,
        issues: {
          ...data.organization.repository.issues,
          edges: updatedIssues
        }
      }
    },
    errors
  };
};

class App extends Component {
  state = {
    path: 'the-road-to-learn-react/the-road-to-learn-react',
    organization: null,
    errors: null
  };

  componentDidMount = () => {
    this.onFetchFromGitHub(this.state.path);
  };

  onChange = e => {
    this.setState({ path: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.onFetchFromGitHub(this.state.path);
  };

  onFetchFromGitHub = (path, cursor) => {
    getIssuesOfRepository(path).then(queryResult => {
      this.setState(resolveIssuesQuery(queryResult, cursor));
    });
  };

  onFetchMoreIssues = () => {
    const { endCursor } = this.state.organization.repository.issues.pageInfo;

    this.onFetchFromGitHub(this.state.path, endCursor);
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
