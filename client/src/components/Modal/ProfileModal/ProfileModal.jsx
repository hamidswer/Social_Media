import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, useMantineTheme } from "@mantine/core";
import "./ProfileModal.css";
import UploadImageAction from "../../../REDUX/Action/Post/UploadImageAction.js";
import UpdateUserAction from "../../../REDUX/Action/User/UpdateUserAction.js";

function ProfileModal({ modalOpaned, setModalOpaned, data }) {
  const theme = useMantineTheme();
  const { user } = useSelector((state) => state.AuthReducer.authData);
  const { password, ...other } = data;
  const [formData, setFormData] = useState(other);
  const [profilePicture, setProfilePicture] = useState(null);
  const [coverPicture, setCoverPicture] = useState(null);
  const dispatch = useDispatch();
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let image = event.target.files[0];
      event.target.name === "profilePicture"
        ? setProfilePicture(image)
        : setCoverPicture(image);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    let userData = formData;
    if (profilePicture) {
      const data = new FormData();
      const fileName = Date.now() + profilePicture.name;
      data.append("name", fileName);
      data.append("file", profilePicture);
      userData.profilePicture = fileName;
      try {
        dispatch(UploadImageAction(data, "profile", user._id));
      } catch (error) {
        console.log(error);
      }
    }
    if (coverPicture) {
      const data = new FormData();
      const fileName = Date.now() + coverPicture.name;
      data.append("name", fileName);
      data.append("file", coverPicture);
      userData.coverPicture = fileName;
      try {
        dispatch(UploadImageAction(data, "cover", user._id));
      } catch (error) {
        console.log(error);
      }
    }
    dispatch(UpdateUserAction(user._id, userData));
    setModalOpaned(false);
  };
  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modalOpaned}
      onClose={() => setModalOpaned(false)}
    >
      <form className="infoForm">
        <h3>Your information</h3>
        <div>
          <input
            type="text"
            className="infoInput"
            name="firstname"
            placeholder="First name"
            onChange={handleChange}
            value={formData.firstname}
          />
          <input
            type="text"
            className="infoInput"
            name="lastname"
            placeholder="Last name"
            onChange={handleChange}
            value={formData.lastname}
          />
        </div>
        <div>
          <input
            type="text"
            className="infoInput"
            name="worksAt"
            placeholder="Works at"
            onChange={handleChange}
            value={formData.worksAt}
          />
        </div>
        <div>
          <input
            type="text"
            className="infoInput"
            name="livesIn"
            placeholder="Lives in"
            onChange={handleChange}
            value={formData.livesIn}
          />
          <input
            type="text"
            className="infoInput"
            name="country"
            placeholder="Country"
            onChange={handleChange}
            value={formData.country}
          />
        </div>
        <div>
          <input
            type="text"
            className="infoInput"
            name="relationship"
            placeholder="Relationship Status"
            onChange={handleChange}
          />
        </div>
        <div className="image-containers">
          <input
            type="file"
            name="profilePicture"
            onChange={onImageChange}
            className="image-file-input profile-file-input"
          />
          <input
            type="file"
            name="coverPicture"
            onChange={onImageChange}
            className="image-file-input cover-file-input"
          />
        </div>
        <button className="button infoButton" onClick={handleSubmit}>
          Update
        </button>
      </form>
    </Modal>
  );
}

export default ProfileModal;
