/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SingleUserProfile, FollowUser, UnFollowUser } from "../Api/Api";
import Navbar from "../components/home/Navbar";

const UserProfile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState({});
  const [myPost, setMyPosts] = useState([]);
  const [loggedUser, setLoggedUser] = useState({});
  // const [thisUser, setThisUser] = useState({})

  const fetchSingUser = async () => {
    const res = await SingleUserProfile(id);
    setMyPosts(res.data.post);
    setProfile(res.data.user);
    // console.log(res.data.user.followers)
    localStorage.setItem("otherUser", JSON.stringify(res.data.user));

    setLoggedUser(JSON.parse(localStorage.getItem("loggedUser")));
    // setThisUser(JSON.parse(localStorage.getItem("otherUser")))
  };
  const followUser = async (id) => {
    const res = await FollowUser(id);
    console.log(res);
    fetchSingUser();
  };
  const unfollowUser = async (id) => {
    const res = await UnFollowUser(id);
    console.log(res);
    fetchSingUser();
  };
  useEffect(() => {
    fetchSingUser();
  }, [id]);
  console.log(profile.followers);
  return (
    <>
      <Navbar />
      <div className="w-full flex flex-col justify-center items-center ">
        <div className="mt-32 p-2 flex justify-around lg:w-[40%] md:w-[60%] w-[90%]">
          <div className="flex flex-col pb-2">
            <img
              src={profile.photo}
              alt=""
              className="h-44 w-44 rounded-full mb-3"
            />
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
            {profile.followers && profile.followers.includes(loggedUser._id) ? (
              <button
                onClick={() => unfollowUser(profile._id)}
                className="p-3 font-bold text-white text-lg rounded-lg mt-3 bg-[#51557E]"
              >
                Unfollow
              </button>
            ) : (
              <button
                onClick={() => followUser(profile._id)}
                className="p-3 font-bold text-white text-lg rounded-lg mt-3 bg-[#51557E]"
              >
                Follow
              </button>
            )}
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

export default UserProfile;
