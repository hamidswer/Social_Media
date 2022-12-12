import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  UilScenery,
  UilPlayCircle,
  UilTimes,
  UilEmoji,
} from "@iconscout/react-unicons";
import "./EditPost.css";
import CreatePostAction from "../../../REDUX/Action/Post/CreatePostAction.js";
import GetProfilePicture from "../../../Utils/Image/GetProfilePicture.js";
import PostRequest from "../../../Api/Post/PostRequest.js";
function EditPost({ postId }) {
  const [post, setPost] = useState(null);
  const serverImage = process.env.REACT_APP_IMAGE_PUBLIC_FOLDER;
  useEffect(() => {
    const getPost = async () => {
      const editReqPost = await PostRequest(postId);
      setPost(editReqPost);
    };
    getPost();
  }, []);
  const [tempImage, setTempImage] = useState();
  const [tempVideo, setTempVideo] = useState();
  useEffect(() => {
    desc.current.value = post?.desc;
    if (post && post.image) {
      setTempImage(serverImage + "/" + user._id + "/" + post.image);
    }
    if (post && post.video) {
      setTempVideo(serverImage + "/" + user._id + "/" + post.video);
    }
  }, [post]);
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
    }
    setVideo(null);
    setTempImage(null);
    setTempVideo(null);
    if (emojiPickerVisible) {
      emojiPickerHandle();
    }
  };
  const onVideoChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setVideo(img);
    }
    setImage(null);
    setTempImage(null);
    setTempVideo(null);
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
      setVideo(null);
      setTempImage(null);
      setTempVideo(null);
      imageData = new FormData();
      // creating a file name based on date and image name
      const fileName = await (Date.now() + image.name);
      imageData.append("name", fileName);
      imageData.append("file", image);
      newPost.image = await fileName;
    }
    if (video) {
      setImage(null);
      setTempImage(null);
      setTempVideo(null);
      videoData = new FormData();
      // creating a file name based on date and image name
      const fileName = await (Date.now() + video.name);
      videoData.append("name", fileName);
      videoData.append("file", video);
      newPost.video = await fileName;
    }

    dispatch(
      CreatePostAction(newPost, user._id, imageData, videoData, "post", postId)
    ).then(
      (res) =>
        (window.location.href = `http://localhost:3000/profile/${user._id}`)
    );
    resetShare();
  };
  const resetShare = () => {
    setImage(null);
    setVideo(null);
    desc.current.value = "";
    setTempImage(null);
    setTempVideo(null);
  };

  const imageNull = () => {
    setImage(null);
  };
  const tempImageNull = () => {
    setTempImage(null);
  };
  const videoNull = () => {
    setVideo(null);
  };
  const tempVideoNull = () => {
    setTempVideo(null);
  };
  const emojiPickerHandle = () => {
    setEmojiPickerVisible((emojiPickerVisible) => !emojiPickerVisible);
  };

  const emojiPick = (e) => {
    const emoji = e.target.textContent;
    desc.current.value += emoji;
  };
  return (
    <div className="EditPost">
      <img src={GetProfilePicture(user)} alt="" />
      <div>
        <input
          type="textarea"
          placeholder="Do you want to edit it? &#127773;"
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
            <UilTimes className="close-button" onClick={imageNull} />
            <img src={URL.createObjectURL(image)} alt="preview" />
          </div>
        )}
        {tempImage && (
          <div className="previewImage">
            <UilTimes className="close-button" onClick={tempImageNull} />
            <img src={tempImage} alt="preview" />
          </div>
        )}
        {video && (
          <div className="previewImage">
            <UilTimes className="close-button" onClick={videoNull} />
            <video className="postImage" alt="" controls>
              <source src={URL.createObjectURL(video)} type="video/mp4" />
            </video>
          </div>
        )}
        {tempVideo && (
          <div className="previewImage">
            <UilTimes className="close-button" onClick={tempVideoNull} />
            <video className="postImage" alt="" controls>
              <source src={tempVideo} type="video/mp4" />
            </video>
          </div>
        )}
      </div>
    </div>
  );
}

export default EditPost;
