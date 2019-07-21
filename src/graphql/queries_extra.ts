export const ListPostSummary = `query ListPostSummaryExtra($owner: String) {
  listPostSummary(owner: $owner) {
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
      ... on Images {
        images {
          filetype
          s3path
        }
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
    }
  }
}
`;
