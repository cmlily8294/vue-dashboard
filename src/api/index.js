import * as api from './api';
export default Object.assign({
    install(Vue,options) {
        Vue.prototype.$api = this;
    }
},api);