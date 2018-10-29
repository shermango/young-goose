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
  query ($organization: String!, $repository: String!) {
    organization(login: $organization) {
      name
      url
      repository(name: $repository) {
        name
        url
        issues(last: 5) {
          edges {
            node {
              id
              title
              url
            }
          }
        }
      }
    }
  }
`;

export default GQL_CLIENT;
