import { http } from "../plugins/http";
export default {
    namespaced: true,
    state: {
        categories: [],
        tags : [],
        posts : []
    },
    getters: {
        allCategories(state) {
            return state.categories;
        },
        allTags(state){
            return state.tags
        },
        allPosts(state){
            return state.posts;
        }
    },
    mutations: {
        SET_CATEGORIES(state, categories) {
            state.categories = categories;
        },
        SET_TAGS(state, tags){
            state.tags = tags
        },
        SET_POSTS(state, posts){
            state.posts = posts
        }
    },
    actions: {
        // categories
        categories({ commit }) {
            return new Promise((resolve, reject) => {
                http.get("/category").then(
                    ({ data }) => {
                        let sorted = data.sort((a, b) => b.id - a.id);
                        commit("SET_CATEGORIES", sorted);
                        resolve({ messages: "data fetched Successfully" });
                    },
                    error => {
                        reject(error);
                    }
                );
            });
        },
        addCategory({}, data) {
            return new Promise((resolve, reject) => {
                http.post("/category", data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    }
                );
            });
        },
        editCategory({}, category) {
            let { id } = category;

            return new Promise((resolve, reject) => {
                http.put("/category/" + id, category).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    }
                );
            });
        },
        deleteCategory({}, id) {
            return new Promise((resolve, reject) => {
                http.delete("/category/" + id).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    }
                );
            });
        },

        // tags
        tags({ commit }) {
            return new Promise((resolve, reject) => {
                http.get("/tag").then(
                    ({ data }) => {
                        if(!data) return
                        let sorted = data.sort((a, b) => b.id - a.id);
                        commit("SET_TAGS", sorted);
                        resolve({ messages: "data fetched Successfully" });
                    },
                    error => {
                        reject(error);
                    }
                );
            });
        },
        addTags({}, data) {
            return new Promise((resolve, reject) => {
                http.post("/tag", data).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    }
                );
            });
        },
        editTags({}, category) {
            let { id } = category;

            return new Promise((resolve, reject) => {
                http.put("/tag/" + id, category).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    }
                );
            });
        },
        deleteTags({}, id) {
            return new Promise((resolve, reject) => {
                http.delete("/tag/" + id).then(
                    res => {
                        resolve(res);
                    },
                    error => {
                        reject(error);
                    }
                );
            });
        },
        // Posts
        posts({commit}){
            return new Promise((resolve, reject)=>{
                http.get('/posts').then(({data}) =>{
                    let sorted = data.sort((a, b) => b.id - a.id);
                    commit('SET_POSTS', sorted);
                    resolve({ messages: "data fetched Successfully" });
                }, error => {
                    reject(error)
                }
                )
            })
        },
        addNewPost({}, data){
            return new Promise((resolve, reject) => {
                http.post('/post', data).then(res=>{
                    resolve(res)
                },
                error => {
                    reject(error);
                }
                )
            })
        },
        editPost({}, data){
            return new Promise((resolve, reject) => {
                http.put('/post/'+data.id, data).then((res)=>{
                    resolve(res)
                },
                error => reject(error)
                )
            })
        },
        deletePost({}, id){
            return new Promise((resolve, reject) => {
                http.delete('/post/'+id).then(e => {
                    resolve(e)
                },
                error => {
                    reject(error)
                }
                )
            })
        }

    }
};
