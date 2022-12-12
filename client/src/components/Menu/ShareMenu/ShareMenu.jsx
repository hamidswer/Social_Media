import React from "react";
import "./ShareMenu.css";
import {
  TelegramShareButton,
  TwitterShareButton,
  FacebookShareButton,
  WhatsappShareButton,
  EmailShareButton,
  EmailIcon,
  FacebookIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

function ShareMenu({ postId }) {
  return (
    <div className="share-panel">
      <ul className="share-list">
        <li className="share-item">
          <TelegramShareButton url={`http://localhost:3000/post/${postId}`}>
            <TelegramIcon size={40} round={true} />
          </TelegramShareButton>
        </li>
        <li className="share-item">
          <TwitterShareButton url={`http://localhost:3000/post/${postId}`}>
            <TwitterIcon size={40} round={true} />
          </TwitterShareButton>
        </li>
        <li className="share-item">
          <FacebookShareButton url={`http://localhost:3000/post/${postId}`}>
            <FacebookIcon size={40} round={true} />
          </FacebookShareButton>
        </li>
        <li className="share-item">
          <WhatsappShareButton url={`http://localhost:3000/post/${postId}`}>
            <WhatsappIcon size={40} round={true} />
          </WhatsappShareButton>
        </li>
        <li className="share-item">
          <EmailShareButton url={`http://localhost:3000/post/${postId}`}>
            <EmailIcon size={40} round={true} />
          </EmailShareButton>
        </li>
      </ul>
    </div>
  );
}

export default ShareMenu;
