import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UilScenery, UilPlayCircle, UilTimes } from "@iconscout/react-unicons";
import "./PostShare.css";
import UploadImageAction from "../../../REDUX/Action/Post/UploadImageAction.js";
import UploadPostAction from "../../../REDUX/Action/Post/UploadPostAction.js";
import UploadVideoAction from "../../../REDUX/Action/Post/UploadVideoAction.js";

function PostShare() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.AuthReducer.authData);
  const loading = useSelector((state) => state.PostReducer.uploading);
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);

  // useRef for getting description's value
  const desc = useRef();
  const serverPublic =
    process.env.REACT_APP_IMAGE_PUBLIC_FOLDER + user._id + "/";
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };
  const onVideoChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setVideo(img);
    }
  };
  const imageRef = useRef();
  const videoRef = useRef();

  const handleUpload = (event) => {
    event.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (image) {
      const data = new FormData();
      // creating a file name based on date and image name
      const fileName = Date.now() + image.name;
      data.append("name", fileName);
      data.append("file", image);
      newPost.image = fileName;
      try {
        dispatch(UploadImageAction(data, "post", user._id));
      } catch (error) {
        console.log(error);
      }
    }
    if (video) {
      const data = new FormData();
      // creating a file name based on date and image name
      const fileName = Date.now() + video.name;
      data.append("name", fileName);
      data.append("file", video);
      newPost.video = fileName;
      try {
        dispatch(UploadVideoAction(data));
      } catch (error) {
        console.log(error);
      }
    }
    // uploading a new post
    dispatch(UploadPostAction(newPost));
    resetShare();
  };
  const resetShare = () => {
    setImage(null);
    setVideo(null);
    desc.current.value = "";
  };
  return (
    <div className="postShare">
      <img src={serverPublic + user.profilePicture} alt="" />
      <div>
        <input type="text" placeholder="What's going on?" ref={desc} required />
        <div className="postOptions">
          <div className="option" onClick={() => imageRef.current.click()}>
            <UilScenery />
            Photo
          </div>
          <div className="option" onClick={() => videoRef.current.click()}>
            <UilPlayCircle />
            Video
          </div>
          <button
            className="button shareButton share-option"
            onClick={handleUpload}
            disabled={loading}
          >
            {loading ? "Uploading" : "Share"}
          </button>

          <div style={{ display: "none" }}>
            <input
              type="file"
              name="image"
              ref={imageRef}
              onInput={onImageChange}
            />
            <input
              type="file"
              name="video"
              ref={videoRef}
              onInput={onVideoChange}
            />
          </div>
        </div>
        {image && (
          <div className="previewImage">
            <UilTimes onClick={resetShare} />
            <img src={URL.createObjectURL(image)} alt="preview" />
          </div>
        )}
        {video && (
          <div className="previewImage">
            <UilTimes onClick={resetShare} />
            <video className="postImage" alt="" controls>
              <source src={URL.createObjectURL(video)} type="video/mp4" />
            </video>
          </div>
        )}
      </div>
    </div>
  );
}

export default PostShare;
