import React, { useState } from "react";
import { Col } from "antd";
import { WechatOutlined, PushpinOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { pinCommentProduct, repCommentProduct } from "../../actions/ProductAction";
import { useParams } from "react-router-dom";
import AllRepComment from "./AllRepComment";
import { getFirstCharacterUser } from "../../untils";

function AllComment(props) {
  const { id } = useParams();
  const allComment = props.allComment || [];
  const dispatch = useDispatch();
  const [repCmt, setRepCmt] = useState({ key: "", status: false });
  const userInfo = useSelector((state) => state.userSignin?.userInfo || null);
  const [repValue, setRepValue] = useState("");

  const showRepComment = (id) => {
    setRepCmt({ key: id, status: !repCmt.status });
  };

  const handleRepComment = () => {
    if (!userInfo) {
      alert("Xin hãy đăng nhập");
      return;
    }

    if (repValue.trim() === "") {
      alert("Bình luận không được để trống!");
      return;
    }

    const comment = {
      idComment: repCmt.key,
      isAdmin: userInfo.isAdmin,
      content: repValue,
      nameUser: userInfo.name,
    };

    dispatch(repCommentProduct(id, comment));
    setRepValue("");
    setRepCmt({ key: "", status: false });
  };

  const PinComment = (comment) => {
    const UpdateComment = { ...comment, status: "pin" };
    dispatch(pinCommentProduct(id, UpdateComment));
  };

  return (
    <div className="all-comment">
      {allComment.map((comment) => (
        <Col key={comment._id} span={18} style={{ marginTop: "1rem" }} xs={24} sm={24} md={18}>
          <div className="all-comment-info">
            <div style={{ display: "flex" }}>
              {comment.isAdmin ? (
                <div className="all-comment-info-name admin">
                  <img src="https://cellphones.com.vn/skin/frontend/default/cpsdesktop/images/media/logo.png" alt="Admin" />
                </div>
              ) : (
                <div className="all-comment-info-name">{getFirstCharacterUser(comment.author)}</div>
              )}
              <strong>
                {comment.author} {comment.isAdmin && <span>QTV</span>}
              </strong>
            </div>

            {userInfo?.isAdmin && (
              <div className="comment-status">
                <div className="comment-status-pin" onClick={() => PinComment(comment)}>
                  {comment.status === "pin" ? <LockOutlined /> : <PushpinOutlined />}
                </div>
              </div>
            )}
          </div>

          <div className="all-comment-content">{comment.content}</div>
          <div className="all-comment-more">
            <a className="all-comment-more-chat" onClick={() => comment._id && showRepComment(comment._id)}>
              <WechatOutlined style={{ color: "#e11b1e" }} /> <p> Trả lời</p>
            </a>
          </div>

          {comment.replies.length > 0 && (
            <AllRepComment allrepcomment={comment.replies} showRepComment={showRepComment} id={comment._id} />
          )}

          {repCmt.status && repCmt.key === comment._id && (
            <Col span={18} xs={24} md={18} align="start" style={{ alignItems: "center", marginTop: "1rem", marginBottom: "1rem" }}>
              <div className="comment-area" style={{ display: "flex", alignItems: "center" }}>
                <textarea value={repValue} onChange={(e) => setRepValue(e.target.value)}></textarea>
              </div>
              <div className="comment-send">
                <button onClick={handleRepComment}>Trả lời</button>
              </div>
            </Col>
          )}
        </Col>
      ))}
    </div>
  );
}

export default AllComment;
