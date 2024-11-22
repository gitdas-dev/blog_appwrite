import React, { useState } from "react";
import { useDispatch } from "react-redux";
import authService from "../../Appwrite/Auth";
import { logout } from "../../store/authSlice";
import { AiOutlineLoading } from "react-icons/ai";

function LogoutButton() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    setLoading(true);
    authService.logout().then(() => {
      dispatch(logout());
    });
    setLoading(false);
  };

  return (
    <button
      onClick={logoutHandler}
      className="inline-block px-4 py-2 duration-200 hover:bg-red-400 bg-red-600 rounded-full text-sm md:text-md lg:text-md"
    >
      {loading ? (
        <AiOutlineLoading className="h-7 w-7 animate-spin text-center flex justify-center" />
      ) : (
        "Login"
      )}
    </button>
  );
}

export default LogoutButton;
