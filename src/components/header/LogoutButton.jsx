import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../Appwrite/Auth";
import { logout } from "../../store/authSlice";

function LogoutButton() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };

  return (
    <button onClick={logoutHandler} className="inline-block px-1 py-1 duration-200 hover:bg-blue-100 rounded-full text-sm md:text-lg lg:text-xl">
      Logout
    </button>
  );
}

export default LogoutButton;
