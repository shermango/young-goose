export const mutation = repositoryId => `
  mutation ($repositoryId: ID!) {
    addStar(input:{starrableId: "${repositoryId}") {
      starrable {
        viewerHasStarred
      }
    }
  }
`;
