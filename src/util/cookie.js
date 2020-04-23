import cookies from 'vue-cookies'

export function setToken(data) {
    cookies.set("token",data,'2d');
}

export function setUserName(data) {
    cookies.set("username",data,'2d');
}

export function getToken() {
  return  cookies.get('token');
}

export function getUserName() {
    return  cookies.get("username");
}