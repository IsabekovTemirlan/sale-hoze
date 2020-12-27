import {useState, useCallback, useEffect} from 'react';

const storageName = "userData";

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userAds, setUserAds] = useState(null);
  const [userType, setUserType] = useState(null);

  const login = useCallback((jwtToken, id, name, ads, type) => {
    setToken(jwtToken);
    setUserId(id);
    setUserName(name);
    setUserAds(ads);
    setUserType(type);

    localStorage.setItem(storageName, JSON.stringify({userID: id, userName: name, token: jwtToken, userAds: ads, userType: type}));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setUserName(null);
    setUserAds(null);
    setUserType(null);

    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));

    if (data && data.token) {
      login(data.token, data.userID, data.userName, data.userAds, data.userType);
    }

  }, [login]);

  return {login, logout, token, userId, userName, userAds, userType}
}