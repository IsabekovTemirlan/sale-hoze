import React, { useEffect, useState } from 'react'
import { getFavoriteAds, clearFavoritesAds } from '../../api'
import { useDispatch, useSelector } from 'react-redux';
import { SET_LOADING, CLEAR_LOADING, SET_ALERT } from '../../types';
import FavoritePageContainer from "./Favorite";

export const FavoritePage = ({ userId }) => {
  const [favAds, setFavAds] = useState([]);
  const loading = useSelector(state => state.loading);
  const dispatch = useDispatch();

  const getAds = async (userId) => {
    dispatch({ type: SET_LOADING });
    const { data } = await getFavoriteAds({ userId });
    dispatch({ type: CLEAR_LOADING });
    if (data) { setFavAds(data); }
  }

  const clearFavorites = async () => {
    const { data } = await clearFavoritesAds({ userId });
    dispatch({ type: SET_ALERT, payload: { text: data } });
    setFavAds([]);
  }

  useEffect(() => {
    getAds(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <FavoritePageContainer
    favAds={favAds}
    loading={loading}
    clearFavorites={clearFavorites}
  />
}
