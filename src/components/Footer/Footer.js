import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="bg-body-tertiary d-lg-flex d-none">
            <div className="container-fluid">
                <div className="row">
                    <div className="footer-column">
                        <h5>Hỗ trợ khách hàng</h5>
                        <ul className="list-unstyled">
                            <li>Hotline: 1900-6035</li>
                            <li><a href="/" className="text-dark">Các câu hỏi thường gặp</a></li>
                            <li><a href="/" className="text-dark">Gửi yêu cầu hỗ trợ</a></li>
                            <li><a href="/" className="text-dark">Hướng dẫn đặt hàng</a></li>
                            <li><a href="/" className="text-dark">Phương thức vận chuyển</a></li>
                            <li><a href="/" className="text-dark">Chính sách đổi trả</a></li>
                            <li><a href="/" className="text-dark">Chính sách trả góp</a></li>
                            <li><a href="/" className="text-dark">Chính sách hàng nhập khẩu</a></li>
                            <li>Hỗ trợ khách hàng: <a href="mailto:hotro@tiki.com" className="text-dark">hotro@tiki.com</a></li>
                            <li>Bảo mật bảo mật: <a href="mailto:security@tiki.vn" className="text-dark">security@tiki.vn</a>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h5>Về Tiki</h5>
                        <ul className="list-unstyled">
                            <li><a href="/" className="text-dark">Giới thiệu Tiki</a></li>
                            <li><a href="/" className="text-dark">Tiki Blog</a></li>
                            <li><a href="/" className="text-dark">Tuyển dụng</a></li>
                            <li><a href="/" className="text-dark">Chính sách bảo mật thanh toán</a></li>
                            <li><a href="/" className="text-dark">Chính sách bảo mật thông tin cá nhân</a></li>
                            <li><a href="/" className="text-dark">Chính sách giải quyết khiếu nại</a></li>
                            <li><a href="/" className="text-dark">Điều khoản sử dụng</a></li>
                            <li><a href="/" className="text-dark">Giới thiệu Tiki Xu</a></li>
                            <li><a href="/" className="text-dark">Gói hội viên VIP</a></li>
                            <li><a href="/" className="text-dark">Tiếp thị liên kết cùng Tiki</a></li>
                            <li><a href="/" className="text-dark">Bán hàng doanh nghiệp</a></li>
                            <li><a href="/" className="text-dark">Điều kiện vận chuyển</a></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <div className="row">
                            <h5>Hợp tác và liên kết</h5>
                            <ul className="list-unstyled">
                                <li><a href="/" className="text-dark">Quy chế hoạt động San GDTMDT</a></li>
                                <li><a href="/" className="text-dark">Bán hàng cùng Tiki</a></li>
                            </ul>
                        </div>

                        <div className="row">
                            <h5>Chung nhan boi</h5>
                            <img src={require('../../images/chungnhan.png')} className="img-fluid" alt="Chứng nhận Bộ Công Thương" />
                        </div>

                    </div>
                    <div className="footer-column">
                        <h5>Phương thức thanh toán</h5>
                        <h5>Dịch vụ giao hàng</h5>
                    </div>
                    <div className="footer-column">
                        <h5>Kết nối với chúng tôi</h5>
                        <div className="contact-social list-unstyled mb-5">
                            <img src={require('../../images/facebook.png')} alt="Facebook" className="me-2" />
                            <img src={require('../../images/youtube.png')} alt="YouTube" className="me-2" />
                            <img src={require('../../images/zalo.png')} alt="Zalo" />
                        </div>
                        <h6 className="mt-3">Tải ứng dụng trên điện thoại</h6>
                    </div>
                </div>
                <div className="row mt-4 border rounded text-start">
                    <div className="col-md-12">
                        <h5>Công ty TNHH TIKI</h5>
                        <p className="mb-0">Địa chỉ trụ sở: Tòa nhà Viettel, Số 285, Đường Cách Mạng Tháng 8, Phường 12, Quận
                            10, Thành phố Hồ Chí Minh</p>
                        <p className="mb-0">Giấy chứng nhận đăng ký doanh nghiệp số 0309532909 do Sở Kế Hoạch và Đầu Tư Thành
                            phố Hồ Chí Minh cấp lần đầu vào ngày 06/01/2010.</p>
                        <p className="mb-0">Hotline: <a href="/" className="text-decoration-none">1900 6035</a></p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;