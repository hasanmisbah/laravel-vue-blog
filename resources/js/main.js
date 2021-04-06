import Vue from 'vue';
import './app.js';
import app from './app.vue';
import './plugins/index';
import router from './router';
import store from './store/';


new Vue({
    el: '#app',
    store,
    router,
    render: h => h(app)
})
