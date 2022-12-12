const Image1080 = (image) => {
  const imageName = image.split(".")[0];
  const imageFormat = image.split(".")[1];
  const imageName1080 = imageName + "-1080." + imageFormat;
  return imageName1080;
};
export default Image1080;
