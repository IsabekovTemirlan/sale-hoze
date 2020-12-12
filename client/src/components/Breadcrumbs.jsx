import React from 'react'

export const Breadcrumbs = () => {
  return (
    <div className="max-w-7xl mx-auto pt-20 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-center space-x-2 text-balck text-sm">
        <a href="/" className="hover:underline hover:text-gray-600">Home</a>
        <span>
          <svg className="h-5 w-5 leading-none text-bgColor" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </span>
        <a href="/" className="hover:underline hover:text-gray-600">Electronics</a>
        <span>
          <svg className="h-5 w-5 leading-none text-bgColor" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </span>
        <span>Headphones</span>
      </div>
    </div>
  )
}
