/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTournament = /* GraphQL */ `
  query GetTournament($id: ID!) {
    getTournament(id: $id) {
      id
      name
      month
      club
      date
      category
      link
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listTournaments = /* GraphQL */ `
  query ListTournaments(
    $filter: ModelTournamentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTournaments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        month
        club
        date
        category
        link
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
