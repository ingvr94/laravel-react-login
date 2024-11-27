import { Outlet, Navigate} from 'react-router-dom'
import { useStateContext } from '../context/ContextProvider'

function GuestLayout() {

const  {token}=useStateContext() 

if (token) {
    return <Navigate to='/home' />
}
  return (
    <div>
        <Outlet />
    </div>
  )
}

export default GuestLayout