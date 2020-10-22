import Vue from 'vue'
import VueRouter from 'vue-router'
import Orders from '../views/orders/index'
import Products from '../views/products/index'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Orders',
        component: Orders
    },
    {
        path: '/order/:id_order',
        name: 'Order',
        component: Products,
        props: true
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router