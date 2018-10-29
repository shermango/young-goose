import GQL_CLIENT from './client';

// query as a template literal factory func
// export const query = (organization, repo) => `
//   {
//     organization(login: "${organization}") {
//       name
//       url
//       repository(name: "${repo}") {
//         name
//         url
//         issues(last: 5) {
//           edges {
//             node {
//               id
//               title
//               url
//             }
//           }
//         }
//       }
//     }
//   }
// `;

// query as defined by SDL

export const query = `
  query ($organization: String!, $repository: String!, $cursor: String) {
    organization(login: $organization) {
      name
      url
      repository(name: $repository) {
        id
        name
        url
        viewerHasStarred
        issues(first: 5, after: $cursor, states: [OPEN]) {
          edges {
            node {
              id
              title
              url
              reactions(last: 3) {
                edges {
                  node {
                    id
                    content
                  }
                }
              }
            }
          }
          totalCount
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    }
  }
`;

export default GQL_CLIENT;
