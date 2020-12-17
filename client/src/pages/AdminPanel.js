import React from 'react'
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UserItem = ({id, login, roles, links}) => {
  return (
    <tr className="transition-all hover:bg-gray-100 hover:shadow-lg">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="">
            <div className="text-sm font-medium text-gray-900">{login}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{links.length}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
          Active
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{roles}</td>
      <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
        <Link to={`users/${id}`} className="text-indigo-600 hover:text-indigo-900">Настроить</Link>
      </td>
    </tr>
  )
}

export const AdminPanel = () => {
  const users = useSelector(state => state.users);
  const adsCount = useSelector(state => state.ads.length);

  return (
    <div className="flex h-screen overflow-y-hidden bg-white" x-data="setup()">
      {/* <Navbar isAdmin isAuth /> */}
      <section className="flex-1 mt-16 max-h-full p-5 overflow-hidden overflow-y-scroll">

        <div className="flex flex-col items-start justify-between pb-6 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
          <h1 className="text-2xl font-semibold whitespace-nowrap">Панель управления SaleHoz</h1>
        </div>

        <div className="my-2 flex w-1/3">
          <div className="p-4 mr-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg">
            <div className="flex items-start justify-between">
              <div className="flex flex-col space-y-2">
                <span className="text-gray-400">Всего пользователей</span>
                <span className="text-lg font-semibold">{users.length}</span>
              </div>
            </div>
          </div>

          <div className="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg">
            <div className="flex items-start justify-between">
              <div className="flex flex-col space-y-2">
                <span className="text-gray-400">Всего объявлений</span>
                <span className="text-lg font-semibold">{adsCount}</span>
              </div>
            </div>
          </div>
        </div>

        <h3 className="mt-6 text-xl">Пользователи</h3>
        <div className="flex flex-col mt-6">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden border-b border-gray-200 rounded-md shadow-md">
                <table className="min-w-full overflow-x-scroll divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Логин
                      </th>
                      <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase" >
                        Кол-во объявлений
                      </th>
                      <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase" > Status </th>
                      <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase" >
                        Role
                      </th>
                      <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">
                        Редактирование
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map( user => <UserItem key={user._id} id={user._id} login={user.login} roles={user.roles} links={user.links} />)}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}