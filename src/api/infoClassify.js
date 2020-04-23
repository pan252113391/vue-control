import newAxios from '../util/request'  //引入请求拦截中新创建的axios实例
//获取一级分类
export function getCategoryAll(data) {
    return newAxios.request({
        method:'post',
        url:'/news/getCategoryAll/',
        data:data
    })
}
//添加一级分类
export function addFirstCategory(data) {
    return newAxios.request({
        method:'post',
        url:'/news/addFirstCategory/',
        data:data
    })
}
//删除一级分类
export function deleteCategory(data) {
    return newAxios.request({
        method:'post',
        url:'/news/deleteCategory/',
        data:data
    })
}
//修改一级分类
export function editCategory(data) {
    return newAxios.request({
        method:'post',
        url:'/news/editCategory/',
        data:data
    })
}
//添加子级
export function addChildrenCategory(data) {
    return newAxios.request({
        method:'post',
        url:'/news/addChildrenCategory/',
        data:data
    })
}