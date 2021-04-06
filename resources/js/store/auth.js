import { http } from "../plugins/http";
export default {
    namespaced: "true",
    state: {
        user: {
            userID: null,
            name: null,
            email: null,
            role: null
        },
        isLoggedIn : false,
        token: localStorage.getItem("blog_token") || null
    },
    getters: {
        isLoggedIn(state) {
            return state.isLoggedIn;
        },
        getToken(state) {
            return state.token;
        },
        authUser(state) {
            return state.user;
        }
    },
    mutations: {
        SET_AUTH_USER(state, user) {
            state.user = user;
            state.isLoggedIn = true;
        }
    },
    actions: {
        async setAuthUser({ commit }) {
            await http.get("/me").then(({ data }) => {
                let { id, name, email, user_role } = data;
                let user = { id, name, email, user_role };
                commit("SET_AUTH_USER", user);
            });
        },
        async login({ dispatch, state }, user) {
            localStorage.removeItem("blog_token");
            let token = ""
            return new Promise((resolve, reject) => {
                http.post("/login", user).then(({ data }) => {
                    token = data.token
                    state.token = token;
                    localStorage.setItem("blog_token", token);
                    resolve({messages : "Successfully Logged in"});
                }, error => {
                    reject(error)
                });
            })
        },
        async logout({state}){
            return new Promise((resolve, reject) => {
                http.post('logout').then(respose => {
                    localStorage.removeItem("blog_token");
                    state.isLoggedIn = false
                    state.user = {
                        userID: null,
                        name: null,
                        email: null,
                        role: null
                    }
                    resolve({messages : 'Successfully Logged out'})
                }, error => {
                    reject(error)
                }
                )
            })
        },
        async initApp({state, dispatch}){
            if(state.token && !state.isLoggedIn){
                await dispatch('setAuthUser')
            }
            return
        }
    }
};
