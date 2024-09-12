import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getData } from "../../services/productServices";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { productId } = useParams(); // Lấy productId từ Url
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const initialImage = product?.images?.[0]?.base_url || "";
  const [mainImage, setMainImage] = useState(initialImage);

  const descriptionRef = useRef(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getData();
        const selectedProduct = data.find((p) => p.id === parseInt(productId)); // Tìm sp theo id
        if (selectedProduct) {
          setProduct(selectedProduct);
          setMainImage(selectedProduct.images[0]?.base_url || ""); // Set the initial main image
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product || !product.images || product.images.length === 0) {
    return <div>Loading...</div>; // Hoặc một giao diện khác khi dữ liệu chưa có
  }

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleImageClick = (imageUrl) => {
    setMainImage(imageUrl);
  };

  const handleScrollToDescription = () => {
    if (descriptionRef.current) {
      descriptionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="container">
      <div className="row">
        {/* Cột 1: Đặc điểm nổi bật */}
        <div className="col-md-4 d-lg-block d-none">
          <div className="card">
            <img src={mainImage} className="card-img-top pt-3" alt={product?.name || "Product Image"} />
            <div className="card-footer">
              <div className="d-flex flex-wrap">
                {product?.images?.map((image, index) => (
                  <img
                    key={index}
                    src={image.small_url} // Use the thumbnail URL for small image previews
                    alt={`Thumbnail ${index}`}
                    className="me-2 mb-2"
                    style={{ cursor: "pointer", width: "40px", height: "auto" }}
                    onClick={() => handleImageClick(image.base_url)}
                  />
                ))}
              </div>
            </div>
            <div className="card-body">
              <h6 className="card-title">Đặc điểm nổi bật</h6>
              <ul>
                <li>Kích thước lớn và bìa cứng, tạo cảm giác sang trọng và bền bỉ.</li>
              </ul>
              <p className="btn btn-link text-decoration-none text-dark" onClick={handleScrollToDescription}>
                Xem thêm Tóm tắt nội dung sách
              </p>
            </div>
          </div>
        </div>

        {/* Cột 2 và Cột 3: Thông tin chi tiết và Mô tả sản phẩm */}
        <div className="col-md-5">
          <div className="row">
            {/* Thông tin chi tiết */}
            <div className="col-md-12 mb-3 border pt-3">
              <p className="mb-2">
                <div className="d-lg-none">
                  <img src={mainImage} className="card-img-top pt-3" alt={product?.name || "Product Image"} />
                  <div className="d-flex flex-wrap">
                    {product?.images?.map((image, index) => (
                      <img
                        key={index}
                        src={image.small_url} // Use the thumbnail URL for small image previews
                        alt={`Thumbnail ${index}`}
                        className="me-2 mb-2"
                        style={{ cursor: "pointer", width: "40px", height: "auto" }}
                        onClick={() => handleImageClick(image.base_url)}
                      />
                    ))}
                  </div>
                </div>
                <img src={require("../../images/chinhhang.png")} className="chinh-hang" alt="chinh hang"></img>
                Tac gia:{" "}
                {product.authors && product.authors.length > 0 ? (
                  product.authors.map((author) => (
                    <a className="text-decoration-none" key={author.id} href={`#${author.slug}`}>
                      {author.name}
                    </a>
                  ))
                ) : (
                  <span>Chưa cập nhật tác giả</span>
                )}
              </p>
              <p className="mb-2 fw-bold fs-5">{product.name}</p>
              <p className="d-flex">
                <span className="fw-bold me-1">{product.rating_average}</span>
                <span className="me-2">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className={`fa fa-star ${i < product.rating_average ? "text-warning" : ""}`}></i>
                  ))}
                </span>
                {product.quantity_sold && product.quantity_sold.value > 1000
                  ? " " + product.quantity_sold.text
                  : product.quantity_sold
                  ? " Da ban " + product.quantity_sold.value
                  : " Da ban " + 0}{" "}
              </p>
              <p className="fs-2 fw-bold mb-5">
                {product.list_price.toLocaleString()}đ
                {product.original_price > product.list_price && (
                  <span className="m-2 fs-5 fw-normal">
                    -{Math.round(((product.original_price - product.list_price) / product.original_price) * 100)}%
                  </span>
                )}
              </p>

              <h5 className="fw-bold">Thông tin chi tiết</h5>
              <table className="table">
                {/* Kiểm tra và hiển thị thông tin chi tiết */}
                {product.specifications &&
                  product.specifications.length > 0 &&
                  product.specifications[0].attributes.map((attr, index) => (
                    <React.Fragment key={attr.code}>
                      <tr>
                        <th>{attr.name}</th>
                        <td style={{ paddingLeft: "80px" }}>
                          {attr.value.startsWith("<") && attr.value.endsWith(">") ? (
                            <div
                              style={{ marginTop: "-10px", marginBottom: "-25px", marginLeft: "-9px" }}
                              dangerouslySetInnerHTML={{ __html: attr.value }}
                            />
                          ) : (
                            attr.value
                          )}
                        </td>
                      </tr>
                      {index !== product.specifications[0].attributes.length - 1 && (
                        <tr>
                          <td style={{ height: "5px", padding: "0" }} colSpan="2">
                            <hr style={{ margin: "0" }} />
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
              </table>
            </div>

            <div className="col-md-3 d-lg-none">
              <div className="card">
                <div className="card-body">
                  <h5>Số Lượng</h5>
                  <div className="input-group mb-3">
                    <button className="btn btn-outline-secondary" type="button" onClick={decreaseQuantity}>
                      -
                    </button>
                    <input type="text" className="form-control" value={quantity} readOnly />
                    <button className="btn btn-outline-secondary" type="button" onClick={increaseQuantity}>
                      +
                    </button>
                  </div>
                  <h3 className="text-danger">{parseInt(product.list_price) * quantity}đ</h3>
                  <button className="btn btn-danger w-100 mb-2">Mua ngay</button>
                  <button className="btn btn-outline-primary w-100 mb-2">Thêm vào giỏ</button>
                  <button className="btn btn-outline-primary w-100">Mua trước trả sau</button>
                </div>
              </div>
            </div>

            {/* Mô tả sản phẩm */}
            <div className="col-md-12 border">
              <h5>Mô tả sản phẩm</h5>
              <img src={product.images[0]?.base_url} className="img-fluid" alt={product.name} />
              {/* Hiển thị nội dung từ JSON server */}
              <div dangerouslySetInnerHTML={{ __html: product.description }} ref={descriptionRef}></div>
            </div>
          </div>
        </div>

        {/* Cột 4: Chọn số lượng và Thanh toán */}
        <div className="col-md-3 d-lg-block d-none">
          <div className="card">
            <div className="card-body">
              <h5>Số Lượng</h5>
              <div className="input-group mb-3">
                <button className="btn btn-outline-secondary" type="button" onClick={decreaseQuantity}>
                  -
                </button>
                <input type="text" className="form-control" value={quantity} readOnly />
                <button className="btn btn-outline-secondary" type="button" onClick={increaseQuantity}>
                  +
                </button>
              </div>
              <h3 className="text-danger">{parseInt(product.list_price) * quantity}đ</h3>
              <button className="btn btn-danger w-100 mb-2">Mua ngay</button>
              <button className="btn btn-outline-primary w-100 mb-2">Thêm vào giỏ</button>
              <button className="btn btn-outline-primary w-100">Mua trước trả sau</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
