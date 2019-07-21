/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type ShareInput = {
  format: string,
  url: string,
};

export type ImagesInput = {
  images: Array< ImageInput >,
};

export type ImageInput = {
  filetype: string,
  s3path: string,
};

export type ArticleInput = {
  filetype?: string | null,
  s3path: string,
};

export type AddSharePostMutationVariables = {
  title?: string | null,
  description?: string | null,
  entity: ShareInput,
};

export type AddSharePostMutation = {
  addSharePost:  {
    __typename: "PostSummary",
    id: string,
    title: string | null,
    description: string | null,
    updated_at: string,
    created_at: string,
    entity_type: string,
    entity: ( {
        __typename: "Share",
        format: string,
        url: string,
      } | {
        __typename: "Images",
      } | {
        __typename: "Article",
        filetype: string | null,
        s3path: string,
      }
    ),
    owner: string,
    owner_user:  {
      __typename: "User",
      id: string,
      name: string,
      picture: string | null,
      display_name: string | null,
      is_following: boolean | null,
      followings: number | null,
      followers: number | null,
    } | null,
  },
};

export type AddImagePostMutationVariables = {
  title?: string | null,
  description?: string | null,
  entity: ImagesInput,
};

export type AddImagePostMutation = {
  addImagePost:  {
    __typename: "PostSummary",
    id: string,
    title: string | null,
    description: string | null,
    updated_at: string,
    created_at: string,
    entity_type: string,
    entity: ( {
        __typename: "Share",
        format: string,
        url: string,
      } | {
        __typename: "Images",
      } | {
        __typename: "Article",
        filetype: string | null,
        s3path: string,
      }
    ),
    owner: string,
    owner_user:  {
      __typename: "User",
      id: string,
      name: string,
      picture: string | null,
      display_name: string | null,
      is_following: boolean | null,
      followings: number | null,
      followers: number | null,
    } | null,
  },
};

export type AddArticlePostMutationVariables = {
  title?: string | null,
  entity: ArticleInput,
};

export type AddArticlePostMutation = {
  addArticlePost:  {
    __typename: "PostSummary",
    id: string,
    title: string | null,
    description: string | null,
    updated_at: string,
    created_at: string,
    entity_type: string,
    entity: ( {
        __typename: "Share",
        format: string,
        url: string,
      } | {
        __typename: "Images",
      } | {
        __typename: "Article",
        filetype: string | null,
        s3path: string,
      }
    ),
    owner: string,
    owner_user:  {
      __typename: "User",
      id: string,
      name: string,
      picture: string | null,
      display_name: string | null,
      is_following: boolean | null,
      followings: number | null,
      followers: number | null,
    } | null,
  },
};

export type GenerateUploadUrlMutationVariables = {
  keys: Array< string >,
};

export type GenerateUploadUrlMutation = {
  generateUploadURL: Array< string >,
};

export type FollowUserMutationVariables = {
  targetId: string,
};

export type FollowUserMutation = {
  followUser:  {
    __typename: "IDWrapper",
    id: string,
  },
};

export type UnfollowUserMutationVariables = {
  targetId: string,
};

export type UnfollowUserMutation = {
  unfollowUser:  {
    __typename: "IDWrapper",
    id: string,
  },
};

export type ListPostSummaryExtraQueryVariables = {
  owner?: string | null,
};

export type ListPostSummaryExtraQuery = {
  listPostSummary:  Array< {
    __typename: "PostSummary",
    id: string,
    title: string | null,
    description: string | null,
    updated_at: string,
    created_at: string,
    entity_type: string,
    entity: ( {
        __typename: "Share",
        format: string,
        url: string,
      } | {
        __typename: "Images",
        images:  Array< {
          __typename: string,
          filetype: string,
          s3path: string,
        } >,
      } | {
        __typename: "Article",
        filetype: string | null,
        s3path: string,
      }
    ),
    owner: string,
    owner_user:  {
      __typename: "User",
      id: string,
      name: string,
      picture: string | null,
      display_name: string | null,
    } | null,
  } >,
};

export type GetUserByNameQueryVariables = {
  name: string,
};

export type GetUserByNameQuery = {
  getUserByName:  {
    __typename: "User",
    id: string,
    name: string,
    picture: string | null,
    display_name: string | null,
    is_following: boolean | null,
    followings: number | null,
    followers: number | null,
  } | null,
};

export type GetUserMoreByNameQueryVariables = {
  name: string,
};

export type GetUserMoreByNameQuery = {
  getUserMoreByName:  {
    __typename: "User",
    id: string,
    name: string,
    picture: string | null,
    display_name: string | null,
    is_following: boolean | null,
    followings: number | null,
    followers: number | null,
  } | null,
};

export type GetPostSummaryQueryVariables = {
  id: string,
};

export type GetPostSummaryQuery = {
  getPostSummary:  {
    __typename: "PostSummary",
    id: string,
    title: string | null,
    description: string | null,
    updated_at: string,
    created_at: string,
    entity_type: string,
    entity: ( {
        __typename: "Share",
        format: string,
        url: string,
      } | {
        __typename: "Images",
      } | {
        __typename: "Article",
        filetype: string | null,
        s3path: string,
      }
    ),
    owner: string,
    owner_user:  {
      __typename: "User",
      id: string,
      name: string,
      picture: string | null,
      display_name: string | null,
      is_following: boolean | null,
      followings: number | null,
      followers: number | null,
    } | null,
  },
};

export type ListPostSummaryQueryVariables = {
  owner?: string | null,
};

export type ListPostSummaryQuery = {
  listPostSummary:  Array< {
    __typename: "PostSummary",
    id: string,
    title: string | null,
    description: string | null,
    updated_at: string,
    created_at: string,
    entity_type: string,
    entity: ( {
        __typename: "Share",
        format: string,
        url: string,
      } | {
        __typename: "Images",
      } | {
        __typename: "Article",
        filetype: string | null,
        s3path: string,
      }
    ),
    owner: string,
    owner_user:  {
      __typename: "User",
      id: string,
      name: string,
      picture: string | null,
      display_name: string | null,
      is_following: boolean | null,
      followings: number | null,
      followers: number | null,
    } | null,
  } >,
};
