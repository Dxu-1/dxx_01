import axios from 'axios'
import { Notify } from 'vant'
import router from '../router'

// 创建一个axios实例
const myRequest = axios.create({
    baseURL:"/api",
    timeout:5000
})

myRequest.interceptors.request.use((config)=>{
    if(window.localStorage.getItem('token')){
        config.headers['Authorization'] = window.localStorage.getItem('token');
    }
    return config;
},err=>{
    console.log('error');
})

// 请求响应处理
myRequest.interceptors.response.use((res)=>{
    if(res.data.code == 401){
        Notify({type:"danger",message:"未登录,请先登录"})
        router.replace('/')
    }else if(res.data.code == 500){
        Notify({type:"danger",message:res.data.message})
    }else if(res.data.code == 200){
        Notify({type:'success',message:res.data.message});
    }
    return res.data
},(err)=>{
    return Promise.reject(err)
})


export const myGet =(url,params)=>{
    return myRequest({url:url,params:params,method:"get"})
}

export const myPost =(url,params)=>myRequest({url:url,data:params,method:"post"})

export const myDelete =(url,params)=>{
    return myRequest({url:url,params:params,method:"delete"})
}

export const myPut =(url,params)=>myRequest({url:url,data:params,method:"put"})