import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const { aToken, setAToken } = useContext(AdminContext)
    const navigate = (useNavigate)

    const logout = () => {
        navigate('/')
        aToken && setAToken('')
        aToken && localStorage.removeItem('aToken')
    }

    return (
        <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white shadow-sm'>
            
            <div className='flex items-center gap-4 w-full justify-between'>
                
                {/* Left: Logo */}
                <img 
                    src={assets.admin_logo} 
                    alt="logo" 
                    className='h-12 object-contain'
                />

                {/* Right: Role + Logout */}
                <div className='flex items-center gap-4'>
                    
                    <p className='text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full'>
                        {aToken ? 'Admin' : 'Doctor'}
                    </p>

                    <button 
                        onClick={logout}
                        className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm transition'
                    >
                        Logout
                    </button>

                </div>

            </div>
        </div>
    )
}

export default Navbar