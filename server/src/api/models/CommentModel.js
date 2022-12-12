import mongoose from "mongoose";

const CommentSchema = mongoose.Schema(
  {
    desc: String,
    likes: [],
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "Posts" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  }
);

const CommentModel = mongoose.model("Comments", CommentSchema);
export default CommentModel;
