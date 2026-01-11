import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import{Link, useNavigate} from 'react-router-dom'
import { logout } from '../App/features/authSlice'

function Navbar()
{

 
    const {user} = useSelector(state=>state.auth)
    const dispatch = useDispatch()


    const navigate=useNavigate

    const logoutUsers=()=>{
        dispatch(logout())
        navigate('/')
    }

return (

    <div className='shadow bg-white'>
<nav className='flex items-center justify-betwenn max-w-7xl mx-autp px-4 py-3.5 text-slate-800 transition-all'>

<Link to='/'>
<img  src='/logo.svg' className='h-11 w-auto'/>
</Link>
<div className='flex items-center gap text-sm'>
    <p className='max-sm:hidden'>Hi {user?.name}</p>
    <button onClick={logoutUsers} className='bg-white hover:bg-slate-50 border border-gray-300 px-7 py-1.5 rounded-full active:scale-95 transition-all'>Logout</button>
</div>

</nav>


    </div>


)


}

 export default Navbar