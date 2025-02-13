import React, { useEffect, useRef, useState } from "react";
import "./ReviewProduct.css";
import { useDispatch, useSelector } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";
import { BlogProduct, getProductById } from "../../../../../actions/ProductAction";
import { useParams } from "react-router-dom";

export default function ReviewProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const editorRef = useRef(null);
  const [loading, setLoading] = useState(true);

  const detailProduct = useSelector((state) => state.productReducer?.product || null);  // 🔹 Đổi state để tránh lỗi undefined

  const log = () => {
    if (editorRef.current) {
      const blogContent = String(editorRef.current.getContent());
      dispatch(BlogProduct(id, { blogContent }, () => {
        alert("Add review product success");
      }));
    }
  };

  useEffect(() => {
    setLoading(true);
    dispatch(getProductById(id)).then(() => setLoading(false)); // 🔹 Đợi Redux load dữ liệu xong
  }, [dispatch, id]);

  return (
    <section id="review">
      <div className="review">
        <span className="review-title">Review</span>

        <div className="review-content">
          {loading ? (
            <p>Loading product details...</p>
          ) : detailProduct ? (
            <Editor
              apiKey="cmlltcvw2ydrtenwdgwdwqqrvsje6foe8t5xtyaq6lo2ufki"
              language="vi"
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue={detailProduct?.blog || ""}  // 🔹 Tránh lỗi nếu `blog` chưa có dữ liệu
              init={{
                height: 500,
                menubar: "file edit view insert format tools table tc help",
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | " +
                  "bold italic backcolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
            />
          ) : (
            <p>Không tìm thấy sản phẩm.</p>
          )}
          <button onClick={log}>Add Review Product</button>
        </div>
      </div>
    </section>
  );
}
