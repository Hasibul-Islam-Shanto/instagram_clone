import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import logo from "./logo_name.png";
import {
  AiOutlineHome,
  AiOutlinePlusSquare,
  AiOutlineSearch,
  AiOutlineBars,
} from "react-icons/ai";
import { userContext } from "../../context/userProvider";

const Navbar = ({ open, setOpen }) => {
  const [click, setClick] = useState(false);
  const { loginUser } = useContext(userContext);
  const logout = () => {
    localStorage.removeItem("jwtoken");
    window.location.reload();
  };
  return (
    <>
      <div className="fixed bg-white z-30 w-full flex justify-around items-center p-3 shadow-sm">
        <div>
          <Link to="/">
            <img src={logo} alt="" className="bg-transparent h-10 w-30" />
          </Link>
        </div>
        <div className="md:w-56 px-2 bg-[#eeee] flex items-center border-[1px] border-gray-300 rounded-md focus:border-none focus:outline-[#eeee] focus:shadow-lg">
          <AiOutlineSearch />
          <input
            type="text"
            placeholder="Search...."
            className="w-full bg-[#eeee] outline-none border-none text-md py-1 px-3"
          />
        </div>
        <AiOutlineBars className="block lg:hidden text-2xl font-bold ml-3 cursor-pointer" />
        <div className="lg:flex items-center justify-between space-x-10 hidden">
          <Link to="/">
            <AiOutlineHome className="text-2xl" />
          </Link>
          <Link to="#">
            <AiOutlinePlusSquare
              onClick={() => setOpen(!open)}
              className="text-2xl"
            />
          </Link>
          {!localStorage.getItem("jwtoken") && (
            <>
              <Link to="/signin">
                <span className="text-xl font-bold">Signin</span>
              </Link>
              <Link to="/signup">
                <span className="text-xl font-bold">Signup</span>
              </Link>
            </>
          )}

          <Link to="#" className="flex" onClick={() => setClick(!click)}>
            <span className="text-black text-lg font-bold">
              {loginUser.username}
            </span>
            <img
              className="w-8 h-8 rounded-full ml-3"
              src={loginUser.photo}
              alt=""
            />
          </Link>
          {click && (
            <div className="flex flex-col absolute top-16 right-36 shadow-md p-3 rounded-lg">
              <Link
                to="/profile"
                className="p-2 font-bold text-lg hover:bg-[#eeee]"
              >
                Profile
              </Link>
              <span
                onClick={logout}
                className="p-2 font-bold text-lg hover:bg-[#eeee] cursor-pointer"
              >
                Logout
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
