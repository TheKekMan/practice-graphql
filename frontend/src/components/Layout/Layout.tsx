import { Box, Button, Container, TextField, Typography } from '@mui/material'
import styles from './Layout.module.css'
import PostList from '../elements/PostList/PostList'
import { useMutation } from '@apollo/client'
import {
  ReturntypeMutationAddNewPost,
  ReturntypeQueryGetAllPosts,
  VarsMutationAddNewPost,
  mutationAddNewPost,
  queryGetAllPosts,
} from '../../apollo/queries/postsQueries'
import { useState } from 'react'

const Layout = () => {
  const [addNewPost, { loading: addNewPostLoading }] = useMutation<
    ReturntypeMutationAddNewPost,
    VarsMutationAddNewPost
  >(mutationAddNewPost, {
    update(cache, { data }) {
      if (!data) return
      const newPost = data.createPost

      const cachePosts = cache.readQuery<ReturntypeQueryGetAllPosts>({
        query: queryGetAllPosts,
      })

      if (!cachePosts) return

      const allPosts = cachePosts.allPosts

      cache.writeQuery({
        query: queryGetAllPosts,
        data: {
          allPosts: [...allPosts, newPost],
        },
      })
    },
  })

  const [newPostTitle, setNewPostTitle] = useState<string>('')

  const onAddNewPostHandler = () => {
    if (!newPostTitle.trim().length) return

    setNewPostTitle('')

    const newPost = {
      title: newPostTitle,
      views: 1,
      user_id: 456,
    }

    addNewPost({
      variables: newPost,
    })
  }

  return (
    <div className={styles.Layout}>
      <Typography fontSize={25} m={2} color={'white'}>
        GraphQL Testing
      </Typography>
      <Container maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 1,
            }}
          >
            <TextField
              size="small"
              variant="outlined"
              label="New post (works)"
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
            />
            <Button
              variant="contained"
              disabled={addNewPostLoading}
              onClick={onAddNewPostHandler}
            >
              Add
            </Button>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
            <TextField size="small" variant="outlined" label="Search task" />
            <Button variant="contained">Search</Button>
          </Box>
        </Box>
        <PostList />
      </Container>
    </div>
  )
}

export default Layout
