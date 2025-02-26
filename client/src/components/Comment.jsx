import React from 'react'
import moment from 'moment'

const Comment = ({ authorName, date, content }) => {
    const formattedDate = moment(date).format("MMMM D, YYYY");

    return (
        <div className="p-6 mb-2 border text-base bg-white rounded-lg">
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 text-xs flex items-center justify-center text-white font-bold uppercase rounded-full cursor-pointer bg-gray-500" >
                        {authorName.substring(0, 1)}
                    </div>
                    <p >
                        {authorName}
                    </p>
                    <p className="text-sm text-gray-600 m-auto">{formattedDate}</p>
                </div>
            </div>
            <p className="text-gray-500">{content}</p>
        </div>
    )
}

export default Comment