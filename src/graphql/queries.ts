// tslint:disable
// this is an auto generated file. This will be overwritten

export const getUserByName = `query GetUserByName($name: String!) {
  getUserByName(name: $name) {
    id
    name
    picture
    display_name
  }
}
`;
export const getPostSummary = `query GetPostSummary($id: ID!) {
  getPostSummary(id: $id) {
    id
    title
    description
    updatedAt
    createdAt
    owner
    entityType
    entity {
      ... on Share {
        format
        url
      }
    }
  }
}
`;
