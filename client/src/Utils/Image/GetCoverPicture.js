function GetCoverPicture(user) {
  const defaultPublic = process.env.REACT_APP_IMAGE_PUBLIC_FOLDER;
  const serverPublic =
    process.env.REACT_APP_IMAGE_PUBLIC_FOLDER + user?._id + "/";
  if (!user.coverPicture) {
    return defaultPublic + "default/cover.jpg";
  }
  return serverPublic + user.coverPicture;
}
export default GetCoverPicture;
