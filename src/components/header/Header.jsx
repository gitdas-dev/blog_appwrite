import React from 'react'
import { Container, Logo, LogoutButton } from '../index'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'



function Header() {
  const authStatus = useSelector((state) => state?.auth?.status)
  const navigate = useNavigate()

  const navItems = [
    {
        name:'Home',
        slug: '/',
        active: true
    },
    {
        name:'Login',
        slug: '/login',
        active: !authStatus
    },
    {
        name:'Signup',
        slug: '/signup',
        active: !authStatus
    },
    {
        name:'All posts',
        slug: '/all-posts',
        active: authStatus
    },
    {
        name:'Add post',
        slug: '/add-post',
        active: authStatus
    }
  ]

  return (
    <div className='py-2 shadow bg-gray-500 font-mono flex'>
        <Container>
            <nav className='flex ml-1 mr-8 mt-8 mb-8'>
                <div className='mr-4'>
                    <Link to='/'>
                        <Logo />
                    </Link>
                </div>
                <ul className='flex ml-auto sm:mt-2 gap-2'>
                    {navItems.map((item) => (
                        item.active ? (
                            <li key={item.name}>
                                <button 
                                    onClick={() => navigate(item.slug)}
                                    className='inline-block px-0 sm:px-4 py-2 duration-500 hover:bg-blue-100 rounded-full sm:text-sm md:text-lg lg:text-xl'
                                >
                                    {item.name}
                                </button>
                            </li>
                        ) : null
                    ))}

                    {authStatus && (
                        <li>
                            <LogoutButton />
                        </li>
                    )}
                </ul>
            </nav>
        </Container>
    </div>
)

}

export default Header