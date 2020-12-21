import React, {useEffect} from "react";

import { Alert } from "../components/Alert";
import { Button } from "../components/Button";
import { AddForm } from "../components/AddForm";

import { Link } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";

export const AdvertisePage = ({ isAuth, userId }) => {
  const alert = useSelector(state => state.alert);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => dispatch({type: "SET_ALERT", payload: ""});
  }, [dispatch]);

  if (isAuth) {
    return (
      <section>
      {alert && <Alert text={alert} />}
        <h2 className="text-3xl mt-2 mb-6 font-bold uppercase leading-tight font-heading">Подать объявления</h2>
        <div className="w-full">
          <AddForm ownerId={userId} />
        </div>
      </section>
    )
  } else {

    return (
      <section>
        <h2 className="text-3xl mt-2 mb-6 font-bold uppercase leading-tight font-heading">Подать объявления</h2>
        <div className="w-full">

          <div className="w-full mb-6 mx-auto bg-white p-2 rounded text-center">
            <h2 className="text-2xl mt-2 mb-6 text-bgColor font-bold leading-tight font-heading">Объявление с
            продвижением</h2>
            <p className="mb-8 text-gray-500 leading-relaxed">Для полнаценного использования данной платформы, контроля и
            продвижения ваших объявлений необходим этот способ, но требуется регистрация. Регистрация не трудная и
            занимает несколько минут.</p>
            <div>
              <Link to='/auth'>
                <Button title={'Зарегистрироваться'} />
              </Link>
            </div>
          </div>

          <div className="w-full bg-white mx-auto p-2 rounded text-center">
            <h2 className="text-2xl mt-2 mb-6 text-bgColor font-bold leading-tight font-heading">Быстрое объявления</h2>
            <p className="mb-8 text-gray-500 leading-relaxed">Этот способ подать обьъявление хорош тем что вам не нужно
            тратить время на регистрацию. Вам нунжо лишь указать срок, по истечению которого объявление само
            уничтожется. Это сделано для удобного и быстрого использлвания.</p>
            <hr />

            {alert && <Alert text={alert} />}

            <div className="mt-4 text-left">
              <AddForm />
            </div>

          </div>
        </div>
      </section>

    )
  }
};