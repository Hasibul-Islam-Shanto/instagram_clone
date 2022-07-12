import axios from "axios";
import React, { useState } from "react";
import { CreatePost } from "../../Api/Api";
import { AiOutlineClose } from "react-icons/ai";

const PostModal = ({ open, setOpen, fetchData }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState();

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
      setImage(imgData.data.url.toString());
    } else {
      alert("Use a valid image.");
    }
  };

  const addPost = async () => {
    await CreatePost({ content, image });
    fetchData();
  };

  return (
    <>
      {open && localStorage.getItem("jwtoken") && (
        <div className="h-screen fixed z-40  w-full flex items-center justify-center bg-gray-400 bg-opacity-80">
          <AiOutlineClose
            onClick={() => setOpen(!open)}
            className="absolute top-10 right-6 font-extrabold text-4xl text-white cursor-pointer"
          />
          <div className="flex flex-col px-3 py-4 bg-white rounded-lg w-3/12 z-50">
            <textarea
              name=""
              rows="3"
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="outline-none border-[1px] border-[#eeee] py-2 px-3 text-lg mt-3"
            ></textarea>
            <input
              type="file"
              onChange={(e) => uploadImage(e.target.files[0])}
              className="outline-none border-[3px] border-[#eeee] py-1 px-2 text-lg mt-5 opacity-60"
            />
            <button
              onClick={() => {
                addPost();
                setOpen(!open);
              }}
              className="w-full bg-[#51557E] p-2 font-bold text-lg text-white rounded-lg mt-5"
            >
              Post
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PostModal;
