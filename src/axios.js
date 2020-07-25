import axios from 'axios'
import Element from 'element-ui'
import router from './router'
import store from './store'

// axios.defaults.baseURL="http://localhost:8088"
axios.defaults.baseURL="http://www.micheal.wang:8088"

// 前置拦截
axios.interceptors.request.use(config => {
    return config
})

// 后置拦截
axios.interceptors.response.use(response => {
        let res = response.data

        console.log(77777777777777)
        console.log(res)

        if (res.code == 200) {
            return response
        } else {
            Element.Message.error(res.msg, {duration : 3 * 1000});
            return Promise.reject(res.msg)
        }
    },
    error => {
        console.log(error)

        if (error.response.data) {
            error.message = error.response.data.msg
        }

        if (error.response.status === 401) {
            store.commit("REMOVE_INFO")
            router.push("/login")
        } 

        Element.Message.error(error.message, {duration : 3 * 1000});
        return Promise.reject(error)
        
    }
)