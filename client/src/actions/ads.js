import axios from "axios";
import * as api from "../api";
import { CLEAR_LOADING, CREATE, DELETE, GET_ADS, LIKE, SEARCH_AD, SET_ALERT, SET_LOADING, SORT_ADS, UPDATE } from "../types";

const adsUrl = api.url +  'ads';

export const getAds = (page) => async (dispatch) => {
  dispatch({ type: SET_LOADING });
  try {
    const { data } = await axios.get(`${adsUrl}?${page}=1&limit=16`);
    dispatch({ type: GET_ADS, payload: data });
    dispatch({ type: CLEAR_LOADING });

  } catch (e) { console.log(e.message); }
}

export const createAd = (ad) => async (dispatch) => {
  try {
    const { data } = await api.addAd(ad)
    dispatch({ type: CREATE, payload: data.newAd });
    dispatch({ type: SET_ALERT, payload: { text: data.message } });

  } catch (e) { console.log(e.message); }
}

export const likeAd = (id) => async (dispatch) => {
  try {
    const { data } = await api.likeAd(id);
    dispatch({ type: LIKE, payload: data });

  } catch (error) { console.log(error.message); }
};

export const deleteAd = (id, userId) => async (dispatch) => {
  try {
    const { data } = await api.deleteAd(id, userId);
    dispatch({ type: DELETE, payload: id });
    dispatch({ type: SET_ALERT, payload: { text: data.message } });

  } catch (error) { console.log(error.message); }
};

export const searchAds = (value, type) => async (dispatch) => {
  dispatch({ type: SET_LOADING });
  const { data } = await api.searchAds({ value, type })
  if (data.message) {
    dispatch({ type: SET_ALERT, payload: { text: data.message, type: data.status } });
    dispatch({ type: SEARCH_AD, payload: [] });
    dispatch({ type: CLEAR_LOADING });
  } else {
    dispatch({ type: SEARCH_AD, payload: data });
    dispatch({ type: CLEAR_LOADING });
  }
}

export const updateAd = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updateAd(id, post);
    dispatch({ type: UPDATE, payload: data });

  } catch (error) { console.log(error.message); }
};

export const sortAds = (value) => async (dispatch) => {
  dispatch({ type: SET_LOADING });
  try {
    const { data } = await api.sortAds({ value });
    dispatch({ type: SORT_ADS, payload: data });
    dispatch({ type: CLEAR_LOADING });

  } catch (e) {
    console.log(e.message);
    dispatch({ type: CLEAR_LOADING });
  }
}