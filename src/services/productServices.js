import axios from 'axios';

// Cấu hình instance của axios
const api = axios.create({
    baseURL: 'https://h5ltj4-8080.csb.app', // URL của endpoint chính
    timeout: 10000, // Thời gian timeout (10 giây)
});

// Lấy danh sách sản phẩm
export const getData = async () => {
    try {
        const response = await api.get('/books');
        return response.data;
    } catch (error) {
        console.error('Có lỗi xảy ra khi gọi API:', error);
        throw error;
    }
};