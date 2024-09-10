import React from "react";
import "./Header.css";

// Khai báo một thành phần React
const Header = () => {
  return (
    <header>
      {/* navbar chính */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <i
            className="bi bi-chevron-left fs-3 me-2 d-lg-none text-light"
            style={{ marginBottom: "1%" }}
          ></i>

           {/* Nút toggle trên màn hình nhỏ  */}
          <button
            className="navbar-toggler"
            style={{ border: "none" }}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="bi bi-list text-light"></i>
          </button>

          {/* Thanh tìm kiếm trên màn hình nhỏ */}
          <div className="input-group d-flex me-auto ms-1 d-lg-none">
            <span className="input-group-text" id="basic-addon1">
              <i className="bi bi-search"></i>
            </span>
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </div>

          {/* Giỏ hàng cho màn hình nhỏ */}
          <a className="nav-link position-relative d-lg-none" href="/">
            <i
              className="bi bi-cart fs-5 text-light"
              style={{ marginBottom: "1%" }}
            ></i>
          </a>

          <div
            className="collapse navbar-collapse"
            id="navbarTogglerDemo01"
          ></div>

          {/* Logo TIKI cho màn hình lớn */}
          <a className="navbar-brand d-lg-flex d-none ms-4 me-4" href="/">
            <img
              src={require("../../images/logo.png")}
              alt="Logo"
              width="80"
              className="d-inline-block align-text-top"
            />
          </a>

          {/* Thanh tìm kiếm cho màn hình lớn */}
          <div className="input-group me-4 ms-5 d-lg-flex d-none ">
            <span className="input-group-text" id="basic-addon1">
              <i className="bi bi-search"></i>
            </span>
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-primary" type="submit">
              Tìm kiếm
            </button>
          </div>

          {/* Navigation link cho màn hình lớn */}
          <div className="navbar-nav d-lg-flex d-none me-5"> {/* Các liên kết điều hướng chỉ hiển thị trên màn hình lớn. */}
          {/* bi-house, bi-emoji-smile, bi-cart: Các biểu tượng tương ứng với Trang chủ, Tài khoản, và Giỏ hàng. */}
            <a className="nav-link me-2" href="/">
              <i className="bi bi-house fs-5 me-1"></i>Trang chủ
            </a>
            <a className="nav-link me-2" href="/">
              <i className="bi bi-emoji-smile fs-5 me-1"></i>Tài khoản
            </a>
            <a className="nav-link position-relative" href="/">
              <i className="bi bi-cart fs-5 text-primary"></i>
              <span className="noti-point position-absolute start-100 translate-middle badge rounded-pill bg-danger">
                0
              </span>
            </a>
          </div>
        </div>
      </nav>

      {/* Breadcrumb (>) cho màn hình lớn */}
      <div className="desktop container d-none d-lg-block">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Trang chủ</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Nhà sách Tiki
            </li>
          </ol>
        </nav>
      </div>

      {/* Menu cho màn hình nhỏ */}
      <div className="mobile container row d-lg-none mt-3 ms-auto me-auto">
        <div className="col-3 ps-4">
          <a href="/">Phổ biến</a>
        </div>
        <div className="col-3 ps-4">
          <a href="/" className="text-dark">
            Bán chạy
          </a>
        </div>
        <div className="col-4 ps-5">
          <a href="/" className="text-dark">
            Hàng mới
          </a>
        </div>
        <div className="col-2 ps-4">
          <a href="/" className="text-dark">
            Giá
            <i className="bi bi-arrow-down-up"></i>
          </a>
        </div>
        <hr className="mt-3" />
        <div
          className="col-2 text-center d-flex"
          style={{ marginBottom: "-20px" }}
        >
          <i className="bi bi-funnel"></i>
          <a href="/" className="text-dark">
            Lọc
          </a>
          <img
            src={require("../../images/now.png")}
            alt="now"
            style={{ height: "45%" }}
            className="ms-3"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
