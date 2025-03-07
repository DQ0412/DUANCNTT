import React from 'react';

function AboutProduct({ product }) {
    if (!product) return <p>Không có thông tin sản phẩm</p>;

    return (
        <div className="detail-intro">
            <div className="detail-intro-title">
                <span>Thông số kỹ thuật</span>
            </div>
            <table className="detail-intro-tskt">
                <tbody>
                    <tr>
                        <td>Kích thước màn hình</td>
                        <td>{product.screen ? product.screen : "Chưa có dữ liệu"}</td>
                    </tr>
                    <tr>
                        <td>Công nghệ màn hình</td>
                        <td>{product.screen_technology ? product.screen_technology : "Chưa có dữ liệu"}</td>
                    </tr>
                    <tr>
                        <td>Camera</td>
                        <td>{product.camera ? product.camera : "Chưa có dữ liệu"}</td>
                    </tr>
                    <tr>
                        <td>Chipset</td>
                        <td>{product.chipset ? product.chipset : "Chưa có dữ liệu"}</td>
                    </tr>
                    <tr>
                        <td>Dung lượng RAM</td>
                        <td>{product.ram ? product.ram : "Chưa có dữ liệu"}</td>
                    </tr>
                    <tr>
                        <td>Bộ nhớ trong</td>
                        <td>{product.rom ? product.rom : "Chưa có dữ liệu"}</td>
                    </tr>
                    <tr>
                        <td>Pin</td>
                        <td>{product.battery ? product.battery : "Chưa có dữ liệu"}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default AboutProduct;
