const query = (organization, repo) => `
  {
    organization(login: "${organization}") {
      name
      url
      repository(name: "${repo}") {
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

export default query;
