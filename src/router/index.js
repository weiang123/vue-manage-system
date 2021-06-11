import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [{
            path: '/',
            redirect: '/crz/enter'
        },
        {
            path: '/',
            component: () => import( /* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: {
                title: '自述文件'
            },
            children: [{
                    path: '/dashboard',
                    component: () => import( /* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: {
                        title: '系统首页'
                    }
                },
                {
                    path: '/icon',
                    component: () => import( /* webpackChunkName: "icon" */ '../components/page/Icon.vue'),
                    meta: {
                        title: '自定义图标'
                    }
                },
                {
                    path: '/404',
                    component: () => import( /* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: {
                        title: '404'
                    }
                },
                {
                    path: '/403',
                    component: () => import( /* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: {
                        title: '403'
                    }
                },
            ]
        },
        {
            path: '/crz/cont/:username/:add/:txImg',
            component: () => import( /* webpackChunkName: "login" */ '../components/page/erqucrz/content.vue'),
            meta: {
                title: '云社区集中出入管理系统'
            }
        },
        {
            path: '/crz/front',
            component: () => import( /* webpackChunkName: "login" */ '../components/page/erqucrz/front.vue'),
            meta: {
                title: '云社区集中出入管理系统'
            }
        },
        {
            path: '/crz/enter',
            component: () => import( /* webpackChunkName: "login" */ '../components/page/erqucrz/enter.vue'),
            meta: {
                title: '云社区集中出入管理系统'
            }
        },
        {
            path: '/login',
            component: () => import( /* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: {
                title: '登录'
            }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});