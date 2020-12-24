import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

import {Button} from "../components/Button";
import {Modal} from "../components/Modal";
import {Alert} from "../components/Alert";

import {getUsers} from "../actions/users";

import {url, deleteUser} from "../api";
import "boxicons";
import { AuthContext } from "../context/authContext";

export const UserPage = () => {
  const { id } = useParams();
  const [showModal, setSowModal] = useState(false);
  const [modalForUser, setModalForUser] = useState(false);
  const { token } = useContext(AuthContext);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.users.find((item) => item._id === id));
  const alert = useSelector(state => state.alert);

  useEffect(() => {
    return () => dispatch({type: "SET_ALERT", payload: ""})
  }, [dispatch]);

  const toAdminister = async () => {
    const endUrl = `${url}admin/users`,
    data = {id: user._id, userName: user.login},
    headers = { 'Content-Type': 'application/json', 'Authorization': "Bearer " + token };
    const res = user.roles.includes("ADMIN") ? await axios.patch(endUrl, data, {headers}) : await axios.post(endUrl, data, {headers});
    dispatch(getUsers(token))
    dispatch({type: "SET_ALERT", payload: res.data.message});    
    setSowModal(false)
  }

  const deleteUserHandler = async () => {
    const data = {id: user._id},
    headers = { 'Content-Type': 'application/json', 'Authorization': "Bearer " + token };
    const res = await deleteUser(data, headers);
    dispatch({type: "SET_ALERT", payload: {text: res.data.message}});
    dispatch(getUsers(token))
    setModalForUser(false);
  }

  return (
    <>
      {modalForUser && <Modal close={() => setModalForUser(false)} agree={deleteUserHandler} title="Удаление пользователя" body={`Вы уверены что хотите удалить пользователя ${user.login}?`} />}
      {showModal && <Modal close={() => setSowModal(false)} agree={toAdminister} title="Админимстрирование" body={`Вы уверены в присвоении пользователю ${user.login} роль Адмимнистратора?`} />}
      <div className="mt-1 md:flex-1 flex">
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
          <div className="">
            {user.roles.map((r) => (
              <div key={r}>
                <p>{r}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="m-4">
          <p className="pr-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Ads</p>
          <div className="">
            {user.links.length ? user.links.map((r) => (
              <div key={r} className="flex">
                <Link className="text-blue-500 underline" to={`/detail/${r}`}>{r}<box-icon color="#4299e1" size="xs" name='link-external'></box-icon></Link>
              </div>
            )) : <p className="text-gray-400">Нет объявлений</p>}
          </div>
        </div>
      </div>
      <hr />
      <div className="flex items-center">
        <Button title="Написать" pad="py-2"/>
        {user.roles.includes("ADMIN") ? <Button title="Лишить привилегий" handler={ () => setSowModal(!showModal)} pad="py-2" /> : <Button handler={ () => setSowModal(!showModal)} title="Назначить Админом" pad="py-2" />}
        <Button handler={() => setModalForUser(true)} title="Удалить" btnType="bg-red-600" pad="py-2" />
      </div>
      {alert && <Alert text={alert}  />}
    </>
  );
};
