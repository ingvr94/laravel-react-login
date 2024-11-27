import React from 'react'
import { useEffect } from 'react';
import { useStateContext } from '../context/ContextProvider'
import { Link, Outlet, Navigate } from 'react-router-dom'
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Navbar
} from "@material-tailwind/react";
import {PowerIcon} from "@heroicons/react/24/solid";
import axiosClient from '../axios-client';

function DefaultLayout() {

    const {user,token,setUser,setToken}=useStateContext()

    if (!token) {
        return <Navigate to='/login' />
    }

    const onLogout=(e)=>{
      e.preventDefault()


      axiosClient.post('logout')
      .then(()=>{
        setUser({})
        setToken(null)
      })
    }

    useEffect(()=>{
      axiosClient.get('/user')
      .then(({data})=>{
        setUser(data)
      })
    },[])

  return (
    <div className='flex' id="defaultLayout">

      {/* Side bar */}
      <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Sidebar
        </Typography>
      </div>
      <List>
        <ListItem>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          <a href="#" onClick={onLogout}>Log Out</a>
        </ListItem>
      </List>
    </Card>
      <div className="container">
        <Navbar className=" px-4 py-2 lg:px-8 lg:py-4 w-screen">
        <div className="container flex items-center justify-between text-blue-gray-900">
          <Typography
            className="mr-4 cursor-pointer py-1.5 font-medium"
          >
          Navbar
          </Typography>
          <Typography
            className="mr-4 cursor-pointer py-1.5 font-medium"
          >
          {user.name}
          </Typography>
        </div>
        </Navbar>
        <main className='mx-8 my-4 text-3xl'>
          <Outlet />
        </main>
      </div>

    </div>
  )
}

export default DefaultLayout