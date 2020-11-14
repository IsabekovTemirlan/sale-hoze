import React from 'react';

export const Button = ({title, type}) => {

  return (
    <a
      className="inline-block py-4 px-8 mr-6 leading-none text-white uppercase bg-indigo-400 hover:bg-indigo-500 rounded shadow" href="/">
      {title}
    </a>
  )
}