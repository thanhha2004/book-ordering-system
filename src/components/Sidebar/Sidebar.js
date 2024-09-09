import React, { useState, useEffect } from "react";
import './Sidebar.css';
import { getData } from '../../services/productServices';

const Sidebar = ({ onFilterChange }) => {
    const [allSuppliers, setAllSuppliers] = useState([]);
    const [visibleCategories, setVisibleCategories] = useState([]);
    const [visibleSuppliers, setVisibleSuppliers] = useState([]);
    const [showMoreSuppliers, setShowMoreSuppliers] = useState(false);
    const [selectedSuppliers, setSelectedSuppliers] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedRating, setSelectedRating] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataList = await getData();
                const suppliers = Array.from(new Set(dataList.map(product => product.current_seller.name)));
                setAllSuppliers(suppliers);
                setVisibleSuppliers(suppliers.slice(0, 5));

                const categories = Array.from(new Set(dataList.map(product => product.categories.name)));
                setVisibleCategories(categories.slice(0, 5));
            } catch (error) {
                console.error('Có lỗi xảy ra khi lấy dữ liệu:', error);
            }
        };

        fetchData();
    }, []);

    const handleShowMore = () => {
        setShowMoreSuppliers(!showMoreSuppliers);
        if (!showMoreSuppliers) {
            setVisibleSuppliers(allSuppliers);
        } else {
            setVisibleSuppliers(allSuppliers.slice(0, 5));
        }
    };

    const handleSupplierChange = (supplier) => {
        const updated = selectedSuppliers.includes(supplier)
            ? selectedSuppliers.filter(s => s !== supplier)
            : [...selectedSuppliers, supplier];
        setSelectedSuppliers(updated);
        onFilterChange({ suppliers: updated, categories: selectedCategories, rating: selectedRating });
    };

    const handleCategoryChange = (category) => {
        const updated = selectedCategories.includes(category)
            ? selectedCategories.filter(c => c !== category)
            : [...selectedCategories, category];
        setSelectedCategories(updated);
        onFilterChange({ suppliers: selectedSuppliers, categories: updated, rating: selectedRating });
    };

    const handleRatingChange = (rating) => {
        setSelectedRating([rating]); // Assuming single rating filter
        onFilterChange({ suppliers: selectedSuppliers, categories: selectedCategories, rating: [rating] });
    };

    return (
        <div className="col-lg-4 d-lg-block d-none">
            <div className="sidebar border rounded p-3">
                <h4>Danh Mục Sản Phẩm</h4>
                <ul className="list-unstyled">
                    {visibleCategories.map((category, index) => (
                        <li key={index}>
                            <a
                                href="#!"
                                className={selectedCategories.includes(category) ? 'active' : ''}
                                onClick={() => handleCategoryChange(category)}
                            >
                                {category}
                            </a>
                        </li>
                    ))}
                </ul>

                <h4>Nhà cung cấp</h4>
                <ul className="list-unstyled">
                    {visibleSuppliers.map((supplier, index) => (
                        <li key={index}>
                            <input
                                type="checkbox"
                                id={`supplier-${index}`}
                                checked={selectedSuppliers.includes(supplier)}
                                onChange={() => handleSupplierChange(supplier)}
                            />
                            <label htmlFor={`supplier-${index}`}>{supplier}</label>
                        </li>
                    ))}
                    <li>
                        <button className="btn btn-link d-inline-flex align-items-center" onClick={handleShowMore}>
                            {showMoreSuppliers ? 'Thu gọn' : 'Xem thêm'}
                            <i className={`bi ${showMoreSuppliers ? 'bi-chevron-up' : 'bi-chevron-down'} ms-2`}></i>
                        </button>
                    </li>
                </ul>

                <h4>Đánh giá</h4>
                <ul className="list-unstyled rating">
                    <li>
                        <button className="btn btn-link" onClick={() => handleRatingChange(5)}>
                            <i className="fa fa-star text-warning"></i><i className="fa fa-star text-warning"></i><i className="fa fa-star text-warning"></i><i className="fa fa-star text-warning"></i><i className="fa fa-star text-warning"></i> tu 5 sao
                        </button>
                    </li>
                    <li>
                        <button className="btn btn-link" onClick={() => handleRatingChange(4)}>
                            <i className="fa fa-star text-warning"></i><i className="fa fa-star text-warning"></i><i className="fa fa-star text-warning"></i><i className="fa fa-star text-warning"></i><i className="fa fa-star text-muted"></i> tu 4 sao
                        </button>
                    </li>
                    <li>
                        <button className="btn btn-link" onClick={() => handleRatingChange(3)}>
                            <i className="fa fa-star text-warning"></i><i className="fa fa-star text-warning"></i><i className="fa fa-star text-warning"></i><i className="fa fa-star text-muted"></i><i className="fa fa-star text-muted"></i> tu 3 sao
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;