
import { MessageBox } from 'element-ui';
import { Message } from 'element-ui';

export default {
    install(Vue,options) {
        Vue.prototype.message=()=>{
            MessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                Message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                Message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        }
    }
}