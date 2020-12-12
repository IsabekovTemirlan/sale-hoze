import React, {useContext, useState} from "react";
import {AuthContext} from "../context/authContext";
import {AddForm} from "../components/AddForm";
import {Button} from "../components/Button";
import {Card} from "../components/Card";
import {useDispatch, useSelector} from "react-redux";
import {deleteAd} from "../actions/ads";
import { deletPhotoInFirebase } from "../utils";

     

export const ProfilePage = () => {
  const [showForm, setShowForm] = useState(false);
  const {logout, userName, userId, isAuthenticated} = useContext(AuthContext);

  const ads = useSelector(state => state.ads.filter(ad => ad.creator === userId));
  const alert = useSelector(state => state.alert);
  const dispatch = useDispatch();

  const deleteAdById = id => {
    dispatch(deleteAd(id))
    const deletedPhotoName = [...ads.filter(ad => ad._id === id)[0].photoName];  
    deletedPhotoName.forEach( pn => deletPhotoInFirebase(pn));
  }

  const showFormHandler = () => setShowForm(!showForm);

  alert && setTimeout(() => {
    const timerId = dispatch({type: "SET_ALERT", payload: ""});
    clearTimeout(timerId);
  }, 5000);

  return (
    <section className="pb-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl uppercase font-bold leading-tight font-heading">Профиль</h2>
        <div className="flex items-center">
          <div className="text-2xl ">{userName}</div>
          <Button
            handler={logout}
            title="Выйти"
            btnType="bg-red-600"
            pad="py-2"
          />
        </div>
      </div>
      <hr/>

      <div className='flex mt-6'>
        <div className="mr-4 w-1/2 bg-white p-2 rounded">
          <div className="flex justify-between">
            <h2 className="text-1xl mt-2 text-bgColor uppercase leading-tight font-heading">Новое объявление</h2>
            <Button
              handler={showFormHandler}
              title={showForm ? "Скрыть" : "Подать"}
              pad="py-2"
            />
          </div>

          {showForm && <AddForm ownerId={userId}/>}
          {alert && <p className="text-center text-green-600 font-bold mt-4 p-2" >{alert}</p>}
        </div>

        <div className="w-full bg-white p-2 rounded">
          <h2 className="text-1xl mt-2 mb-6 text-bgColor uppercase leading-tight font-heading">Мои объявления</h2>
          <div className="flex justify-around flex-wrap">
            {ads.length ? ads.map(item => <Card size="w-60" handler={deleteAdById} key={item._id} data={item}
                                                isAuth={isAuthenticated}/>) : <p>Объявлений нет</p>}
          </div>

        </div>
      </div>
    </section>
  )
}