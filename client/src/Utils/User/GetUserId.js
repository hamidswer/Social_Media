const GetUserId = (UID) => {
  if (UID._id) {
    return UID._id;
  } else {
    return UID;
  }
};
export default GetUserId;
