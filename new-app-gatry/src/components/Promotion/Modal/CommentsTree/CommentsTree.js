import React from "react";
import "../CommentsTree/CommentsTree.css";

const PromotionModalCommentsTree = ({ comments }) => {
  if (!comments) {
    return <div>Carregando...</div>;
  }

  return (
    <ul className="Promotion-modal-comments-tree">
      {comments.map((item) => (
        <li className=" Promotion-modal-comments-tree__item">
          <img
            src={item.user.avatarUrl}
            alt={`foto de ${item.user.name}`}
            className=" Promotion-modal-comments-tree__item__avatar"
          />
          <div className=" Promotion-modal-comments-tree__info">
            <span className="Promotion-modal-comments-tree__item__name">{item.user.name}</span>
            <p>{item.comment}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default PromotionModalCommentsTree;
