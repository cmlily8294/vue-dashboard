<style type="text/css">
    .password-dialog{
        width: 400px;
    }
</style>
<template>
    <div>
        <el-dialog title="修改密码" v-model="showDialog" @close="closeHandle" 
            :close-on-click-modal="!forceUpdatePwd" :close-on-press-escape="!forceUpdatePwd" :show-close="!forceUpdatePwd" custom-class="password-dialog">
            <el-form ref="updatePwdForm" :model="pwdForm" label-width="90px" :rules="rules">
                <el-form-item label="旧密码" prop="password">
                    <el-input type="password" v-model="pwdForm.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="new_password">
                    <el-input type="password" v-model="pwdForm.new_password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="重复密码" prop="repeat_password">
                    <el-input type="password" v-model="pwdForm.repeat_password" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button v-if="!forceUpdatePwd" @click="showDialog = false">取 消</el-button>
                <el-button v-else @click="logout()">退 出</el-button>
                <el-button type="primary" @click="updatePwd()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        props: {
            value:false,
            forceUpdatePwd:{
                type:Boolean,
                default:false
            }
        },
        data() {
            var validPwd = (rule, value, callback) =>{
                //10-16位字符,并且同时包含数字,大、小写字母,特殊字符
                var reg = /((?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]))^.{10,16}$/;
                if (!value) {
                    return callback(new Error('必填'));
                }else if(!value.match(reg) || value.length < 10 || value.length > 16){
                    return callback(new Error('10-16位字符,并且包含数字,大、小写字母,特殊字符'));
                }else{
                    return callback();
                }
            }
            var validRepeatPwd = (rule, value, callback) =>{
                if (!value) {
                    return callback(new Error('必填'));
                }else if (this.pwdForm.new_password != value) {
                    return callback(new Error('两次输入新密码不一致'));
                }else{
                    return callback();
                }
            }
            return {
                showDialog:this.value,
                pwdForm:{
                    password:'',
                    new_password:'',
                    repeat_password:''
                },
                rules:{
                    password:[
                        {required: true, message: '必填', trigger: 'blur'}
                    ],
                    new_password:[
                        {required: true, message: '必填', trigger: 'blur'},
                        {validator: validPwd, trigger: 'blur'}
                    ],
                    repeat_password:[
                        {required: true, message: '必填', trigger: 'blur'},
                        {validator: validRepeatPwd, trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            openPwdDialog(){
                this.showDialog = true;
            },
            closeHandle(){
                this.$emit('input',false);
            },
            logout(){
                this.$emit('logout',true);
            },
            updatePwd(){
                this.$refs.updatePwdForm.validate((valid) => {
                    if (valid) {
                        this.$http.post(this.$api.updatePassWord,this.pwdForm)
                        .then((res) =>{
                            if (res.body.code != 0) {
                                this.$message.error(res.body.msg || '修改失败');
                            } else {
                                this.$message.success('修改成功');
                                this.showDialog = false;
                                this.$emit('update-password-success',true);
                            }
                        }, (res) =>{
                            this.$message.error(res.body.msg || '修改失败');
                        });
                    }else{
                        return false;
                    }
                });
            }
        },
        watch:{
            value(){
                this.showDialog = this.value;
            }
        }
    }
</script>