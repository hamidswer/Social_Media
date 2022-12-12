function GetProfilePicture(user) {
  const defaultPublic = process.env.REACT_APP_IMAGE_PUBLIC_FOLDER;
  const serverPublic =
    process.env.REACT_APP_IMAGE_PUBLIC_FOLDER + user?._id + "/";
  if (!user.profilePicture) {
    return defaultPublic + "default/profilePicture.png";
  }
  return serverPublic + user.profilePicture;
}
export default GetProfilePicture;
