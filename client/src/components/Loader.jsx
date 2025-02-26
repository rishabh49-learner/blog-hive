import React from 'react';

const Loader = () => {
    return (
        <div className=" w-full h-screen z-50 overflow-hidden bg-white flex flex-col items-center justify-center">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
            <h2 className="text-center text-gray-700 text-xl font-semibold">Loading...</h2>
            <p className="px-6 text-center text-gray-700">This may take a few seconds, please don't close this page.</p>
        </div>
    );
};

export default Loader;
