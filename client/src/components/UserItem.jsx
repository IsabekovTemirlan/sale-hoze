import React from 'react';
import { Link } from "react-router-dom";

export const UserItem = ({ id, login, roles, ads, email }) => {
  const adsCount = ads.filter((a) => a.creator === id);
  return (
    <tr className="transition-all hover:bg-gray-100 hover:shadow-lg page-enter">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="">
            <div className="text-sm font-medium text-gray-900">{login}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
        {email}
      </td>
      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
        {adsCount.length}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
          Active
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
        {roles.map(r => <span key={r}>{r}  </span>)}
      </td>
      <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
        <Link
          to={`users/${id}`}
          className="text-indigo-600 hover:text-indigo-900"
        >
          Настроить
        </Link>
      </td>
    </tr>
  );
};