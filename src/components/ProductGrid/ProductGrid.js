import React, { useState, useEffect } from 'react';
import { getData } from '../../services/productServices'; // Import hàm từ service
import './ProductGrid.css';

const ProductGrid = ({ currentPage, itemsPerPage, filters }) => {

    // Khai báo state để lưu trữ dữ liệu sản phẩm
    const [products, setProducts] = useState([]);
    const [paginatedProducts, setPaginatedProducts] = useState([]);

    // State để theo dõi kích thước màn hình
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 992);

    // Sử dụng useEffect để theo dõi thay đổi kích thước màn hình
    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Sử dụng useEffect để gọi API khi component được render lần đầu tiên
    useEffect(() => {
        // Thay đổi URL này thành URL của JSON server của bạn
        const fetchProducts = async () => {
            try {
                const data = await getData(); // Gọi service để lấy dữ liệu
                setProducts(data);
            } catch (error) {
                console.error('Có lỗi xảy ra khi lấy dữ liệu sản phẩm:', error);
            }
        };

        fetchProducts();
    }, []); // Chạy effect này chỉ khi component được mount

    useEffect(() => {
        let filteredProducts = products;

        // Áp dụng các bộ lọc
        if (filters.suppliers.length > 0) {
            filteredProducts = filteredProducts.filter(product =>
                filters.suppliers.includes(product.current_seller.name)
            );
        }

        if (filters.categories.length > 0) {
            filteredProducts = filteredProducts.filter(product =>
                filters.categories.includes(product.categories.name)
            );
        }

        if (filters.rating.length > 0) {
            filteredProducts = filteredProducts.filter(product =>
                product.rating_average >= filters.rating[0]
            );
        }

        // Nếu màn hình nhỏ thì không phân trang, hiển thị tất cả sản phẩm
        if (isSmallScreen) {
            setPaginatedProducts(filteredProducts);
        } else {
            // Phân trang cho màn hình lớn
            const start = (currentPage - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            setPaginatedProducts(filteredProducts.slice(start, end));
        }
    }, [currentPage, products, itemsPerPage, filters, isSmallScreen]);

    return (
        <div className="col-lg-8">
            <h3 className="category-title d-lg-block d-none mb-4">Nhà Sách Tiki</h3>
            <div className="row g-3">
                {paginatedProducts.map(product => (
                    <div key={product.id} className="product-item card col-lg-2-custom col-md-6 col-6">
                        <img src={product.images[0]?.small_url || require('../../images/image.png')} alt={product.name} />

                        <div className="product-title m-2">{product.name}</div>

                        <div className="product-rating m-2 mr-2">
                            {product.rating_average > 0 && [...Array(5)].map((_, i) => (
                                <i key={i} className={`fa fa-star ${i < product.rating_average ? 'text-warning' : ''}`}></i>
                            ))}
                            <span className="product-sold">
                                Đã bán {product.sold > 5000 ? `${product.sold}+` : product.sold || 0}
                            </span>
                        </div>

                        <div className="product-price m-2 fs-5">
                            {product.list_price.toLocaleString()}đ
                            {product.original_price > product.list_price && (
                                <span className="product-discount m-2">
                                    -{Math.round(((product.original_price - product.list_price) / product.original_price) * 100)}%
                                </span>
                            )}
                        </div>

                        <div className="product-shipping text-center">
                            <hr />Giao siêu tốc 2h
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductGrid;