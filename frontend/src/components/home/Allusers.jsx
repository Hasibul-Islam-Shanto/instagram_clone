import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AllUsers } from "../../Api/Api";

const Allusers = () => {
  const [allusers, setAllusers] = useState([]);
  const fetchAll = async () => {
    const res = await AllUsers();
    setAllusers(res.data.users);
    console.log(res);
  };

  useEffect(() => {
    fetchAll();
  }, []);
  return (
    <>
      <div className=" h-[80vh] lg:flex flex-col fixed lg:right-64 md:right-5 hidden top-20 py-3 px-5 overflow-y-scroll">
        {allusers.length > 0 &&
          allusers.map((user) => (
            <Link
              key={user._id}
              to={`/userprofile/${user._id}`}
              className="flex p-2 hover:bg-gray-400 hover:rounded-lg mt-2 border-b-[2px] border-gray-300"
            >
              <img
                className="w-14 h-14 rounded-full ml-3"
                src={user.photo}
                alt=""
              />
              <span className="text-black text-lg font-bold ml-2 mt-2">
                {user.username}
              </span>
            </Link>
          ))}
      </div>
    </>
  );
};

export default Allusers;
