<style type="text/css">
    .header-wrapper {
        width: 100%;
        height: 50px;
        background-color: rgb(32, 160, 255);
    }
    .header-wrapper header {
        height: 100%;
        line-height: 50px;
    }
    .header-wrapper h1 {
        float: left;
        color: #fff;
        font-size: 26px;
        margin-left: 24px;
    }
    .user-content {
        float: right;
        margin-right: 20px;
        color: #fff;
    }
    .user-content li{
        margin-left: 20px;
        list-style: none;
        float: left;
    }
    .user-content li a{
        text-decoration: none;
        display: block;
        color: #fff;
        padding: 0 20px;
        opacity: .8;
    }
</style>
<template>
    <div class="header-wrapper">
        <header>
            <h1>私募管理及发布系统</h1>
            <ul class="user-content" v-show="isLogin">
                <li>Hi,{{username}}</li>
                <li><a href="#" style="padding:0;" @click.prevent="openPwdDialog">修改密码</a></li>
                <li><a href="#" @click.prevent="logout">退出系统</a></li>
            </ul>
        </header>
        <update-password ref="updatePwd" v-model="showPwdDialog" :force-update-pwd="forceUpdatePwd"></update-password>
    </div>
</template>
<script>
    import Auth from '../auth/index';
    import updatePassword from './update-password';
    export default {
        components:{
            updatePassword:updatePassword
        },
        data() {
            return {
                isLogin : Auth.checkLogin(),
                username : Auth.getUsername(),
                showPwdDialog:false,
                forceUpdatePwd:false
            };
        },
        mounted(){
            var pwdFlag = localStorage.getItem('pwd_flag');
            if (pwdFlag && pwdFlag == 'true' && this.isLogin) {
                this.forceUpdatePwd = true;
                this.showPwdDialog = true;
            }
            //监听密码修改成功事件
            this.$refs.updatePwd.$on('update-password-success',()=>{
                this.forceUpdatePwd = false;
                this.showPwdDialog = false;
                this.logout();
            });
            this.$refs.updatePwd.$on('logout',()=>{
                this.forceUpdatePwd = false;
                this.showPwdDialog = false;
                this.logout();
            });
        },
        methods: {
            logout() {
                Auth.logout(this);
            },
            openPwdDialog(){
                this.showPwdDialog = true;
            }
        }
    }
</script>