import React, { useState, useEffect } from 'react';
import { Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { commentProduct, getProductById } from '../../actions/ProductAction';
import { useParams } from 'react-router-dom';
import AllComment from './AllComment';

function CommentProduct(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [value, setValue] = useState('');

  const allComment = useSelector(state => state.productReducer?.product?.comments || []);
  const userInfo = useSelector(state => state.userSignin?.userInfo || null);

  const Comment = () => {
    if (!userInfo) {
      alert('Đăng nhập đi bạn êiiiii');
      return;
    }

    const comment = {
      author: userInfo?.name || "Ẩn danh",
      isAdmin: userInfo?.isAdmin || false,
      content: value,
      byUser: userInfo?._id || null,
    };

    if (value.trim() === "") {
      alert("Bình luận không được để trống!");
      return;
    }

    dispatch(commentProduct(id, comment));
    setValue('');
  };

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  return (
    <div className='comment'>
      <Col span={18} align='start' style={{ alignItems:'center'}} xs={24} sm={24} md={18}>
        <div className="comment-area" style={{display: 'flex', alignItems:'center'}}>
          <textarea 
            placeholder='Xin mời để lại câu hỏi, CellphoneS sẽ trả lời trong 1h từ 8h - 22h mỗi ngày.' 
            rows={10} 
            cols={3} 
            value={value} 
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div className="comment-send">
          <button onClick={Comment}>Gửi</button>
        </div>
      </Col>

      <AllComment allComment={allComment} />
    </div>
  );
}

export default CommentProduct;
