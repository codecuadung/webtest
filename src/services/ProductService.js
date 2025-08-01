import axios from "axios";

const API_URL = 'https://apptest3-production.up.railway.app/v1/products'; // Đổi URL thành endpoint địa chỉ

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

export const getAllProducts = async () => {
    try {
        const response = await axiosInstance.get('/');
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error.response.data);
        throw error;
    }
};

export const addProduct = async (productData) => {
    try {
        const response = await axiosInstance.post(`/create_product`, productData); // Endpoint to add product
        return response.data;
    } catch (error) {
        console.error('Error while adding product:', error);
        throw error;
    }
};

export const addVariantToProduct = async (productId, variantData) => {
    try {
        const response = await axiosInstance.post(`/create_variant`, { productId, variant: variantData }); // Gửi productId và variant
        return response.data;
    } catch (error) {
        console.error('Error while adding variant:', error.response.data);
        throw error;
    }
};

// Hàm lấy sản phẩm theo ID
export const getProductById = async (productId) => {
    try {
        const response = await axiosInstance.get(`/${productId}`); // Gửi yêu cầu GET đến endpoint với productId
        return response.data;
    } catch (error) {
        console.error('Error fetching product by ID:', error.response.data);
        throw error;
    }
};

export const updateProduct = async (productId, productData) => {
    try {
        const response = await axiosInstance.put(`/update_product/${productId}`, productData); // Gửi yêu cầu PUT
        return response.data;
    } catch (error) {
        console.error('Error while updating product:', error.response.data);
        throw error;
    }
};

export const deleteProduct = async (productId) => {
    try {
        const response = await axiosInstance.delete(`/${productId}/delete_product`); // gửi yêu cầu delete
        return response.data;
    } catch (error) {
        console.error('Error while removing product:', error.response.data);
        throw error;
    }
};

// Trong hàm deleteVariants
export const deleteVariants = async (variantId, productId) => {
    console.log('Variant ID:', variantId); // Log variantId
console.log('Product ID:', productId); // Log productId

    try {
        const url = `${productId}/variants/${variantId}`;
        console.log('URL DELETE:', url); // Kiểm tra URL
        const response = await axiosInstance.delete(url); // Đảm bảo URL này có variantId
        return response.data;
    } catch (error) {
        console.error('Error while removing variants:', error);
        throw error;
    }
};



export const searchProducts = async (searchTerm) => { // Đổi tên hàm
    try {
        const response = await axiosInstance.get('/search_products', {
            params: { keyword: searchTerm }
        });
        return response.data;
    } catch (error) {
        console.error("Error searching products:", error.response.data);
        throw error;
    }
};



