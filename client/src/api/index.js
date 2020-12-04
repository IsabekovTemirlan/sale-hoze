import axios from "axios";

const authLoginUrl = 'http://localhost:5000/auth/login';
export const loginUser = (userData) => axios.post(authLoginUrl, userData);

const authRegisterUrl = 'http://localhost:5000/auth/register';
export const registerUser = (userData) => axios.post(authRegisterUrl, userData)

export const addAd = (newAd) => axios.post('http://localhost:5000/ads', newAd);

export const likeAd = (id) => axios.patch(`http://localhost:5000/ads/${id}/likeAd`);

export const deleteAd = (id) => axios.delete(`http://localhost:5000/ads/${id}`);
