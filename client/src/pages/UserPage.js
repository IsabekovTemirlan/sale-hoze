import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export const UserPage = () => {
  const {id} = useParams();
  const user = useSelector((state) => state.users.find((item) => item._id === id));
  return (
    <div className="mt-12 w-1/2 md:flex-1 flex">
      <div className="m-4">
        <p className="pr-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Login</p> 
        <p className="">
          {user.login}
        </p>
      </div>
      <div className="m-4">
      <p className="pr-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Roles</p>
      <p className="">
        {user.roles.map(r => <span key={r}>{r}</span>)}
      </p>
      </div>
    </div>
  )
}