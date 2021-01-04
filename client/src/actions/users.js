import axios from "axios";
import {url} from "../api";
import { GET_USERS, GET_USER_ADS } from "../types";

const adsUrl = url + 'admin/users';

export const getUsers = (token) => async (dispatch) => {
  try {

    const { data } = await axios.get(adsUrl, { headers: { 'Authorization': "Bearer " + token } });

    dispatch({ type: GET_USERS, payload: data });
  } catch (e) {
    console.log(e.message);
  }
}

export const getUserAds = (userId) => async (dispatch) => {
  try {
    const { data } = await axios.post(url + "ads/userads", userId);

    dispatch({ type: GET_USER_ADS, payload: data })
  } catch (e) { console.log(e.message) }
}