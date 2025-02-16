import React from 'react';
import { getFirstCharacterUser } from '../../untils';

function AllRepComment({ allrepcomment = [], showRepComment, id }) {
  if (!Array.isArray(allrepcomment) || allrepcomment.length === 0) {
    return <p>Chưa có bình luận phản hồi.</p>; 
  }

  return (
    <div className="all-comment-rep-list">
      <div className="arrow-up"></div>
      {allrepcomment.map((repComment, index) => (
        <div className="all-comment-rep-list-item" key={index}> {}
          <div className="all-comment-info">
            {repComment.isAdmin ? (
              <div className="all-comment-info-name admin">
                <img src="https://cellphones.com.vn/skin/frontend/default/cpsdesktop/images/media/logo.png" alt="Admin"></img>
              </div>
            ) : (
              <div className="all-comment-info-name">
                {getFirstCharacterUser(repComment.nameUser)}
              </div>
            )}

            <strong>
              {repComment.nameUser} {repComment.isAdmin && <span>QTV</span>}
            </strong>
          </div>

          <div className="all-comment-content">{repComment.content}</div>

          <div className="all-comment-more">
            <a
              className="all-comment-more-chat"
              onClick={() => id && showRepComment(id)} 
            >
              Trả lời
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AllRepComment;
