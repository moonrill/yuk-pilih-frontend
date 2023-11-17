import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './layout/Layout'
import { Index } from './pages/Index'
import Login from './pages/login'
import ResetPassword from './pages/ResetPassword'
import { ExpiredPolls, UserVotes } from './pages/UserPolls'

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        index: true,
        element: <Index/>
      },
      {
        path: '/your-votes',
        element: <UserVotes/>
      },
      {
        path: '/expired-polls',
        element: <ExpiredPolls/>
      }
    ]
  },
  {
    path: 'login',
    element: <Login />
  },
  {
    path: 'reset-password',
    element: <ResetPassword/>
  }
])
