import cookie from 'vue-cookies';
import { ApiLogin } from '../../api/loginApi'


const state = {
    isCollapse: JSON.parse(cookie.get("Collapse")) || false
};
const getters = {
    getIsCollapse(state) {
        return state.isCollapse;
    }
};
const mutations = {
    MuIsCollapse(state, payload) {
        state.isCollapse = payload;
        cookie.set("Collapse", JSON.stringify(payload))
    }
};

const actions = {
    Aclogin(content, requestData) {
        return new Promise((resolve,reject)=>{
            ApiLogin(requestData).then(res=>{
                resolve(res);
            }).catch(err=>{
                reject(err);
            })
        })
    }
}
// const modules = {};
export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions,
    // modules
}
