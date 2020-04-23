
import router from "./index"
import {getToken} from "../util/cookie"
router.beforeEach((to,from,next)=>{
  if (to.path === '/login') {
    next();
  }else{
    let token = getToken();
    if (!token) {
      next('/login')
    }else{
      next();
    }
  }
})