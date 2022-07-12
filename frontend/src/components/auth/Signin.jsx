import React, { useState, useContext } from "react";
import logo from "./instagram.png";
import { Link, useNavigate } from "react-router-dom";
import { SigninUser } from "../../Api/Api";
import { userContext } from "../../context/userProvider";

const Signin = () => {
  const { setLoginUser } = useContext(userContext);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const LoginUser = async () => {
    const res = await SigninUser(user);

    setLoginUser(res.data.existUser);
    const token = res.data.token;

    localStorage.setItem("jwtoken", token);
    localStorage.setItem("loggedUser", JSON.stringify(res.data.existUser));
    if (res.status === 200) {
      navigate("/");
    }
  };
  return (
    <>
      <div className="min-w-[380px] h-auto mt-52 flex flex-col items-center py-8 px-5 shadow-lg rounded-lg border-t-8 border-[#51557E]">
        <img src={logo} alt="" className="h-20 w-20 " />
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={user.email}
          onChange={handleChange}
          className="outline-none py-2 px-4 text-lg rounded-md border-[.2px] w-full focus:outline-[#eeee] focus:border-none mt-4 focus:shadow-sm"
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          className="outline-none py-2 px-4 text-lg rounded-md border-[.2px] mt-4 w-full focus:outline-[#eeee] focus:border-none focus:shadow-sm"
        />
        <div className="flex mt-3">
          <p>Don't have accout?</p>
          <Link to="/signup" className="underline ml-2 font-bold text-blue-800">
            SignUp
          </Link>
        </div>
        <button
          onClick={LoginUser}
          className="text-lg font-bold text-white bg-[#51557E] mt-4 py-2 px-3  rounded-lg cursor-pointer"
        >
          Signin
        </button>
      </div>
    </>
  );
};

export default Signin;
