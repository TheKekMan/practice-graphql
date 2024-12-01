import { useQuery } from '@apollo/client'
import styles from './PostList.module.css'
import {
  ReturntypeQueryGetAllPosts,
  queryGetAllPosts,
} from '../../../apollo/queries/postsQueries'
import { useEffect } from 'react'
import { CircularProgress } from '@mui/material'

const PostList = () => {
  const { data, loading } =
    useQuery<ReturntypeQueryGetAllPosts>(queryGetAllPosts)

  useEffect(() => {
    console.log(data)
  }, [data])

  if (loading) {
    return <CircularProgress />
  }

  return (
    <div className={styles.PostList}>
      {data &&
        data.allPosts.map((post: any) => {
          return (
            <div key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.views}</p>
            </div>
          )
        })}
    </div>
  )
}

export default PostList
