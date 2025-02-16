import React, { useState } from "react";
import { useSelector } from "react-redux";

function BlogContent() {
  const detailProduct = useSelector((state) => state.getProductById.product);
  const [showMoreBlog, setShowMoreBlog] = useState(false);
  const [styleBlog, setStyleBlog] = useState({ height: "500px" });

  // Kiểm tra nếu `detailProduct` chưa có dữ liệu
  if (!detailProduct) {
    return <p>Đang tải dữ liệu...</p>; // Tránh lỗi truy cập null
  }

  // Kiểm tra nếu `blog` không có nội dung
  if (!detailProduct.blog) {
    return <p>Chưa có bài viết đánh giá.</p>;
  }

  return (
    <section id="blog">
      <div className="blog">
        <div className="blog-content" style={styleBlog}>
          <div dangerouslySetInnerHTML={{ __html: detailProduct.blog }} />
          {!showMoreBlog && (
            <div
              className="blog-showmore"
              onClick={() => {
                setStyleBlog({ height: "100%" });
                setShowMoreBlog(true);
              }}
            >
              Xem Thêm đánh giá
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default BlogContent;
