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
    updated_at
    created_at
    entity_type
    entity {
      ... on Share {
        format
        url
      }
      ... on Article {
        filetype
        s3path
      }
    }
    owner
    owner_user {
      id
      name
      picture
      display_name
      is_following
      followings
      followers
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
    updated_at
    created_at
    entity_type
    entity {
      ... on Share {
        format
        url
      }
      ... on Article {
        filetype
        s3path
      }
    }
    owner
    owner_user {
      id
      name
      picture
      display_name
      is_following
      followings
      followers
    }
  }
}
`;
export const addArticlePost = `mutation AddArticlePost($title: String, $entity: ArticleInput!) {
  addArticlePost(title: $title, entity: $entity) {
    id
    title
    description
    updated_at
    created_at
    entity_type
    entity {
      ... on Share {
        format
        url
      }
      ... on Article {
        filetype
        s3path
      }
    }
    owner
    owner_user {
      id
      name
      picture
      display_name
      is_following
      followings
      followers
    }
  }
}
`;
export const generateUploadUrl = `mutation GenerateUploadUrl($keys: [String!]!) {
  generateUploadURL(keys: $keys)
}
`;
export const followUser = `mutation FollowUser($targetId: String!) {
  followUser(targetId: $targetId) {
    id
  }
}
`;
export const unfollowUser = `mutation UnfollowUser($targetId: String!) {
  unfollowUser(targetId: $targetId) {
    id
  }
}
`;
