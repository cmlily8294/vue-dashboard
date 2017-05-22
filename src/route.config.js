import Auth from './auth/index';
import navConfig from './nav.config.json';


const registerRoute = (config) => {
    let route = [{
        path: '/',
        component: require('./pages/home.vue'),
        beforeEnter: (to, from, next) => {
            // console.log('home');
            if (Auth.checkLogin()) {
                next();
            }else{
                next('/login');
            }
        },
        children: []
    }];

    function addRoute(page) {
        if (page.type == 'link') {
            return false;
        }
        const component = require('./pages' + page.path + '.vue');
        let child = {
            path: page.path.slice(1),
            meta: {
                title: page.title || page.name,
                description: page.description
            },
            component: component.default || component,
            beforeEnter: (to, from, next) => {
                // console.log(page.name);
                if (Auth.checkLogin()) {
                    if (Auth.checkAuth(page.path)) {
                        next();
                    } else {
                        next('/');
                    }
                    
                }else{
                    next('/login');
                }
            }
        };

        route[0].children.push(child);
    }
    config.map(nav => {
            if (nav && nav.path) {
                addRoute(nav);
            } 
            if (nav.groups) {
                nav.groups.map(group => {
                    group.list.map(page => {
                        addRoute(page);
                    });
                });
            } else if (nav.children) {
                nav.children.map(page => {
                    addRoute(page);
                    if (page.children) {
                        page.children.map(childPage => {
                            addRoute(childPage);
                        })
                    }
                });
            }
        });

    return { route, navs: config };
};

const route = registerRoute(navConfig);

let loginRoute = {
    path: '/login',
    name: '登录',
    component: require('./pages/login.vue')
};

route.route = route.route.concat([loginRoute]);

route.route.push({
    path: '*',
    redirect: '/',
    component: require('./pages/home.vue'),
    beforeEnter: (to, from, next) => {
        if (Auth.checkLogin()) {
            if (Auth.checkAuth(page.path)) {
                next();
            } else {
                next('/');
            }
        }else{
            next('/login');
        }
    }
});

export const navs = route.navs;
export default route.route;
