import React, { Component } from 'react';

import Query from './Query';

const GET_ORGANIZATION = `
  query (
    $organizationLogin: String!,
  ) {
    organization(login: $organizationLogin) {
      name
      url
      repositories(first: 5) {
        edges {
          node {
            id
            name
            url
            watchers {
              totalCount
            }
            viewerSubscription
          }
        }
      }
    }
  }
`;

const isWatch = viewerSubscription => viewerSubscription === 'SUBSCRIBED';

class App extends Component {
  state = {
    value: 'the-road-to-learn-react',
    organizationLogin: 'the-road-to-learn-react'
  };

  onChange = event => {
    this.setState({ value: event.target.value });
  };

  onSubmit = event => {
    this.setState({ organizationLogin: this.state.value });

    event.preventDefault();
  };

  render() {
    const { organizationLogin, value } = this.state;

    return (
      <div>
        <h1>React GraphQL GitHub Client</h1>

        <form onSubmit={this.onSubmit}>
          <label htmlFor="url">Show organization for https://github.com/</label>
          <input
            id="url"
            type="text"
            value={value}
            onChange={this.onChange}
            style={{ width: '300px' }}
          />
          <button type="submit">Search</button>
        </form>

        <hr />

        <Query
          query={GET_ORGANIZATION}
          variables={{
            organizationLogin
          }}
        >
          {({ data, loading, errors, fetchMore }) => {
            if (!data) {
              return <p>No information yet ...</p>;
            }

            const { organization } = data;

            if (loading) {
              return <p>Loading ...</p>;
            }

            if (errors) {
              return (
                <p>
                  <strong>Something went wrong:</strong>
                  {errors.map(error => error.message).join(' ')}
                </p>
              );
            }

            return <Organization organization={organization} />;
          }}
        </Query>
      </div>
    );
  }
}

const Repositories = ({ repositories }) => (
  <div>
    <ul>
      {repositories.edges.map(repository => (
        <li key={repository.node.id}>
          <a href={repository.node.url}>{repository.node.name}</a>{' '}
          {repository.node.watchers.totalCount}
          {isWatch(repository.node.viewerSubscription)
            ? ' Watched by you'
            : ' Not watched by you'}
        </li>
      ))}
    </ul>
  </div>
);

const Organization = ({ organization }) => (
  <div>
    <h1>
      <a href={organization.url}>{organization.name}</a>
    </h1>
    <Repositories repositories={organization.repositories} />
  </div>
);

export default App;
