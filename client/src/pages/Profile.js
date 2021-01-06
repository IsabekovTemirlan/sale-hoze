import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { Button } from "../components/Button";
import { AdItem } from "../components/AdItem";
import { Loader } from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { deleteAd } from "../actions/ads";
import { getUserAds } from "../actions/users";
import { deletPhotoInFirebase } from "../utils";
import { AdEditForm } from "../components/AdEditForm";
import { Link } from "react-router-dom";
import { DELETE_USER_AD } from "../types";

export const ProfilePage = () => {
  const { logout, userName, userId } = useContext(AuthContext);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedAd, setSelectedAd] = useState({});

  // const ads = useSelector((state) => state.ads.filter((ad) => ad.creator === userId));
  const userAds = useSelector(state => state.users);
  const loading = useSelector(state => state.loading);
  const dispatch = useDispatch();

  const deleteAdById = (id) => {
    dispatch(deleteAd(id, { userId }));
    dispatch({ type: DELETE_USER_AD, payload: id });
    const deletedPhotoName = [...userAds.filter((ad) => ad._id === id)[0].photoName];
    deletedPhotoName.forEach((pn) => deletPhotoInFirebase(pn));
  };

  useEffect(() => {
    dispatch(getUserAds({ userId }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const editFormHandler = (data, id) => {
    setShowEditForm(true);
    setSelectedAd({ data, id });
  }

  return (
    <section className="mt-2 pb-6">
      <div className="flex justify-between items-center flex-wrap sm:flex-nowrap">
        <h2 className="text-3xl uppercase font-bold leading-tight font-heading text-center md:text-left sm:w-auto w-full">
          Профиль
        </h2>
        <div className="flex items-center mx-auto sm:mx-0">
          <div className="text-2xl ">{userName}</div>
          <Link to="/advertise"><Button title="Подать" pad="py-2" /></Link>
          <Button
            handler={logout}
            title="Выйти"
            btnType="bg-red-600"
            pad="py-2"
          />
        </div>
      </div>
      {showEditForm && <AdEditForm data={selectedAd.data} id={selectedAd.id} showForm={setShowEditForm} />}
      <hr />
      <div className="pt-4 block">
        <h1 className="text-2xl text-center page-enter"> Мои обьявления</h1>
      </div>
      <div className="py-4 flex justify-center page-enter">
      {loading ? <Loader/> : null}
        {userAds.length ? (
          <table className="w-full text-md bg-white shadow-md rounded mb-4">
            <tbody>
              <tr className="border-b">
                <th className="text-left p-1 cdd:p-3 cdd:px-5">Заголовок</th>
                <th className="text-left p-1 cdd:p-3 cdd:px-5">Дата размещения</th>
                <th className="text-left p-1 cdd:p-3 cdd:px-5 hidden sm:table-cell">Срок</th>
                <th className="text-right p-1 cdd:p-3 cdd:px-6">Действия</th>
              </tr>
              {userAds.map((item) => (
                <AdItem
                  handler={deleteAdById}
                  key={item._id}
                  data={item}
                  id={item._id}
                  editHandler={editFormHandler}
                />
              ))}
            </tbody>
          </table>
        ) : (
            <p className="text-center">Объявлений нет</p>
          )}
      </div>
    </section>
  );
};
