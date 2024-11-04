import React from 'react'
import service from '../Appwrite/conf'
import { Link } from 'react-router-dom'

function PostCard({
    $id,
    title,
    featuredImage
}) {
  return (
    <Link to={`/post/${$id}`}>
        <div className='h-52 rounded-md bg-gray-200 p-4 m-4 overflow-hidden flex flex-col flex-center align-center'>
            <div className='w-full justify-center align-center mb-2'>
                <img src={service.getFilePreview(featuredImage)} alt={title} className='rounded-xl w-64 h-40 object-cover'/>
            </div>
            <h2 className='font-semibold font-mono mb-3'>{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard;