import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteUser, getAllUser } from '../../../../actions/UserAction';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal, message } from 'antd';

const { confirm } = Modal;

function User({ user, number }) {
    const dispatch = useDispatch();
    
    const handleDeleteUser = async (userId) => {
        if (!userId) {
            console.error("❌ Không tìm thấy ID người dùng để xóa!", userId);
            message.error("ID người dùng không hợp lệ.");
            return;
        }
    
        console.log("📌 Đang xóa user với ID:", userId); // Kiểm tra ID trước khi gọi API
    
        confirm({
            title: 'Bạn có chắc muốn xoá người dùng này?',
            icon: <ExclamationCircleOutlined />,
            content: `${user.name} sẽ bị xoá vĩnh viễn.`,
            okText: 'Xoá',
            okType: 'danger',
            cancelText: 'Huỷ',
            onOk: async () => {
                try {
                    await dispatch(deleteUser(userId));
                    setTimeout(() => {
                        dispatch(getAllUser());
                    }, 500);
                    message.success('Xoá người dùng thành công!');
                } catch (error) {
                    message.error('Xoá người dùng thất bại!');
                }
            },
        });
    };
    
    
    return (
        <tr>
            <td>{number + 1}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.address}</td>
            <td>{user.phone}</td>
            <td className="delete-user" onClick={() => handleDeleteUser(user.id)}>
                <DeleteOutlined style={{ color: 'red', cursor: 'pointer' }} />
            </td>
        </tr>
    );
}

export default User;
