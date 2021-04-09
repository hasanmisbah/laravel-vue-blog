import axios from "axios";
import Vue from "vue";
let token = localStorage.getItem("blog_token") || null

const http = axios.create({
    baseURL: "http://vue-blog.test/api/",
    withCredentials: true,
    headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json"
    }
});
if (token) {
    http.interceptors.request.use(config => {
        config.headers.common['Authorization'] = `Bearer ${token}`;
        return config;
    });
}

Vue.prototype.$http = http;
export { http };

