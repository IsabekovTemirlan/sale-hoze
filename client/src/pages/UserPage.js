import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export const UserPage = () => {
  const {id} = useParams();
  const user = useSelector((state) => state.users.find((item) => item._id === id));
  console.log(user);
  return (
    <div className="pt-24">
      Users
    </div>
  )
}

