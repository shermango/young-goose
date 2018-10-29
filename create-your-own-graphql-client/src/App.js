import React, { Component } from 'react';

import Query from './Query';
import Mutation from './Mutation';

const WATCH_REPOSITORY = `
  mutation($id: ID!, $viewerSubscription: SubscriptionState!) {
    updateSubscription(
      input: { state: $viewerSubscription, subscribableId: $id }
    ) {
      subscribable {
        id
        viewerSubscription
      }
    }
  }
`;

const resolveWatchMutation = (data, state) => {
  const { totalCount } = state.data.repository;
  const { viewerSubscription } = data.updateSubscription.subscribable;

  return {
    repository: {
      viewerSubscription,
      totalCount:
        viewerSubscription === 'SUBSCRIBED' ? totalCount + 1 : totalCount - 1
    }
  };
};

const GET_ORGANIZATION = `
  query (
    $organizationLogin: String!,
    $cursor: String
  ) {
    organization(login: $organizationLogin) {
      name
      url
      repositories(first: 5, after: $cursor) {
        pageInfo {
          endCursor
          hasNextPage
        }
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

const resolveFetchMore = (data, state) => {
  const { edges: oldR } = state.data.organization.repositories;
  const { edges: newR } = data.organization.repositories;

  const updatedRepositories = [...oldR, ...newR];

  return {
    organization: {
      ...data.organization,
      repositories: {
        ...data.organization.repositories,
        edges: updatedRepositories
      }
    }
  };
};

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
          // if users wish to fetch more data they can access the resolveFetchMore prop
          resolveFetchMore={resolveFetchMore}
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

            return (
              <Organization
                organization={organization}
                onFetchMoreRepositories={() =>
                  fetchMore({
                    query: GET_ORGANIZATION,
                    variables: {
                      organizationLogin,
                      cursor: organization.repositories.pageInfo.endCursor
                    }
                  })
                }
              />
            );
          }}
        </Query>
      </div>
    );
  }
}

const Repositories = ({ repositories, onFetchMoreRepositories }) => (
  <div>
    <ul>
      {repositories.edges.map(repository => (
        <li key={repository.node.id}>
          <a href={repository.node.url}>{repository.node.name}</a>{' '}
          <Mutation
            mutation={WATCH_REPOSITORY}
            initial={{
              repository: {
                viewerSubscription: repository.node.viewerSubscription,
                totalCount: repository.node.watchers.totalCount
              }
            }}
            resolveMutation={resolveWatchMutation}
          >
            {(toggleWatch, { data, loading, errors }) => (
              <button
                type="button"
                onClick={() =>
                  toggleWatch({
                    variables: {
                      id: repository.node.id,
                      viewerSubscription: isWatch(
                        data.repository.viewerSubscription
                      )
                        ? 'UNSUBSCRIBED'
                        : 'SUBSCRIBED'
                    }
                  })
                }
              >
                {data.repository.totalCount}
                {isWatch(data.repository.viewerSubscription)
                  ? ' Unwatch'
                  : ' Watch'}
              </button>
            )}
          </Mutation>
        </li>
      ))}
    </ul>

    <hr />

    {repositories.pageInfo.hasNextPage && (
      <button onClick={onFetchMoreRepositories}>More</button>
    )}
  </div>
);

const Organization = ({ organization, onFetchMoreRepositories }) => (
  <div>
    <h1>
      <a href={organization.url}>{organization.name}</a>
    </h1>
    <Repositories
      repositories={organization.repositories}
      onFetchMoreRepositories={onFetchMoreRepositories}
    />
  </div>
);

export default App;
