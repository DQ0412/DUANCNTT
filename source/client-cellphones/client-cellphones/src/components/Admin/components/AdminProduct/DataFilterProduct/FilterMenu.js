import React, { useEffect, useState } from "react";
import { Dropdown, Modal } from "antd";
import { DownOutlined, CloseOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { deleteSelectListItemById, getAllSelectList, UpdateSelectListItem } from "../../../../../actions/SelectListAction";
import { useForm } from "react-hook-form";

export default function FilterMenu() {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const filterMenuList = useSelector((state) => state.selectList?.List) || [];

  useEffect(() => {
    dispatch(getAllSelectList());
  }, [dispatch]);

  const showModal = (item) => {
    setSelectedItem(item);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedItem(null);
  };

  const handleRemoveOption = (index) => {
    if (selectedItem) {
      const newOptions = selectedItem.options.filter((_, i) => i !== index);
      setSelectedItem({ ...selectedItem, options: newOptions });
    }
  };

  const onSubmit = async () => {
    await dispatch(UpdateSelectListItem(selectedItem));
    handleCancel();
    dispatch(getAllSelectList()); // ✅ Cập nhật Redux ngay lập tức
  };

  const removeSelectItem = async (item) => {
    await dispatch(deleteSelectListItemById(item._id));
    dispatch(getAllSelectList()); // ✅ Cập nhật Redux ngay lập tức
  };

  return (
    <div className="filter-menu">
      {filterMenuList.length > 0
        ? filterMenuList.map((item) => (
            <div key={item._id} className="filter-menu-item">
              <Dropdown overlay={<MenuItem item={item} showModal={showModal} removeSelectItem={removeSelectItem} />} trigger={["click"]}>
                <span className="ant-dropdown-link">
                  {item.name} <DownOutlined />
                </span>
              </Dropdown>
            </div>
          ))
        : "Không có dữ liệu"}
      {selectedItem && (
        <Modal title={`Cập nhật ${selectedItem.name}`} visible={isModalVisible} onCancel={handleCancel} footer={null}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("name")} defaultValue={selectedItem.name} required />
            <div className="option-list">
              {selectedItem.options.map((option, index) => (
                <div key={index} className="option-list-item">
                  <input value={option} onChange={(e) => {
                    const newOptions = [...selectedItem.options];
                    newOptions[index] = e.target.value;
                    setSelectedItem({ ...selectedItem, options: newOptions });
                  }} />
                  <span onClick={() => handleRemoveOption(index)}>
                    <CloseOutlined />
                  </span>
                </div>
              ))}
            </div>
            <button type="submit">Lưu</button>
          </form>
        </Modal>
      )}
    </div>
  );
}

const MenuItem = ({ item, showModal, removeSelectItem }) => (
  <div className="menu-show">
    <div className="menu-show-list">
      {item.options.map((opt, i) => (
        <div key={i} className="menu-show-item">{opt}</div>
      ))}
    </div>
    <div className="menu-show-btn">
      <button className="cancel" onClick={() => showModal(item)}>Cập nhật</button>
      <button className="cancel" onClick={() => removeSelectItem(item)}>Xóa</button>
    </div>
  </div>
);
