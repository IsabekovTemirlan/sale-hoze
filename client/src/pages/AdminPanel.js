import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AdItem } from "../components/AdItem";
import { Button } from "../components/Button";
import { UserItem } from "../components/UserItem";

import { AuthContext } from "../context/authContext";

import { deleteAd } from "../actions/ads"
import { getUsers } from "../actions/users"
import { deletPhotoInFirebase } from "../utils";

const tablHeaders = {
  user: ["Логин", "email", "Кол-во объявлений", "Status", "Привилегия"],
  ads: ["Заголовок", "Дата размещения", "Автор"],
};


export const AdminPanel = () => {
  const { logout, userName, token, userId } = useContext(AuthContext);
  const users = useSelector((state) => state.users);
  const ads = useSelector((state) => state.ads);
  const [tab, setTab] = useState("user");

  const dispatch = useDispatch();

  useEffect(() => {
    return () => dispatch(getUsers(token));
  }, [dispatch, token])

  const logoutHandler = () => {
    logout();
    window.location.href = "/";
  };

  const deleteAdById = (id) => {
    dispatch(deleteAd(id, {userId}));
    const deletedPhotoName = [...ads.filter((ad) => ad._id === id)[0].photoName];
    deletedPhotoName.forEach((pn) => deletPhotoInFirebase(pn));
  };

  return (
    <div className="flex overflow-y-hidden py-4 mb-12 bg-white" x-data="setup()">
      {/* <Navbar isAdmin isAuth /> */}
      <section className="flex-1 mt-4 max-h-full p-5 overflow-hidden">
        <div className="flex items-center justify-between pb-6 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
          <h1 className="text-2xl font-semibold whitespace-nowrap">
            Панель управления SaleHoz
          </h1>
          <div className="flex items-center">
            <div className="text-2xl ">{userName}</div>
            <Button
              handler={logoutHandler}
              title="Выйти"
              btnType="bg-red-600"
              pad="py-2"
            />
          </div>
        </div>

        <div className="my-2 flex w-1/3">
          <div className="p-4 mr-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg">
            <div className="flex items-start justify-between">
              <div className="flex flex-col space-y-2">
                <span className="text-gray-400">Всего пользователей</span>
                <span className="text-4xl text-center font-semibold">{users.length - 1}</span>
                <button className="border rounded bg-gray-100 px-2" onClick={() => setTab("user")}>Пользователи</button>
              </div>
            </div>
          </div>

          <div className="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg">
            <div className="flex items-start justify-between">
              <div className="flex flex-col space-y-2">
                <span className="text-gray-400">Всего объявлений</span>
                <span className="text-4xl text-center font-semibold">{ads.length}</span>
                <button className="border rounded bg-gray-100 px-2" onClick={() => setTab("ads")}>Объявления</button>
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
                      {tab === "user"
                        ? tablHeaders.user.map((v) => (
                          <th
                            key={v}
                            scope="col"
                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                          >{v}</th>
                        ))
                        : tablHeaders.ads.map((v) => (
                          <th
                            key={v}
                            scope="col"
                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                          >{v}</th>
                        ))}
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase"
                      >
                        Редактирование
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {tab === "user"
                      ? users.map((user) => (user._id !== userId) ? (<UserItem key={user._id} id={user._id} email={user.email} login={user.login} roles={user.roles} ads={ads} />): null)
                      : null}
                    {tab === "ads"
                      ? ads.map((ad) => (
                        <AdItem
                          handler={deleteAdById}
                          key={ad._id}
                          data={ad}
                          id={ad._id}
                          forAdmin={users}
                        // editHandler={editFormHandler}
                        />
                      ))
                      : null}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
