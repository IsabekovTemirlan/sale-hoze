import axios from "axios";
import * as api from "../api";

const adsUrl = 'http://localhost:5000/ads';

export const getAds = () => async (dispatch) => {
  try {
    const {data} = await axios.get(adsUrl);
    dispatch({type: "GET_ADS", payload: data});
    
  } catch (e) {console.log(e.message);}
}

export const createAd = (ad) => async (dispatch) => {
  try {
    const { data } = await api.addAd(ad)
    dispatch({ type: "CREATE", payload: data.newAd });
    dispatch({type: "SET_ALERT", payload: data.message});

  } catch (e) { console.log(e.message); }
}

export const likeAd = (id) => async (dispatch) => {
  try {
    const { data } = await api.likeAd(id);
    dispatch({ type: "LIKE", payload: data });

  } catch (error) { console.log(error.message);}
};

export const deleteAd = (id, userId) => async (dispatch) => {
  try {
    const {data} = await api.deleteAd(id, userId);
    dispatch({ type: "DELETE", payload: id });
    dispatch({type: "SET_ALERT", payload: data.message});

  } catch (error) { console.log(error.message); }
};

export const searchAds = (value) => (dispatch) => {
  dispatch({ type: "SEARCH_AD", payload: value });
}

export const searchAdByCategory = (value) => (dispatch) => {
  dispatch({type: "SEARCH_AD_BY_CATEGORY", payload: value});
}

export const updateAd = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updateAd(id, post);
    dispatch({ type: "UPDATE", payload: data });

  } catch (error) { console.log(error.message);}
};