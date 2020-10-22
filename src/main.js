import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueRouter from "vue-router";
import store from './store'

import * as VeeValidate from 'vee-validate';
import VueSweetalert2 from 'vue-sweetalert2';

Vue.config.productionTip = false

Vue.use(VeeValidate);
Vue.use(VueSweetalert2);
Vue.use(VueRouter);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')