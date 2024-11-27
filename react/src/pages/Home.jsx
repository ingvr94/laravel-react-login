import React from 'react'
import { useStateContext } from '../context/ContextProvider';

function Home() {

  const {user}=useStateContext()

  return (
    <div>Welcome, {user.name}!</div>
  )
}

export default Home