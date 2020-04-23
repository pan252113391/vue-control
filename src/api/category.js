
import newAxios from '../util/request'  //引入请求拦截中新创建的axios实例

export function getCategoryApi(data) {
    return newAxios.request({
        method: "post",
        url: "/news/getCategoryAll/",
        data: data
    })
}