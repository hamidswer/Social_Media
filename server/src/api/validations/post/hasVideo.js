const hasVideo = (data) => {
  if (data.video === undefined) {
    return false;
  } else {
    return true;
  }
};
export default hasVideo;
