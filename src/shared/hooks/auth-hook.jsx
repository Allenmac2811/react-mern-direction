import React, { useCallback, useState, useEffect } from "react";

let logoutTimer;
export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [tokenExpirationDateState, setToknExpirationDateState] = useState();
  const [userId, setUserId] = useState();

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    const tokenExperitionDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setToknExpirationDateState(tokenExperitionDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExperitionDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setToknExpirationDateState(null);
    setUserId(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDateState) {
      const remainingTime =
        tokenExpirationDateState.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDateState]);

  useEffect(() => {
    const storeddata = JSON.parse(localStorage.getItem("userData"));
    if (
      storeddata &&
      storeddata.token &&
      new Date(storeddata.expiration) > new Date()
    ) {
      login(
        storeddata.userId,
        storeddata.token,
        new Date(storeddata.expiration)
      );
    }
  }, [login]);

  return { token, login, logout, userId };
};
