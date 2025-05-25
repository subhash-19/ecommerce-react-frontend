import axios from "axios";

export default class ApiService {

    static BASE_URL = "http://localhost:8085";

    static getHeader() {
        const token = localStorage.getItem("token");
        return {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        };
    }

    /**AUTH && USERS API */
    static async registerUser(registeration) {
        const response = await axios.post(`${this.BASE_URL}/auth/register`, registeration);
        return response.data;
    }

    static async loginUser(loginDetails) {
        const response = await axios.post(`${this.BASE_URL}/auth/login`, loginDetails);

        if (response.data?.token) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("email", response.data.email); // Save email
            localStorage.setItem("role", response.data.role);

            // Load that user's cart from localStorage
            const cartKey = `cart_${response.data.email}`;
            const savedCart = localStorage.getItem(cartKey);
            if (savedCart) {
                localStorage.setItem("cart", savedCart);
            } else {
                localStorage.setItem("cart", JSON.stringify([]));
            }
        }

        return response.data;
    }
    
    static async getLoggedInUserInfo() {
        const response = await axios.get(`${this.BASE_URL}/user/my-info`, {
            headers: this.getHeader()
        });
        return response.data;
    }


    /**PRODUCT ENDPOINT */
    static async addProduct(formData) {
        const response = await axios.post(`${this.BASE_URL}/product/create`, formData, {
            headers: {
                ...this.getHeader(),
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    }

    static async updateProduct(productId, formData) {
        const response = await axios.put(`${this.BASE_URL}/product/update/${productId}`, formData, {
            headers: {
                ...this.getHeader(),
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    }

    static async getAllProducts() {
        const response = await axios.get(`${this.BASE_URL}/product/get-all`);
        return response.data;
    }

    static async searchProducts(searchValue) {
        const response = await axios.get(`${this.BASE_URL}/product/search`, {
            params: {searchValue}
        });
        return response.data;
    }

    static async getAllProductsByCategoryId(categoryId) {
        const response = await axios.get(`${this.BASE_URL}/product/get-by-category-id/${categoryId}`);
        return response.data;
    }

    static async getProductById(productId) {
        const response = await axios.get(`${this.BASE_URL}/product/get-by-product-id/${productId}`);
        return response.data;
    }

    static async deleteProduct(productId) {
        const response = await axios.delete(`${this.BASE_URL}/product/delete/${productId}`, {
            headers: this.getHeader()
        });
        return response.data;
    }


    /**CATEGORY */
    static async createCategory(body) {
        const response = await axios.post(`${this.BASE_URL}/category/create`, body, {
            headers: this.getHeader()
        });
        return response.data;
    }

    static async GetAllCategory() {
        const response = await axios.get(`${this.BASE_URL}/category/get-all`);
        return response.data;
    }

    static async getCategoryById(categoryId) {
        const response = await axios.get(`${this.BASE_URL}/category/get-category-by-id/${categoryId}`);
        return response.data;
    }

    static async updateCategory(categoryId, body) {
        const response = await axios.put(`${this.BASE_URL}/category/update/${categoryId}`, body, {
            headers: this.getHeader()
        });
        return response.data;
    }

    static async deleteCategory(categoryId) {
        const response = await axios.delete(`${this.BASE_URL}/category/delete/${categoryId}`, {
            headers: this.getHeader()
        });
        return response.data;
    }

    /** CART */
    static async addToCart(productId, quantity) {
        const response = await axios.post(`${this.BASE_URL}/cart/add`, null, {
            headers: this.getHeader(),
            params: { productId, quantity }
        });
        return response.data;
    }

    static async getCart() {
        const response = await axios.get(`${this.BASE_URL}/cart/my-cart`, {
            headers: this.getHeader()
        });
        return response.data;
    }

    static async clearCart() {
        const response = await axios.delete(`${this.BASE_URL}/cart/clear`, {
            headers: this.getHeader()
        });
        return response.data;
    }

    static async removeItemFromCart(productId) {
        const response = await axios.delete(`${this.BASE_URL}/cart/remove`, {
            headers: this.getHeader(),
            params: { productId }
        });
        return response.data;
    }

    /**ORDER */
    static async createOrder(body) {
        const response = await axios.post(`${this.BASE_URL}/order/create`, body, {
            headers: this.getHeader()
        });
        return response.data;
    }

    static async getAllOrders() {
        const response = await axios.get(`${this.BASE_URL}/order/filter`, {
            headers: this.getHeader()
        });
        return response.data;
    }

    static async getOrderItemBtId(itemId) {
        const response = await axios.get(`${this.BASE_URL}/order/filter`, {
            headers: this.getHeader(),
            params: {itemId}
        });
        return response.data;
    }

    static async getAllOrderItemByStatus(status) {
        const response = await axios.get(`${this.BASE_URL}/order/filter`, {
            headers: this.getHeader(),
            params: {status}
        });
        return response.data;
    }

    static async updateOrderItemStatus(orderItemId, status) {
        const response = await axios.put(`${this.BASE_URL}/order/update-item-status/${orderItemId}`,
            {}, // empty body
            { params: { status } } // config object with query params
        );
        return response.data;
    }    


    /**ADDRESS */
    static async saveAddress(body) {
        const response = await axios.post(`${this.BASE_URL}/address/save`, body, {
            headers: this.getHeader()
        });
        return response.data;
    }

    /**AUTHENTICATION CHECKERS */
    static logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('email');
        localStorage.removeItem('cart');
    }

    static isAuthenticated() {
        const token = localStorage.getItem('token')
        return !!token
    }

    static isAdmin() {
        const role = localStorage.getItem('role')
        return role === 'ADMIN'
    }   
}