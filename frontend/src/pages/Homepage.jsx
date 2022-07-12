import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/home/Navbar";
import PostModal from "../components/home/PostModal";
import Posts from "../components/home/Posts";
import { GetPost } from "../Api/Api.js";
import Allusers from "../components/home/Allusers";

const Homepage = () => {
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    const { data } = await GetPost();
    setPosts(data.posts);
    console.log(data.posts);
  };
  useEffect(() => {
    const token = localStorage.getItem("jwtoken");
    if (!token) {
      navigate("/signin");
    }
    fetchData();
  }, [navigate]);
  return (
    <>
      <Navbar open={open} setOpen={setOpen} />
      <Posts posts={posts} fetchData={fetchData} />
      <Allusers />
      <PostModal open={open} setOpen={setOpen} fetchData={fetchData} />
    </>
  );
};

export default Homepage;
