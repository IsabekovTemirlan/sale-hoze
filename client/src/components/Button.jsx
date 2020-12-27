import React from 'react';

export const Button = ({title, type, handler, btnType, pad, disabled}) => {

  return (
    <button
      disabled={disabled}
      onClick={handler ? handler : null} type={type || null}
      className={`inline-block px-8 ${pad ? pad : 'py-4'} m-2 leading-none focus:outline-none outline-none text-white uppercase ${btnType ? btnType : "bg-bgColor"} ${disabled && 'bg-gray-200 text-gray-800 cursor-default'} hover:bg-opacity-75 rounded shadow`} >
      {title}
    </button>
  )
}