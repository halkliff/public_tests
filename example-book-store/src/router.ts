import Vue from 'vue';
import Router, {Route, RouteConfig} from 'vue-router';
import Home from './views/Main/Home';
import Login from './views/Login';
import UserService from '@/services/user.service';
import Main from './views/Main';
import BooksAvailable from './views/Main/BooksAvailable';

Vue.use(Router);

const routes: RouteConfig[] = [
    {
        path: '/',
        component: Main,
        children: [
            {
                path: '/',
                name: 'home',
                component: Home,
            },
            {
                path: '/books-available',
                name: 'booksAvailable',
                component: BooksAvailable,
                // children: [
                //     {
                //         path: '/view-book/:id',
                //         name: 'viewBook',
                //         component: () => import(
                //             /*webpackChunkName: "viewBook"*/ './views/Main/ViewBook/ViewBook.vue'
                //             )
                //     }
                // ]
            },
        ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    // },
];

const router: Router =  new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach(async (to: Route, from: Route, next) => {
    if (to.name === 'login') {
        next();
    } else {
        const isLogged = await UserService.instance.isLogged();
        if (!isLogged) {
            next('/login');
        } else {
            next();
        }
    }
});

export default router;
