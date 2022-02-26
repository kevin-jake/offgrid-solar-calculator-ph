import { useState, useCallback, useEffect } from "react";

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(false);
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [role, setRole] = useState();

  const login = useCallback((uid, token, email, name, role, expirationDate) => {
    setToken(token);
    setUserId(uid);
    setEmail(email);
    setName(name);
    setRole(role);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        email: email,
        name: name,
        role: role,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
    // eslint-disable-next-line
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    setEmail(null);
    setName(null);
    setRole(null);
    localStorage.removeItem("userData");
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
    // eslint-disable-next-line
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        storedData.email,
        storedData.name,
        storedData.role,
        new Date(storedData.expiration)
      );
    }
    // eslint-disable-next-line
  }, [login]);

  return { token, login, logout, userId, name, email, role };
};
