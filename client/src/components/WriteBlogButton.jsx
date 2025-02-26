import React from 'react'
import { Link } from 'react-router-dom'

const WriteBlogButton = () => {
    return (
        <div className='fixed bottom-6 right-3'>
            <Link to="/write-blog">
                <span className="py-3 px-4 text-2xl cursor-pointer bg-white text-black border border-black rounded-full hover:text-white hover:bg-black">
                    <i className="fa-regular fa-pen-to-square"></i>
                </span>
            </Link>
        </div>
    )
}

export default WriteBlogButton