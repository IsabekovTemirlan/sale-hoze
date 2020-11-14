import * as api from "../api";

export const getAds = () => async (dispatch) => {
  try {
    const { data } = await api.fetchAds();

    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (e) {
    console.log(e.message);
  }
}