import { createRoot } from 'react-dom/client'

import { ApolloProvider } from '@apollo/client'
import { client } from './apollo/client'

import { ThemeProvider, createTheme } from '@mui/material/styles'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import './index.css'

import Layout from './components/Layout/Layout'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={darkTheme}>
      <Layout />
    </ThemeProvider>
  </ApolloProvider>
)
