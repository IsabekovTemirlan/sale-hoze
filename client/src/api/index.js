import axios from "axios";

export const url = 'http://localhost:5000/';

export const loginUser = (userData) => axios.post(`${url}auth/login`, userData);
export const registerUser = (userData) => axios.post(`${url}auth/register`, userData)

export const addAd = (newAd) => axios.post(`${url}ads`, newAd);
export const likeAd = (id) => axios.patch(`${url}ads/${id}/likeAd`);
export const deleteAd = (id, userId) => axios.post(`${url}ads/${id}`, userId);
export const updateAd = (id, updatedAd) => axios.patch(`${url}ads/${id}`, updatedAd);
export const searchAds = (value) => axios.post(`${url}ads/search`, value);

export const loginAdmin = (adminData) => axios.post(`${url}admin`, adminData);
export const deleteUser = (data, headers) => axios.post(`${url}admin/users/${data.id}`, data, {headers});
