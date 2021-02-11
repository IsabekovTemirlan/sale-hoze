import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../context/authContext";
import { deleteAd } from "../../actions/ads"
import { getUsers } from "../../actions/users"
import AdminPanelContainer from "./AdminPanel";

export const AdminPanel = () => {
  const { logout, userName, token, userId } = useContext(AuthContext);
  const users = useSelector((state) => state.users);
  const ads = useSelector((state) => state.ads);
  const [tab, setTab] = useState("user");

  const dispatch = useDispatch();

  useEffect(() => {
    if (!users.length) { dispatch(getUsers(token)) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logoutHandler = () => {
    logout();
    window.location.href = "/";
  };

  const deleteAdById = (id) => {
    dispatch(deleteAd(id, { userId }));
  };

  return <AdminPanelContainer
    ads={ads}
    tab={tab}
    setTab={setTab}
    userId={userId}
    users={users}
    userName={userName}
    logoutHandler={logoutHandler}
    deleteAdById={deleteAdById}
  />
};
