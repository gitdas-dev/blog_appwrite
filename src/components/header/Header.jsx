import React from "react";
import { Logo, LogoutButton } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function Header() {
  const authStatus = useSelector((state) => state?.auth?.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "HOME",
      slug: "/",
      active: true,
    },
    {
      name: "LOGIN",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "SIGNUP",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "ALL POSTS",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "ADD POST",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <div className="py-2 md:px-5 px-2 shadow bg-gray-500 font-mono flex items-center rounded-lg">
      <div className="sm:mr-4">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <ul className="flex ml-auto sm:mt-2 gap-1 md:gap-5 items-center sm:bg-gray-700 sm:rounded-xl my-2">
        {navItems.map((item) =>
          item.active ? (
            <li key={item.name}>
              <button
                onClick={() => navigate(item.slug)}
                className="inline-block px-0 sm:px-4 py-2 duration-500 sm:hover:bg-blue-800 rounded-full text-xs sm:text-sm text-white md:text-md lg:text-md xl:text-md m-3"
              >
                {item.name}
              </button>
            </li>
          ) : null
        )}

        {authStatus && (
          <Popover>
            <PopoverTrigger>
              <img src="/dp.png" className="m-4 max-w-[50px]" />
            </PopoverTrigger>
            <PopoverContent className="bg-slate-800 text-white h-14 w-48 mr-8 font-bold flex items-center">
              <LogoutButton />
            </PopoverContent>
          </Popover>
        )}
      </ul>
    </div>
  );
}

export default Header;
