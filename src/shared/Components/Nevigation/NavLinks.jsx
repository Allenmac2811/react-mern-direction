import React, { useContext } from "react";

import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

import "./NavLinks.css";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);
  //{console.log(props)}
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          ALL USERS
        </NavLink>
      </li>
      {auth.isLogin && (
        <li>
          <NavLink to={`/${auth.userId}/places`}>MY PLACES</NavLink>
        </li>
      )}
      {auth.isLogin && (
        <li>
          <NavLink to="/places/new">ADD PLACES</NavLink>
        </li>
      )}
      {!auth.isLogin && (
        <li>
          <NavLink to="/auth">LOGIN</NavLink>
        </li>
      )}
      {auth.isLogin && (
        <li>
          <button onClick={auth.logout}>LOGOUT</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
