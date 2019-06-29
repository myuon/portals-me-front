// tslint:disable
// this is an auto generated file. This will be overwritten

export const addSharePost = `mutation AddSharePost(
  $title: String
  $description: String
  $entity: ShareInput!
) {
  addSharePost(title: $title, description: $description, entity: $entity) {
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
export const addImagePost = `mutation AddImagePost(
  $title: String
  $description: String
  $entity: ImagesInput!
) {
  addImagePost(title: $title, description: $description, entity: $entity) {
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
