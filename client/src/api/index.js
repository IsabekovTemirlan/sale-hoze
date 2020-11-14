import axios from "axios";

const url = 'http://localhost:5000/ads';

export const fetchAds = () => axios.get(url);
