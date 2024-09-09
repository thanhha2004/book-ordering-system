import React, { useState, useEffect } from "react";
import Sidebar from '../Sidebar/Sidebar';
import ProductGrid from '../ProductGrid/ProductGrid';
import './Main.css';
import { getData } from '../../services/productServices';

const Main = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Số sản phẩm mỗi trang
    const [totalProducts, setTotalProducts] = useState(0);
    const [filters, setFilters] = useState({ suppliers: [], categories: [], rating: [] });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getData();
                setTotalProducts(data.length);
            } catch (error) {
                console.error('Có lỗi khi lấy dữ liệu sản phẩm:', error);
            }
        };

        fetchProducts();
    }, []);

    const totalPages = Math.ceil(totalProducts / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    // Xác định phạm vi trang hiển thị
    const maxVisiblePages = 3;

    // Điều kiện khi đang ở trang đầu
    let startPage = currentPage <= Math.ceil(maxVisiblePages / 2) ? 1 : Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));

    // Điều kiện khi đang ở trang cuối
    const endPage = currentPage > totalPages - Math.floor(maxVisiblePages / 2) ? totalPages : Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Điều chỉnh startPage nếu endPage nhỏ hơn totalPages
    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return (
        <main>
            <div className="container">
                <div className="row">
                    <Sidebar onFilterChange={handleFilterChange} />

                    {/* Truyền currentPage, itemsPerPage, và filters vào ProductGrid */}
                    <ProductGrid currentPage={currentPage} itemsPerPage={itemsPerPage} filters={filters} />
                </div>
            </div>

            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center mt-5 mb-5 d-lg-flex d-none">
                    
                    {/* <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                    </li> */}

                    {startPage > 1 && (
                        <>
                            <li className="page-item">
                                <button className="page-link" onClick={() => handlePageChange(1)}>1</button>
                            </li>
                            {startPage > 2 && (
                                <li className="page-item disabled">
                                    <span className="page-link">...</span>
                                </li>
                            )}
                        </>
                    )}

                    {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((pageNumber) => (
                        <li key={pageNumber} className={`page-item ${pageNumber === currentPage ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => handlePageChange(pageNumber)}>
                                {pageNumber}
                            </button>
                        </li>
                    ))}

                    {endPage < totalPages && (
                        <>
                            {endPage < totalPages - 1 && (
                                <li className="page-item disabled">
                                    <span className="page-link">...</span>
                                </li>
                            )}
                            <li className={`page-item ${currentPage === totalPages ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(totalPages)}>
                                    {totalPages}
                                </button>
                            </li>
                        </>
                    )}

                    {/* <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
                    </li> */}
                </ul>
            </nav>
        </main>
    );
};

export default Main;