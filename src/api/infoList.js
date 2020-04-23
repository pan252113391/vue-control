import newAxios from '../util/request'  //引入请求拦截中新创建的axios实例

export function getListApi(data) {
    return newAxios.request({
        method: "post",
        url: "/news/getList/",
        data: data
    })
}

export function addApi(data) {
    return newAxios.request({
        method: "post",
        url: "/news/add/",
        data: data
    })
}

export function deleteInfo(data) {
    return newAxios.request({
        method: "post",
        url: "/news/deleteInfo/",
        data: data
    })
}


export function editInfoApi(data){
    return newAxios({
        method:'post',
        url:'/news/editInfo/',
        data:data
    })
}