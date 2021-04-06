import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';
Vue.use(Vuex);


let store = new Vuex.Store({
    state : {},
    actions :{},
    mutations : {},
    modules : {
        auth
    },
    getters : {}

})
export default store

