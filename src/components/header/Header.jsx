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
    <div className='py-3 shadow bg-gray-500 font-mono'>
        <Container>
            <nav className='flex'>
                <div className='mr-4'>
                    <Link to='/'>
                        <Logo width='70px' />
                    </Link>
                </div>
                <ul className='flex ml-auto sm:mt-2'>
                    {navItems.map((item) => (
                        item.active ? (
                            <li key={item.name}>
                                <button 
                                    onClick={() => navigate(item.slug)}
                                    className='inline-block px-1 md:px-4 py-2 duration-500 hover:bg-blue-100 rounded-full text-sm'
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