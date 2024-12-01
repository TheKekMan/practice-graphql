import { gql } from '@apollo/client'

export type ReturntypeQueryGetAllPosts = {
  allPosts: { id: string; name: string }[]
}

export const queryGetAllPosts = gql`
  query GetAllPosts {
    allPosts {
      id
      title
      views
    }
  }
`

export type VarsMutationAddNewPost = {
  title: string
  views: number
  user_id: number
}

export type ReturntypeMutationAddNewPost = {
  createPost: {
    id: string
  } & VarsMutationAddNewPost
}

export const mutationAddNewPost = gql`
  mutation AddPost($title: String!, $views: Int!, $user_id: ID!) {
    createPost(title: $title, views: $views, user_id: $user_id) {
      id
      title
      views
      user_id
    }
  }
`
