import React, { useState, useEffect } from "react";
import { getData } from "../../services/productServices"; // Import hàm lấy dữ liệu sản phẩm từ service
import "./ProductGrid.css";

// phân trang 
const ProductGrid = ({ currentPage, itemsPerPage, filters }) => {
  // State để lưu trữ danh sách sản phẩm từ API
  const [products, setProducts] = useState([]);

  // State để lưu trữ danh sách sản phẩm sau khi đã phân trang hoặc lọc
  const [paginatedProducts, setPaginatedProducts] = useState([]);

  // State để theo dõi kích thước màn hình (true nếu màn hình nhỏ hơn 768px)
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 992);

  // Theo dõi sự thay đổi kích thước của cửa sổ (window) để cập nhật state `isSmallScreen`
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize); // Lắng nghe sự kiện thay đổi kích thước cửa sổ
    return () => {
      window.removeEventListener("resize", handleResize); // Hủy lắng nghe khi component unmount
    };
  }, []);

  // Gọi API lấy danh sách sản phẩm khi component được render lần đầu
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getData(); // Gọi hàm getData từ service
        setProducts(data); // Lưu danh sách sản phẩm vào state
      } catch (error) {
        console.error("Có lỗi xảy ra khi lấy dữ liệu sản phẩm:", error); // Log lỗi nếu xảy ra
      }
    };

    fetchProducts(); // Gọi hàm lấy dữ liệu
  }, []); // Chỉ chạy khi component mount

  // Xử lý lọc sản phẩm và phân trang mỗi khi products, currentPage, filters thay đổi
  useEffect(() => {
    let filteredProducts = products; // Bắt đầu từ danh sách sản phẩm ban đầu

    // Áp dụng các bộ lọc nếu có
    if (filters.suppliers.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        filters.suppliers.includes(product.current_seller.name) // Lọc theo nhà cung cấp
      );
    }

    if (filters.categories.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        filters.categories.includes(product.categories.name) // Lọc theo danh mục
      );
    }

    if (filters.rating.length > 0) {
      filteredProducts = filteredProducts.filter(
        (product) => product.rating_average >= filters.rating[0] // Lọc theo đánh giá
      );
    }

    // Nếu là màn hình nhỏ, hiển thị tất cả sản phẩm mà không phân trang
    if (isSmallScreen) {
      setPaginatedProducts(filteredProducts);
    } else {
      // Nếu là màn hình lớn, thực hiện phân trang
      const start = (currentPage - 1) * itemsPerPage; // Xác định vị trí bắt đầu của trang
      const end = start + itemsPerPage; // Xác định vị trí kết thúc của trang
      setPaginatedProducts(filteredProducts.slice(start, end)); // Cắt danh sách sản phẩm theo trang
    }
  }, [currentPage, products, itemsPerPage, filters, isSmallScreen]); // Theo dõi các giá trị để cập nhật khi thay đổi

  // Giao diện của ProductGrid
  return (
    <div className="col-lg-8">
      <h3 className="category-title d-lg-block d-none mb-4">Nhà Sách Tiki</h3>
      <div className="row g-3">
        {/* Hiển thị danh sách sản phẩm sau khi đã lọc và phân trang */}
        {paginatedProducts.map((product) => (
          <div
            key={product.id}
            className="product-item card col-lg-2-custom col-md-6 col-6"
          >
            {/* Hiển thị hình ảnh sản phẩm, nếu không có thì dùng ảnh mặc định */}
            <img
              src={
                product.images[0]?.small_url ||
                require("../../images/image.png")
              }
              alt={product.name}
            />

            {/* Tên sản phẩm */}
            <div className="product-title m-2">{product.name}</div>

            {/* Hiển thị đánh giá và số lượng đã bán */}
            <div className="product-rating m-2 mr-2">
              {product.rating_average > 0 &&
                [...Array(5)].map((_, i) => (
                  <i
                    key={i}
                    className={`fa fa-star ${
                      i < product.rating_average ? "text-warning" : ""
                    }`}
                  ></i>
                ))}
              <span className="product-sold">
                Đã bán{" "}
                {product.sold > 5000 ? `${product.sold}+` : product.sold || 0}
              </span>
            </div>

            {/* Hiển thị giá sản phẩm và giảm giá nếu có */}
            <div className="product-price m-2 fs-5">
              {product.list_price.toLocaleString()}đ
              {product.original_price > product.list_price && (
                <span className="product-discount m-2">
                  -{/* Tính toán % giảm giá */}
                  {Math.round(
                    ((product.original_price - product.list_price) /
                      product.original_price) *
                      100
                  )}
                  %
                </span>
              )}
            </div>

            {/* Thông tin giao hàng */}
            <div className="product-shipping text-center">
              <hr />
              Giao siêu tốc 2h
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
