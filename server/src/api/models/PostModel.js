import mongoose from "mongoose";

const PostSchema = mongoose.Schema(
  {
    desc: String,
    likes: [],
    image: String,
    video: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

const PostModel = mongoose.model("Posts", PostSchema);
export default PostModel;
