import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  UilScenery,
  UilPlayCircle,
  UilTimes,
  UilEmoji,
} from "@iconscout/react-unicons";
import "./PostShare.css";
import CreatePostAction from "../../../REDUX/Action/Post/CreatePostAction.js";
import GetProfilePicture from "../../../Utils/Image/GetProfilePicture.js";

function PostShare() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.AuthReducer.authData);
  const loading = useSelector((state) => state.PostReducer.uploading);
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);

  // useRef for getting description's value
  const desc = useRef();
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
      setVideo(null);
    }
    if (emojiPickerVisible) {
      emojiPickerHandle();
    }
  };
  const onVideoChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setVideo(img);
      setImage(null);
    }
    emojiPickerHandle();
  };
  const imageRef = useRef();
  const videoRef = useRef();

  const handleUpload = async (event) => {
    event.preventDefault();
    if (emojiPickerVisible) {
      emojiPickerHandle();
    }

    let imageData = null;
    let videoData = null;
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (image) {
      imageData = new FormData();
      // creating a file name based on date and image name
      const fileName = await (Date.now() + image.name);
      imageData.append("name", fileName);
      imageData.append("file", image);
      newPost.image = await fileName;
    }
    if (video) {
      videoData = new FormData();
      // creating a file name based on date and image name
      const fileName = await (Date.now() + video.name);
      videoData.append("name", fileName);
      videoData.append("file", video);
      newPost.video = await fileName;
    }
    // create a new post
    dispatch(CreatePostAction(newPost, user._id, imageData, videoData, "post"));
    resetShare();
  };
  const resetShare = () => {
    setImage(null);
    setVideo(null);
    desc.current.value = "";
  };

  const emojiPickerHandle = () => {
    setEmojiPickerVisible((emojiPickerVisible) => !emojiPickerVisible);
  };

  const emojiPick = (e) => {
    const emoji = e.target.textContent;
    desc.current.value += emoji;
  };
  return (
    <div className="postShare">
      <img src={GetProfilePicture(user)} alt="" />
      <div>
        <input
          type="textarea"
          placeholder="What's going on? &#127773;"
          ref={desc}
          required
        />

        <div className="postOptions">
          <div className="option" onClick={() => imageRef.current.click()}>
            <UilScenery />
            Photo
          </div>
          <div className="option" onClick={() => videoRef.current.click()}>
            <UilPlayCircle />
            Video
          </div>
          <div className="emoji-pick">
            <UilEmoji onClick={emojiPickerHandle} />
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
        {emojiPickerVisible && (
          <div>
            <ul className="emoji-list">
              <li className="emoji" onClick={emojiPick}>
                &#128522;
              </li>
              <li className="emoji" onClick={emojiPick}>
                &#128514;
              </li>
              <li className="emoji" onClick={emojiPick}>
                &#129315;
              </li>
              <li className="emoji" onClick={emojiPick}>
                &#128523;
              </li>
              <li className="emoji" onClick={emojiPick}>
                &#128525;
              </li>
              <li className="emoji" onClick={emojiPick}>
                &#128536;
              </li>
              <li className="emoji" onClick={emojiPick}>
                &#129392;
              </li>
              <li className="emoji" onClick={emojiPick}>
                &#128591;
              </li>
              <li className="emoji" onClick={emojiPick}>
                &#128557;
              </li>
            </ul>
          </div>
        )}
        {image && (
          <div className="previewImage">
            <UilTimes className="close-button" onClick={resetShare} />
            <img src={URL.createObjectURL(image)} alt="preview" />
          </div>
        )}
        {video && (
          <div className="previewImage">
            <UilTimes className="close-button" onClick={resetShare} />
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
