import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useDispatch, useSelector } from "react-redux";
import { deleteAd } from "../../actions/ads";
import { getUserAds } from "../../actions/users";
import { DELETE_USER_AD } from "../../types";
import ProfilePageContainer from "./Profile";

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

  };

  useEffect(() => {
    dispatch(getUserAds({ userId }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const editFormHandler = (data, id) => {
    setShowEditForm(true);
    setSelectedAd({ data, id });
  }

  return <ProfilePageContainer
    logout={logout}
    userName={userName}
    userId={userId}
    showEditForm={showEditForm}
    selectedAd={selectedAd}
    userAds={userAds}
    loading={loading}
    deleteAdById={deleteAdById}
    editFormHandler={editFormHandler}
    setShowEditForm={setShowEditForm}
  />
};
