const UploadImageController = async (err, req, res, next) => {
  if (err) {
    return res.status(500).json(err);
  }
  return res.status(200).json("File uploded successfully.");
};

export default UploadImageController;
