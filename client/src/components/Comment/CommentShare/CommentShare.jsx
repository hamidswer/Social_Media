import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./CommentShare.css";
import CommentsAction from "../../../REDUX/Action/Comments/CommentsAction.js";
import { UilEmoji } from "@iconscout/react-unicons";

function CommentShare({ postId }) {
  const desc = useRef();
  const { user } = useSelector((state) => state.AuthReducer.authData);
  const { commentsCounter } = useSelector((state) => state.CommentReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    desc.current.value = "";
  }, [commentsCounter]);
  const handleCommentShare = async () => {
    if (emojiPickerVisible) {
      emojiPickerHandle();
    }
    const commentContent = {
      desc: desc.current.value,
      userId: user._id,
      postId: postId,
    };
    dispatch(CommentsAction(commentsCounter, commentContent));
  };
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const emojiPickerHandle = () => {
    setEmojiPickerVisible((emojiPickerVisible) => !emojiPickerVisible);
  };
  const emojiPick = (e) => {
    const emoji = e.target.textContent;
    desc.current.value += emoji;
  };
  return (
    <div>
      <div className="comment-form">
        <input
          className="comment-input"
          placeholder="comment..."
          type="textarea"
          ref={desc}
          required
        />
        <div className="emoji-pick">
          <UilEmoji onClick={emojiPickerHandle} />
        </div>
        <button className="button comment-button" onClick={handleCommentShare}>
          Share
        </button>
      </div>
      {emojiPickerVisible && (
        <div>
          <ul className="emoji-list">
            <li className="emoji" onClick={emojiPick}>
              &#128522;
            </li>
            <li className="emoji" onClick={emojiPick}>
              &#128514;
            </li>
            <li className="emoji" onClick={emojiPick}>
              &#129315;
            </li>
            <li className="emoji" onClick={emojiPick}>
              &#128523;
            </li>
            <li className="emoji" onClick={emojiPick}>
              &#128525;
            </li>
            <li className="emoji" onClick={emojiPick}>
              &#128536;
            </li>
            <li className="emoji" onClick={emojiPick}>
              &#129392;
            </li>
            <li className="emoji" onClick={emojiPick}>
              &#128591;
            </li>
            <li className="emoji" onClick={emojiPick}>
              &#128557;
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default CommentShare;
