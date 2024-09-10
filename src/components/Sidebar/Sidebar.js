import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { getData } from "../../services/productServices"; // Import hàm lấy dữ liệu từ service

// Component Sidebar nhận props onFilterChange để truyền giá trị bộ lọc ra ngoài
const Sidebar = ({ onFilterChange }) => {
  // Khai báo các state dùng để lưu trữ nhà cung cấp, danh mục, và bộ lọc
  const [allSuppliers, setAllSuppliers] = useState([]); // Lưu trữ toàn bộ nhà cung cấp
  const [visibleCategories, setVisibleCategories] = useState([]); // Danh mục hiển thị trên sidebar
  const [visibleSuppliers, setVisibleSuppliers] = useState([]); // Nhà cung cấp hiển thị trên sidebar
  const [showMoreSuppliers, setShowMoreSuppliers] = useState(false); // Trạng thái hiển thị nút "Xem thêm" nhà cung cấp
  const [selectedSuppliers, setSelectedSuppliers] = useState([]); // Nhà cung cấp đã chọn để lọc sản phẩm
  const [selectedCategories, setSelectedCategories] = useState([]); // Danh mục đã chọn để lọc sản phẩm
  const [selectedRating, setSelectedRating] = useState([]); // Đánh giá đã chọn để lọc sản phẩm

  // useEffect để gọi API lấy dữ liệu khi component lần đầu tiên được render
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Gọi hàm getData từ service để lấy dữ liệu sản phẩm
        const dataList = await getData();

        // Lấy danh sách các nhà cung cấp duy nhất từ dữ liệu sản phẩm
        const suppliers = Array.from(
          new Set(dataList.map((product) => product.current_seller.name))
        );
        setAllSuppliers(suppliers); // Lưu danh sách toàn bộ nhà cung cấp
        setVisibleSuppliers(suppliers.slice(0, 5)); // Hiển thị 5 nhà cung cấp đầu tiên

        // Lấy danh sách các danh mục duy nhất từ dữ liệu sản phẩm
        const categories = Array.from(
          new Set(dataList.map((product) => product.categories.name))
        );
        setVisibleCategories(categories.slice(0, 5)); // Hiển thị 5 danh mục đầu tiên
      } catch (error) {
        console.error("Có lỗi xảy ra khi lấy dữ liệu:", error); // Xử lý lỗi nếu có
      }
    };

    fetchData(); // Gọi hàm fetchData khi component được mount
  }, []);

  // Xử lý khi người dùng nhấn vào nút "Xem thêm" hoặc "Thu gọn" nhà cung cấp
  const handleShowMore = () => {
    setShowMoreSuppliers(!showMoreSuppliers); // Thay đổi trạng thái showMoreSuppliers (true/false)
    if (!showMoreSuppliers) {
      setVisibleSuppliers(allSuppliers); // Nếu đang là "Xem thêm", hiển thị tất cả nhà cung cấp
    } else {
      setVisibleSuppliers(allSuppliers.slice(0, 5)); // Nếu đang là "Thu gọn", chỉ hiển thị 5 nhà cung cấp đầu
    }
  };

  // Xử lý khi người dùng thay đổi lựa chọn nhà cung cấp
  const handleSupplierChange = (supplier) => {
    // Kiểm tra nếu nhà cung cấp đã được chọn, thì bỏ chọn, ngược lại thêm vào danh sách đã chọn
    const updated = selectedSuppliers.includes(supplier)
      ? selectedSuppliers.filter((s) => s !== supplier) // Bỏ nhà cung cấp nếu đã chọn
      : [...selectedSuppliers, supplier]; // Thêm nhà cung cấp nếu chưa chọn
    setSelectedSuppliers(updated); // Cập nhật state nhà cung cấp đã chọn
    // Gọi onFilterChange để truyền bộ lọc mới ra ngoài
    onFilterChange({
      suppliers: updated, // Cập nhật nhà cung cấp mới
      categories: selectedCategories, // Giữ nguyên danh mục
      rating: selectedRating, // Giữ nguyên đánh giá
    });
  };

  // Xử lý khi người dùng thay đổi lựa chọn danh mục
  const handleCategoryChange = (category) => {
    // Tương tự như với nhà cung cấp: nếu đã chọn thì bỏ chọn, nếu chưa thì thêm vào
    const updated = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(updated); // Cập nhật state danh mục đã chọn
    // Gọi onFilterChange để truyền bộ lọc mới ra ngoài
    onFilterChange({
      suppliers: selectedSuppliers, // Giữ nguyên nhà cung cấp
      categories: updated, // Cập nhật danh mục mới
      rating: selectedRating, // Giữ nguyên đánh giá
    });
  };

  // Xử lý khi người dùng thay đổi lựa chọn đánh giá
  const handleRatingChange = (rating) => {
    setSelectedRating([rating]); // Giới hạn người dùng chỉ chọn một mức đánh giá
    // Gọi onFilterChange để truyền bộ lọc mới ra ngoài
    onFilterChange({
      suppliers: selectedSuppliers, // Giữ nguyên nhà cung cấp
      categories: selectedCategories, // Giữ nguyên danh mục
      rating: [rating], // Cập nhật đánh giá mới
    });
  };

  return (
    <div className="col-lg-4 d-lg-block d-none">
      {/* Sidebar chứa các bộ lọc */}
      <div className="sidebar border rounded p-3">
        {/* Bộ lọc danh mục sản phẩm */}
        <h4>Danh Mục Sản Phẩm</h4>
        <ul className="list-unstyled">
          {visibleCategories.map((category, index) => (
            <li key={index}>
              {/* Hiển thị danh mục và xử lý khi người dùng chọn danh mục */}
              <a
                href="#!"
                className={
                  selectedCategories.includes(category) ? "active" : ""
                }
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </a>
            </li>
          ))}
        </ul>

        {/* Bộ lọc nhà cung cấp */}
        <h4>Nhà cung cấp</h4>
        <ul className="list-unstyled">
          {visibleSuppliers.map((supplier, index) => (
            <li key={index}>
              {/* Checkbox để người dùng chọn hoặc bỏ chọn nhà cung cấp */}
              <input
                type="checkbox"
                id={`supplier-${index}`}
                checked={selectedSuppliers.includes(supplier)} // Kiểm tra nếu đã chọn
                onChange={() => handleSupplierChange(supplier)} // Xử lý thay đổi
              />
              <label htmlFor={`supplier-${index}`}>{supplier}</label>
            </li>
          ))}
          <li>
            {/* Nút để hiển thị thêm nhà cung cấp hoặc thu gọn */}
            <button
              className="btn btn-link d-inline-flex align-items-center"
              onClick={handleShowMore}
            >
              {showMoreSuppliers ? "Thu gọn" : "Xem thêm"}{" "}
              {/* Thay đổi nút hiển thị */}
              <i
                className={`bi ${
                  showMoreSuppliers ? "bi-chevron-up" : "bi-chevron-down"
                } ms-2`}
              ></i>
            </button>
          </li>
        </ul>

        {/* Bộ lọc đánh giá */}
        <h4>Đánh giá</h4>
        <ul className="list-unstyled rating">
          {/* Các lựa chọn đánh giá, từ 3 đến 5 sao */}
          <li>
            <button
              className="btn btn-link"
              onClick={() => handleRatingChange(5)}
            >
              <i className="fa fa-star text-warning"></i>
              <i className="fa fa-star text-warning"></i>
              <i className="fa fa-star text-warning"></i>
              <i className="fa fa-star text-warning"></i>
              <i className="fa fa-star text-warning"></i> từ 5 sao
            </button>
          </li>
          <li>
            <button
              className="btn btn-link"
              onClick={() => handleRatingChange(4)}
            >
              <i className="fa fa-star text-warning"></i>
              <i className="fa fa-star text-warning"></i>
              <i className="fa fa-star text-warning"></i>
              <i className="fa fa-star text-warning"></i>
              <i className="fa fa-star text-muted"></i> từ 4 sao
            </button>
          </li>
          <li>
            <button
              className="btn btn-link"
              onClick={() => handleRatingChange(3)}
            >
              <i className="fa fa-star text-warning"></i>
              <i className="fa fa-star text-warning"></i>
              <i className="fa fa-star text-warning"></i>
              <i className="fa fa-star text-muted"></i>
              <i className="fa fa-star text-muted"></i> từ 3 sao
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
