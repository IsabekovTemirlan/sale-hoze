import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { Button } from "../components/Button";
import { AdItem } from "../components/AdItem";
import { useDispatch, useSelector } from "react-redux";
import { deleteAd, getAds } from "../actions/ads";
import { deletPhotoInFirebase } from "../utils";
import { AdEditForm } from "../components/AdEditForm";
import { Alert } from "../components/Alert";
import { Link } from "react-router-dom";

export const ProfilePage = () => {
  const { logout, userName, userId } = useContext(AuthContext);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedAd, setSelectedAd] = useState({});

  const ads = useSelector((state) => state.ads.filter((ad) => ad.creator === userId));
  const alert = useSelector(state => state.alert);

  const dispatch = useDispatch();

  const deleteAdById = (id) => {
    dispatch(deleteAd(id, {userId}));
    const deletedPhotoName = [...ads.filter((ad) => ad._id === id)[0].photoName];
    deletedPhotoName.forEach((pn) => deletPhotoInFirebase(pn));
  };

  useEffect(() => {
    const getMoreAds = () => dispatch(getAds(1));
    getMoreAds();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const editFormHandler = (data, id) => {
    setShowEditForm(true);
    setSelectedAd({ data, id });
  }

  return (
    <section className="pb-6">
    {alert && <Alert text={alert} />}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl uppercase font-bold leading-tight font-heading">
          Профиль
        </h2>
        <div className="flex items-center">
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
        <h1 className="text-2xl text-center"> Мои обьявления</h1>
      </div>
      <div className="py-4 flex justify-center">
        {ads.length ? (
          <table className="w-full text-md bg-white shadow-md rounded mb-4">
            <tbody>
              <tr className="border-b">
                <th className="text-left p-3 px-5">Заголовок</th>
                <th className="text-left p-3 px-5">Дата размещения</th>
                <th className="text-left p-3 px-5">Срок</th>
                <th className="text-right p-3 px-6">Действия</th>
              </tr>
              {ads.map((item) => (
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