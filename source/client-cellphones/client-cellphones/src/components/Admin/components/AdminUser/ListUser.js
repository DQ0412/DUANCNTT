import React from 'react';
import User from './User';

function ListUser({ users }) {
    console.log("📌 Danh sách Users:", users);

    return (
        <div className="admin-user-list">
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((item, index) => (
                        <User key={item._id} user={item} number={index} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListUser;
