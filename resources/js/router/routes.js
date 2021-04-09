import categories from '../pages/admin/categories'
import dashboard from '../pages/admin/index'
import posts from '../pages/admin/posts'
import tags from '../pages/admin/tags'
import Login from '../pages/auth/login'
import registration from '../pages/auth/register'
import Index from '../pages/index'
import PageNotFound from '../pages/notFound.vue'
import single from '../pages/single.vue'
export const routes = [
    {
        path : '/',
        component : Index,
        name : 'home'
    },
    {
        path : "/post/:slug",
        component : single,
        name : "single"
    },
    {
        path : "/login",
        component : Login,
        name : 'login',
        meta: { requiresGuest: true }

    },
    {
        path : '/register',
        component : registration,
        name : 'register',
        meta: { requiresGuest: true }

    },
    {
        path : '/admin',
        component : dashboard,
        name : "admin.dashboard",
        meta: { requiresAuth: true }
    },
    {
        path : '/admin/categories',
        component : categories,
        name : 'admin.categories',
        meta: { requiresAuth: true }
    },
    {
        path : '/admin/tags',
        component : tags,
        name : 'admin.tags',
        meta: { requiresAuth: true }
    },
    {
        path : '/admin/posts',
        component : posts,
        name : 'admin.posts',
        meta: { requiresAuth: true }
    },
    {
        path : '/404',
        component: PageNotFound,
        name : "notFound"
    },

    {
        path: "*",
        redirect: { name: 'notFound' }
    }

]
