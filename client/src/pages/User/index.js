import React, { useContext, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUsers } from "../../actions/users";
import { url, deleteUser } from "../../api";
import { AuthContext } from "../../context/authContext";
import { SET_ALERT } from "../../types";
import UserPageContainer from "./User";
import "boxicons";

export const UserPage = () => {
  const { id } = useParams();
  const [showModal, setSowModal] = useState(false);
  const [modalForUser, setModalForUser] = useState(false);
  const { token } = useContext(AuthContext);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.users.find((item) => item._id === id));
  const alert = useSelector(state => state.alert);

  const toAdminister = async () => {
    const endUrl = `${url}admin/users`,
      data = { id: user._id, userName: user.login },
      headers = { 'Content-Type': 'application/json', 'Authorization': "Bearer " + token };
    const res = user.roles.includes("ADMIN") ? await axios.patch(endUrl, data, { headers }) : await axios.post(endUrl, data, { headers });
    dispatch(getUsers(token))
    dispatch({ type: SET_ALERT, payload: res.data.message });
    setSowModal(false)
  }

  const deleteUserHandler = async () => {
    const data = { id: user._id },
      headers = { 'Content-Type': 'application/json', 'Authorization': "Bearer " + token };
    const res = await deleteUser(data, headers);
    dispatch({ type: SET_ALERT, payload: { text: res.data.message } });
    dispatch(getUsers(token))
    setModalForUser(false);
  }

  return <UserPageContainer
    showModal={showModal}
    setSowModal={setSowModal}
    modalForUser={modalForUser}
    setModalForUser={setModalForUser}
    alert={alert}
    user={user}
    toAdminister={toAdminister}
    deleteUserHandler={deleteUserHandler}
  />
};
