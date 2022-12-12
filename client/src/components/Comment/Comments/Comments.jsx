import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CommentsRequest from "../../../Api/Comment/CommentsRequest.js";
import Comment from "../Comment/Comment";
function Comments({ postId }) {
  const { commentsCounter } = useSelector((state) => state.CommentReducer);
  const [comments, setComments] = useState(null);
  useEffect(() => {
    const getComments = async () => {
      const comments = await CommentsRequest(postId, 0, 9);
      setComments(comments);
    };
    getComments();
  }, [commentsCounter]);
  return (
    <div>
      {comments &&
        comments.length > 0 &&
        comments.map((comment) => <Comment data={comment} key={comment._id} />)}
    </div>
  );
}

export default Comments;
