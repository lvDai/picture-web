// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueI18n from 'vue-i18n'
import request from './assets/js/request'
import utility from './assets/js//utility'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueLazyLoad from 'vue-lazyload'


const imageURl = "http://192.168.31.17/"

Vue.use(ElementUI);
Vue.use(VueI18n);

Vue.use(VueLazyLoad, {
    error: imageURl + "timg.gif", //报错需要的图片
    loading: imageURl + "timg.gif" // 替换需要的图片
})
Vue.config.productionTip = false;
Vue.prototype.$request = request
Vue.prototype.$imageURl = imageURl;
Vue.prototype.$utility = utility;


const i18n = new VueI18n({
        locale: 'zh-CN', // 语言标识, 通过切换locale的值来实现语言切换,this.$i18n.locale
        messages: {
            'zh-CN': require('./assets/lang/zh'), // 中文语言包
            'en-US': require('./assets/lang/en') // 英文语言包
        }
    })
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    i18n,
    components: { App },
    template: '<App/>',
    beforeCreate() {
        if (localStorage.locale == "en-US") {
            this.$i18n.locale = "en-US";
        } else {
            this.$i18n.locale = "zh-CN";
        }
    },
})