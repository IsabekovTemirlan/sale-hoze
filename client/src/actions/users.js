import axios from "axios";

const adsUrl = 'http://localhost:5000/admin/users';

export const getUsers = (token) => async (dispatch) => {
  try {

    const {data} = await axios.get(adsUrl, { headers: { 'Authorization': "Bearer " + token } });

    dispatch({type: "GET_USERS", payload: data});
  } catch (e) {
    console.log(e.message);
  }
}