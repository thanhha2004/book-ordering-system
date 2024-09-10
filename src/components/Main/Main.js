import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import ProductGrid from "../ProductGrid/ProductGrid";
import "./Main.css";
import { getData } from "../../services/productServices";

// Thành phần Main chịu trách nhiệm hiển thị sản phẩm, sidebar và phân trang
const Main = () => {
  // State để quản lý trang hiện tại
  const [currentPage, setCurrentPage] = useState(1);

  // Số sản phẩm hiển thị trên mỗi trang
  const itemsPerPage = 5;

  // State để lưu tổng số sản phẩm từ dữ liệu
  const [totalProducts, setTotalProducts] = useState(0);

  // State để lưu các bộ lọc hiện tại
  const [filters, setFilters] = useState({
    suppliers: [], // Danh sách nhà cung cấp đã chọn
    categories: [], // Danh sách danh mục sản phẩm đã chọn
    rating: [], // Danh sách đánh giá đã chọn
  });

  // useEffect để lấy dữ liệu sản phẩm khi thành phần được render lần đầu
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Lấy dữ liệu sản phẩm từ API
        const data = await getData();
        setTotalProducts(data.length); // Cập nhật tổng số sản phẩm
      } catch (error) {
        console.error("Có lỗi khi lấy dữ liệu sản phẩm:", error); // Xử lý lỗi nếu có
      }
    };

    fetchProducts(); // Gọi hàm lấy dữ liệu
  }, []); // Mảng rỗng nghĩa là chỉ chạy khi component lần đầu được render

  // Tính toán tổng số trang dựa vào tổng số sản phẩm và số sản phẩm trên mỗi trang
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  // Hàm để thay đổi trang hiện tại
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Hàm để thay đổi các bộ lọc được chọn
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Xác định số trang hiển thị tối đa trên thanh phân trang
  const maxVisiblePages = 3;

  // Tính toán startPage (trang bắt đầu hiển thị) dựa trên trang hiện tại
  let startPage =
    currentPage <= Math.ceil(maxVisiblePages / 2)
      ? 1
      : Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));

  // Tính toán endPage (trang cuối hiển thị) dựa trên tổng số trang
  const endPage =
    currentPage > totalPages - Math.floor(maxVisiblePages / 2)
      ? totalPages
      : Math.min(totalPages, startPage + maxVisiblePages - 1);

  // Điều chỉnh startPage nếu endPage nhỏ hơn totalPages
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  // Giao diện chính của thành phần Main
  return (
    <main>
      <div className="container">
        <div className="row">
          {/* Sidebar chứa các bộ lọc sản phẩm */}
          <Sidebar onFilterChange={handleFilterChange} />

          {/* Truyền các thông tin cần thiết vào ProductGrid */}
          <ProductGrid
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            filters={filters}
          />
        </div>
      </div>

      {/* Thanh phân trang */}
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center mt-5 mb-5 d-lg-flex d-none">
          {/* Điều hướng đến trang đầu tiên nếu startPage > 1 */}
          {startPage > 1 && (
            <>
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => handlePageChange(1)}
                >
                  1
                </button>
              </li>
              {startPage > 2 && (
                <li className="page-item disabled">
                  <span className="page-link">...</span>
                </li>
              )}
            </>
          )}

          {/* Hiển thị các trang trong phạm vi từ startPage đến endPage */}
          {Array.from(
            { length: endPage - startPage + 1 },
            (_, i) => startPage + i
          ).map((pageNumber) => (
            <li
              key={pageNumber}
              className={`page-item ${
                pageNumber === currentPage ? "active" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            </li>
          ))}

          {/* Điều hướng đến trang cuối nếu endPage < totalPages */}
          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && (
                <li className="page-item disabled">
                  <span className="page-link">...</span>
                </li>
              )}
              <li
                className={`page-item ${
                  currentPage === totalPages ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(totalPages)}
                >
                  {totalPages}
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </main>
  );
};

export default Main;
