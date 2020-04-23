//密码验证
export function passWord(data) {
    let reg = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/;
    return data.match(reg) ? true : false;
}
//邮箱验证
export function email(data) {
    let reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
    return data.match(reg) ? true : false;
}

export function formatDate(timestamp) {
    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000

    var Y = date.getFullYear() + '-';

    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';

    var D = date.getDate() + ' ';

    var h = date.getHours() + ':';

    var m = date.getMinutes() + ':';

    var s = date.getSeconds();

    return Y + M + D ;//+ h + m + s
} 