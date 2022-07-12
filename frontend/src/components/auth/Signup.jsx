import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./instagram.png";
import { SignupUser } from "../../Api/Api";

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const AddUser = async () => {
    const res = await SignupUser(user);
    if (res.status === 200) {
      navigate("/signin");
    } else {
      console.log(res);
    }
  };
  return (
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
        type="text"
        placeholder="username"
        name="username"
        value={user.username}
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
      <button
        onClick={AddUser}
        className="text-lg font-bold text-white bg-[#51557E] mt-4 py-2 px-3  rounded-lg cursor-pointer"
      >
        Signup
      </button>
    </div>
  );
};

export default Signup;
