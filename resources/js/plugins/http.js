import axios from "axios";
import Vue from "vue";
import store from '../store';
let token = store.getters['auth/getToken']

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
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    });
}

Vue.prototype.$http = http;
export { http };

