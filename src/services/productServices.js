// Import thư viện axios để thực hiện các yêu cầu HTTP
import axios from "axios";

// Cấu hình instance của axios
const api = axios.create({
  // URL chính của API (endpoint chính)
  baseURL: "https://h5ltj4-8080.csb.app",
  
  // Thời gian tối đa cho một yêu cầu trước khi nó bị hủy (timeout là 10 giây)
  timeout: 10000,
});

// Hàm lấy danh sách sản phẩm từ API
export const getData = async () => {
  try {
    // Thực hiện yêu cầu GET đến endpoint "/books"
    const response = await api.get("/books");
    
    // Trả về dữ liệu từ response (response.data)
    return response.data;
  } catch (error) {
    // In ra lỗi nếu xảy ra trong quá trình gọi API
    console.error("Có lỗi xảy ra khi gọi API:", error);
    
    // Ném lỗi để xử lý ở cấp cao hơn nếu cần
    throw error;
  }
};
