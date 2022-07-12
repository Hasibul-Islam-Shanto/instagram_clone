import axios from "axios";

const BASE_URL = "http://localhost:5000/api";
const API = axios.create({ baseURL: BASE_URL });

API.interceptors.request.use(async (req) => {
  // console.log({ BASE_URL });
  if (localStorage.getItem("jwtoken")) {
    let token = localStorage.getItem("jwtoken");
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const SignupUser = async (data) => {
  const res = await API.post("/user/signup", data);
  return res;
};
export const SigninUser = async (data) => {
  const res = await API.post("/user/signin", data);
  return res;
};
export const AllUsers = async () => {
  const res = await API.get("/user/allusers");
  return res;
};
export const SingleUserProfile = async (id) => {
  const res = await API.get(`/user/singleprofile/${id}`);
  return res;
};
export const FollowUser = async (id) => {
  const res = await API.put(`/user/follow/${id}`);
  return res;
};
export const UnFollowUser = async (id) => {
  const res = await API.put(`/user/unfollow/${id}`);
  return res;
};
export const CreatePost = async (data) => {
  const res = await API.post("/post/createpost", data);
  return res;
};
export const GetPost = async () => {
  const res = await API.get("/post/allpost");
  return res;
};
export const CommentPost = async (data) => {
  const res = await API.put("/post/comment", data);
  return res;
};
export const LikePost = async (data) => {
  const res = await API.put("/post/like", data);
  return res;
};
export const DeletePost = async (id) => {
  const res = await API.delete(`/post/deletepost/${id}`);
  return res;
};

export const OwnProfile = async () => {
  const res = await API.get("/user/ownprofile");
  return res;
};

export const MyPost = async () => {
  const res = await API.get("/post/myposts");
  return res;
};
export const ChangePhoto = async (data) => {
  const res = await API.put("/user/update", data);
  return res;
};
