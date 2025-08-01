import axios from 'axios';

const API_URL = 'https://apptest3-production.up.railway.app/v1/subcategorys'; // Thay đổi đường dẫn API đến subcategory

// Khởi tạo instance axios
const getToken = () => {
    return localStorage.getItem('token'); // Hoặc sử dụng sessionStorage nếu cần
};

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Authorization': `Bearer ${getToken()}` // Thêm token vào header
    }
});

// Cập nhật token trong headers
axiosInstance.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

// Lấy danh sách danh mục con
export const getAllSubcategories = async () => { // Đổi tên hàm
    try {
        const response = await axiosInstance.get('/'); // Vẫn giữ nguyên endpoint
        return response.data;
    } catch (error) {
        console.error("Error fetching subcategories:", error.response.data);
        throw error;
    }
};

// Thêm danh mục con
export const addSubcategory = async (subcategoryData) => { // Đổi tên hàm
    try {
        const response = await axiosInstance.post('/create_sub_category', subcategoryData); // Đổi endpoint
        return response.data;
    } catch (error) {
        console.error("Error adding subcategory:", error.response.data);
        throw error;
    }
};

// Cập nhật danh mục con
export const updateSubcategory = async (subcategoryId, subcategoryData) => { // Đổi tên hàm
    try {
        const response = await axiosInstance.put(`/${subcategoryId}/update_sub_category`, subcategoryData); // Đổi endpoint
        return response.data;
    } catch (error) {
        console.error("Error updating subcategory:", error.response.data);
        throw error;
    }
};

// Xóa danh mục con
export const deleteSubcategory = async (subcategoryId) => { // Đổi tên hàm
    try {
        const response = await axiosInstance.delete(`/${subcategoryId}/delete_sub_category`); // Đổi endpoint
        return response.data;
    } catch (error) {
        console.error("Error deleting subcategory:", error.response.data);
        throw error;
    }
};


export const searchSubcategories = async (searchTerm) => {
    try {
        const response = await axiosInstance.get('/search', {
            params: { keyword: searchTerm },
        });
        return response.data;
    } catch (error) {
        console.error("Error searching subcategories:", error.response?.data || error.message);
        throw error;
    }
};

export const getProductsBySubcategory = async (subcategoryId) => {
    const response = await axios.get(`${API_URL}/products?subcategoryId=${subcategoryId}`);
    return response.data; // Hoặc xử lý dữ liệu theo yêu cầu của bạn
};

