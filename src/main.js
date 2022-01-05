import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import {Notify} from 'vant'
import 'vant/lib/index.css';

import {myDelete,myGet,myPost,myPut} from './api/index'

Vue.prototype.myDelete = myDelete;
Vue.prototype.myGet = myGet;
Vue.prototype.myPost = myPost;
Vue.prototype.myPut = myPut;

Notify.setDefaultOptions({
  duration:1000
})


router.beforeEach((to,from,next)=>{
    if(to.path =='/'){
      next();
    }else{
      if(localStorage.getItem('token')){
        next();
      }else{
        Notify({type:'danger',message:'未登录,请先登录'})
        next('/')
      }
    }
})

Vue.use(Vant);
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
