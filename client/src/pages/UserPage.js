import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "boxicons";

export const UserPage = () => {
  const { id } = useParams();
  const [state, setState] = useState("");
  const user = useSelector((state) =>
    state.users.find((item) => item._id === id)
  );


  return (
    <>
      <div className="mt-1 w-1/2 md:flex-1 flex">
        <div className="m-4">
          <p className="pr-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
            Login
          </p>
          <p className="">{user.login}</p>
        </div>
        <div className="m-4">
          <p className="pr-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
            Roles
          </p>
          <div className="flex items-center">
            {user.roles.map((r) => (
              <p key={r}>{r}</p>
            ))}
            <div style={{height: '23px'}} className="cursor-pointer m-0 p-0">
              <box-icon onClick={() => console.log('btn is clicked')} color="#ff5722" name="plus"></box-icon>
            </div>
          </div>
        </div>
        <div className="m-4">
          <p className="pr-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Ads</p>
          <div className="">
            {user.links.map((r) => (
              <p key={r}>{r}</p>
            ))}
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};
