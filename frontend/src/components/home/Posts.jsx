import React, { useEffect, useState } from "react";
import { CommentPost, LikePost, DeletePost } from "../../Api/Api";
import { AiFillDelete } from "react-icons/ai";

const Posts = ({ posts, fetchData }) => {
  const [text, setText] = useState();
  const addCmnt = async (postId) => {
    const res = await CommentPost({ text, postId });
    console.log(res);
    setText("");
    fetchData();
  };
  const Like = async (postId) => {
    await LikePost({ postId });
    fetchData();
  };
  const deletePost = async (id) => {
    const res = await DeletePost(id);
    console.log(res);
    fetchData();
  };
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  useEffect(() => {}, []);
  return (
    <>
      <div className=" flex flex-col absolute top-10 lg:left-72 md:left-5 left-0 pb-10">
        {posts.length > 0 &&
          posts.map((post) => (
            <div
              key={post._id}
              className="flex w-[500px] bg-white shadow-md rounded-lg mt-10 mx-2 md:mx-auto max-w-md md:max-w-2xl "
            >
              <div className="flex items-start px-3 py-4">
                <img
                  className="w-12 h-12 rounded-full object-cover shadow"
                  src={post.postedBy.photo}
                  alt="avatar"
                />
                <div className="">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900 ml-3">
                      {post.postedBy.username}
                    </h2>
                    {loggedUser._id === post.postedBy._id && (
                      <AiFillDelete
                        onClick={() => deletePost(post._id)}
                        className="text-2xl cursor-pointer text-[#495C83]"
                      />
                    )}
                  </div>
                  <p className="mt-3 p-2 text-gray-700 text-sm">
                    {post.content}
                  </p>
                  <img src={post.photo} alt="" className="h-80 w-96" />
                  <div className="flex flex-col">
                    <div className="mt-4 flex items-center">
                      <div
                        onClick={() => Like(post._id)}
                        className="flex mr-2 text-gray-700 text-sm md:mr-3 cursor-pointer"
                      >
                        <svg
                          fill="none"
                          viewBox="0 0 24 24"
                          className="w-5 h-5 mr-1"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                        <span className="font-bold text-md">
                          {post.likes.length}
                        </span>
                      </div>
                      <div className="flex mr-2 text-gray-700 text-sm md:mr-8">
                        <svg
                          fill="none"
                          viewBox="0 0 24 24"
                          className="w-5 h-5 mr-1"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                          />
                        </svg>
                        <span className="font-bold text-md">
                          {post.comments.length}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 w-full">
                      {post.comments.length > 0 &&
                        post.comments.map((comment) => (
                          <div className="flex p-1" key={comment._id}>
                            <span className="font-bold text-blue-900">
                              {comment.postedBy.username}
                            </span>
                            <p className="ml-3">{comment.text}</p>
                          </div>
                        ))}
                    </div>
                    <div className="flex">
                      <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="comments"
                        className="outline-none py-1 px-4 text-md rounded-md border-b-[.2px] w-full focus:border-b-[1px] mt-4"
                      />
                      <button
                        onClick={() => addCmnt(post._id)}
                        className="bg-[#51557E] px-2 font-bold text-white rounded-lg"
                      >
                        comment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Posts;
