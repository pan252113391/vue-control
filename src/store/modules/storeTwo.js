import {getCategoryApi} from '../../api/category'

const actions = {
  getCategory(data) {
      return new Promise((resolve,reject)=>{
        getCategoryApi(data).then(res=>{
            resolve(res);
        }).catch(err=>{
            reject(err);
        })
      })
  }
};

export default {
    namespaced:true,
    actions,

}
