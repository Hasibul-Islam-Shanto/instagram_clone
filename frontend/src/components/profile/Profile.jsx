/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../home/Navbar";
import { userContext } from "../../context/userProvider";
import { OwnProfile, MyPost, ChangePhoto } from "../../Api/Api";

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [myPost, setMyPosts] = useState([]);
  const { setLoginUser } = useContext(userContext);

  const fetchProfile = async () => {
    const res = await OwnProfile();
    const res1 = await MyPost();
    setMyPosts(res1.data.mypost);
    setProfile(res.data.ownProfile);
    setLoginUser(res.data.ownProfile);
  };

  // uploading image in cloudinary..
  const uploadImage = async (pic) => {
    if (pic === undefined) {
      alert("Please use a valid image");
      return;
    }
    if (pic.type === "image/jpeg" || pic.type === "image/png") {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "instagram_clone");
      data.append("cloud_name", "shanto78");
      const imgData = await axios.post(
        "https://api.cloudinary.com/v1_1/shanto78/image/upload",
        data
      );
      await ChangePhoto({ photo: imgData.data.url.toString() });
      fetchProfile();
    } else {
      alert("Use a valid image.");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("jwtoken");
    if (!token) {
      navigate("/signin");
    }
    fetchProfile();
  }, [navigate]);
  return (
    <>
      <Navbar />
      {/* profile details.... */}

      <div className="w-full flex flex-col justify-center items-center ">
        <div className="mt-32 p-2 flex justify-around lg:w-[40%] md:w-[60%] w-[90%]">
          <div className="flex flex-col pb-2">
            <img
              src={profile.photo}
              alt=""
              className="h-44 w-44 rounded-full mb-3"
            />
            <div className="flex items-center justify-center mt-2">
              <label className=" flex justify-center items-center px-2 py-1 bg-[#51557E]  text-white font-bold rounded-lg shadow-lg tracking-wide border border-blue cursor-pointer hover:bg-blue hover:text-white">
                <span className=" text-base leading-normal">Change photo</span>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => uploadImage(e.target.files[0])}
                />
              </label>
            </div>
          </div>
          <div className="flex flex-col p-2">
            <div className="flex justify-between">
              <span className="text-2xl font-bold">{profile.username}</span>
            </div>
            <div className="flex space-x-4 mt-5">
              <span className="text-lg font-bold">{myPost.length} posts</span>
              <span className="text-lg font-bold">
                {profile.followers && profile.followers.length} followers
              </span>
              <span className="text-lg font-bold">
                {profile.following && profile.following.length} followings
              </span>
            </div>
          </div>
        </div>

        {/* post images..... */}

        <div className="md:w-[90%] lg:w-[80%] p-4 w-full grid grid-cols-3 gap-10 border-t-2 ">
          {myPost &&
            myPost.map((post) => (
              <img
                key={post._id}
                src={post.photo}
                alt=""
                className="h-60 w-96"
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default Profile;
