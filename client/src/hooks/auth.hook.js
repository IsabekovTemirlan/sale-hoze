import {useState, useCallback, useEffect} from 'react';

const storageName = "userData";

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userAds, setUserAds] = useState(null);

  const login = useCallback((jwtToken, id, name, ads) => {
    setToken(jwtToken);
    setUserId(id);
    setUserName(name);
    setUserAds(ads)

    localStorage.setItem(storageName, JSON.stringify({userID: id, userName: name, token: jwtToken, userAds: ads}));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setUserName(null);
    setUserAds(null);

    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));

    if (data && data.token) {
      login(data.token, data.userID, data.userName, data.userAds);
    }

  }, [login]);

  return {login, logout, token, userId, userName, userAds}
}