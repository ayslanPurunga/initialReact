import React, { useEffect, useState } from "react";
import UIModal from "components/UI/Modal/Modal";
import useApi from "components/utils/useApi";
import PromotionModalCommentsTree from "./CommentsTree/CommentsTree";
import "../Modal/Modal.css";

const PromotionModal = ({ promotionId, onClickClose }) => {
  //eslint-disable-next-line react-hooks/exhaustive-deps
  const [comment, setComment] = useState("");
  const [load, loadInfo] = useApi({
    url: "/comments",
    params: {
      promotionId,
      _expand: "user",
    },
  });

  const [sendComment, sendCommentInfo] = useApi({
    url: "/comments",
    method: "POST",
  });

  useEffect(() => {
    load();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onSubmit(ev) {
    ev.preventDefault();
    try {
      await sendComment({
        data: {
          userId: 1,
          promotionId,
          comment,
        },
      });
      setComment("");
      load();
    } catch (e) {

    }
  }

  return (
    <UIModal isOpen onClickClose={onClickClose}>
      <form
        action=""
        className="promotion-modal__comment-form"
        onSubmit={onSubmit}
      >
        <textarea
          placeholder="Comentar..."
          onChange={(ev) => setComment(ev.target.value)}
          value={comment}
        ></textarea>
        <button type="submit" disabled={sendCommentInfo.loading}>
          {sendCommentInfo.loading ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
      <PromotionModalCommentsTree comments={loadInfo.data} />
    </UIModal>
  );
};

export default PromotionModal;
