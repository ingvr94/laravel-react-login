import {createBrowserRouter, Navigate} from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import Users from './pages/Users'
import NotFound from './pages/NotFound'
import DefaultLayout from './components/DefaultLayout'
import GuestLayout from './components/GuestLayout'

const router=createBrowserRouter([
    {
        path:'/',
        element:<DefaultLayout />,
        children:[
            {
                path:'/',
                element:<Navigate to="/home" />
            },
            {
                path:'/home',
                element:<Home />
            },
            {
                path:'/users',
                element:<Users />
            }
        ]
    },
    {
        path:'/',
        element:<GuestLayout />,
        children:[
            {
                path:'/login',
                element:<Login />
            },
            {
                path:'/signup',
                element:<SignUp />
            },
        ]
    },

    {
        path:'*',
        element:<NotFound />
    }

])

export default router