import Vue from 'vue';
import Vuex from 'vuex';
import app from '../store/app';
import auth from './auth';
Vue.use(Vuex);


let store = new Vuex.Store({
    state : {},
    actions :{},
    mutations : {},
    modules : {
        auth, app
    },
    getters : {}

})
export default store

