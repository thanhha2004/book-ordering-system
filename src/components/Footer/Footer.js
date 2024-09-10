// Import thư viện React để sử dụng các tính năng của React
import React from "react";

// Import file CSS để áp dụng các style cho component Footer
import "./Footer.css";

// Khởi tạo component Footer
const Footer = () => {
  return (
    // Thẻ <footer> chứa các thông tin hiển thị ở footer, áp dụng class CSS để tạo kiểu
    <footer className="bg-body-tertiary d-lg-flex d-none">
      {/* Container fluid để giữ bố cục có kích thước đầy đủ theo chiều ngang */}
      <div className="container-fluid">
        {/* Bố cục chính của footer được chia thành nhiều hàng và cột */}
        <div className="row">
          
          {/* Cột đầu tiên chứa thông tin hỗ trợ khách hàng */}
          <div className="footer-column">
            <h5>Hỗ trợ khách hàng</h5>
            {/* Danh sách các mục hỗ trợ khách hàng */}
            <ul className="list-unstyled">
              <li>Hotline: 1900-6035</li>
              <li>
                <a href="/" className="text-dark">Các câu hỏi thường gặp</a>
              </li>
              <li>
                <a href="/" className="text-dark">Gửi yêu cầu hỗ trợ</a>
              </li>
              <li>
                <a href="/" className="text-dark">Hướng dẫn đặt hàng</a>
              </li>
              <li>
                <a href="/" className="text-dark">Phương thức vận chuyển</a>
              </li>
              <li>
                <a href="/" className="text-dark">Chính sách đổi trả</a>
              </li>
              <li>
                <a href="/" className="text-dark">Chính sách trả góp</a>
              </li>
              <li>
                <a href="/" className="text-dark">Chính sách hàng nhập khẩu</a>
              </li>
              <li>
                Hỗ trợ khách hàng: <a href="mailto:hotro@tiki.com" className="text-dark">hotro@tiki.com</a>
              </li>
              <li>
                Bảo mật bảo mật: <a href="mailto:security@tiki.vn" className="text-dark">security@tiki.vn</a>
              </li>
            </ul>
          </div>

          {/* Cột thứ hai chứa thông tin về Tiki */}
          <div className="footer-column">
            <h5>Về Tiki</h5>
            {/* Danh sách các mục liên quan đến Tiki */}
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

          {/* Cột thứ ba chứa các thông tin hợp tác và chứng nhận */}
          <div className="footer-column">
            <div className="row">
              <h5>Hợp tác và liên kết</h5>
              <ul className="list-unstyled">
                <li><a href="/" className="text-dark">Quy chế hoạt động San GDTMDT</a></li>
                <li><a href="/" className="text-dark">Bán hàng cùng Tiki</a></li>
              </ul>
            </div>

            {/* Phần hiển thị hình ảnh chứng nhận */}
            <div className="row">
              <h5>Chứng nhận bởi</h5>
              <img
                // Hiển thị hình ảnh chứng nhận với kiểu responsive
                src={require("../../images/chungnhan.png")}
                className="img-fluid"
                alt="Chứng nhận Bộ Công Thương"
              />
            </div>
          </div>

          {/* Cột thứ tư chứa phương thức thanh toán và dịch vụ giao hàng */}
          <div className="footer-column">
            <h5>Phương thức thanh toán</h5>
            <h5>Dịch vụ giao hàng</h5>
          </div>

          {/* Cột thứ năm chứa các liên kết mạng xã hội */}
          <div className="footer-column">
            <h5>Kết nối với chúng tôi</h5>
            {/* Hiển thị biểu tượng các nền tảng mạng xã hội */}
            <div className="contact-social list-unstyled mb-5">
              <a>
                <img
                  src={require("../../images/facebook.png")}
                  alt="Facebook"
                  className="me-2"
                />
                <img
                  src={require("../../images/youtube.png")}
                  alt="YouTube"
                  className="me-2"
                />
                <img src={require("../../images/zalo.png")} alt="Zalo" />
              </a>
            </div>
            <h6 className="mt-3">Tải ứng dụng trên điện thoại</h6>
          </div>
        </div>

        {/* Phần hiển thị thông tin về công ty Tiki */}
        <div className="row mt-4 border rounded text-start">
          <div className="col-md-12">
            <h5>Công ty TNHH TIKI</h5>
            <p className="mb-0">Địa chỉ trụ sở: Tòa nhà Viettel, Số 285, Đường Cách Mạng Tháng 8, Phường 12, Quận 10, Thành phố Hồ Chí Minh</p>
            <p className="mb-0">Giấy chứng nhận đăng ký doanh nghiệp số 0309532909 do Sở Kế Hoạch và Đầu Tư Thành phố Hồ Chí Minh cấp lần đầu vào ngày 06/01/2010.</p>
            <p className="mb-0">
              Hotline: <a href="/" className="text-decoration-none">1900 6035</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Xuất component Footer để có thể import vào các file khác
export default Footer;
