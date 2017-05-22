import Vue from 'vue';
import App from './app';
import Element from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import 'simditor/styles/simditor.css';
import itzElement from 'itz-element';
import Auth from './auth/index';
import Utils from './utils';
import Api from './api/index';
import vueCookie from 'vue-cookie';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import configRouter from './route.config';
import mainHeader from './components/header';
import sideNav from './components/side-nav';
import dualFactor from './components/dualfactor/dual-factor';
import dualFactorD from './components/dualfactor/dualFactor';

Vue.use(Element);
Vue.use(itzElement);
Vue.use(Auth);
Vue.use(Utils);
Vue.use(Api);
Vue.use(vueCookie);

Vue.use(VueResource);
Vue.use(VueRouter);
//layerouts
Vue.component('main-header', mainHeader);
Vue.component('side-nav', sideNav);
Vue.component('dual-factor-el',dualFactor);
Vue.directive('dual-factor',dualFactorD);
const router = new VueRouter({
    mode: 'hash',
    base: __dirname,
    routes: configRouter
});



// Vue.http.options.emulateJSON = true;

Vue.http.options.credentials = true;
Vue.http.interceptors.push(function(request, next) {
  request.headers.set('x-itz-apptoken', 'r&ht0E@*aGeJkNg3d6X3gOM&WWEbGCgO');
  // debugger;
  if (request.params.limit) {
    request.params.page_size = request.params.limit;
    delete request.params.limit;
  }
  if (request.params.page) {
    request.params.page_num = request.params.page;
    delete request.params.page;
  }
  next();
});

Vue.http.interceptors.push((request, next) => {

    next((response) => {
        if ((response.body.code == 10107 || response.body.code == 1623)  && vm.$auth) {
            vm.$alert('用户未登录','提示', {
                type:'error',
                callback: action => {
                    vm.$auth.logout(vm);
                }
            });
            return false;
        }
    });
});

//切换到java的API接口，为兼容性，暂时添加此拦截器，修改返回数据
//参数中带trans的接口会被拦截
Vue.http.interceptors.push((request, next) => {
    next((response) => {
        //debugger;
        var url = response.url;
        if (!response.body) {
            return false;
        }

        //查询列表
        if(url.indexOf('trans=1') != -1) {
            //debugger;
            response.body.info = response.body.msg;
            if (response.body.data ) {
                response.body.data.listInfo = response.body.data.list || [];
                response.body.data.listTotal = response.body.data.total;
            }
        }
        //查看详细信息
        else if(url.indexOf('trans=2') != -1){
            //debugger;
            response.body.info = response.body.msg;
            if (response.body.data ) {
                var data = response.body.data;
                response.body.data = {};
                response.body.data.listInfo = data;
            }
        } else if(url.indexOf('trans=3') != -1) {
            response.body.info = response.body.msg;
            if (response.body.data ) {
                response.body.data.listInfo = response.body.data || [];
                response.body.data.listTotal = response.body.data.total;
            }
        }
    });
});

var vm  = new Vue({ // eslint-disable-line
    render: h => h(App),
    router
}).$mount('#app');
