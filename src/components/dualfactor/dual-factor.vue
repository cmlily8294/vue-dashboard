<style type="text/css">
    .dual-factor-body{
        width: 400px;
    }
    .dual-factor-inner{
        width: 350px;
        margin: 0 auto;
    }
    .dual-factor-btns{
        margin-top: 12px;
        height: 40px;
    }
    .dual-factor-btns .el-button{
        display: block;
        margin: 0 auto;
    }
    .dual-factor-btns .el-input-group{
        width: 200px;
        margin: 0 auto;
    }
    #dual-factor .el-input-group__append {
        color: #FFF;
        background-color: #58B7FF;
        border-color: #58B7FF;
    }
</style>
<template>
    <div id="dual-factor">
        <el-dialog title="双因子验证" v-model="dialogVisible" size="tiny" custom-class="dual-factor-body">
            <div class="dual-factor-inner">
                <el-steps :active="active" :space="300" finish-status="success" :process-status="processStatus">
                  <el-step title="获取验证码" :description="tip"></el-step>
                  <el-step title="验证"></el-step>
                </el-steps>
                <div class="dual-factor-btns">
                    <el-button type="primary" @click.native.prevent="next" v-show="active==0">点击获取</el-button>
                    <el-input placeholder="请输入短信验证码" v-model="identifyCode" v-show="active==1">
                        <el-button slot="append" type="info" @click.native.prevent="next">验证</el-button>
                    </el-input>
                </el-button-group>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            active: 0,
            dialogVisible:false,
            identifyCode:'',
            tip:'',
            msg:'后台操作',
            processStatus:'process',
            method:null
        };
    },
    mounted() {
        this.$on("dual-open",this.open);
    },
    methods: {
        open(msg,event,callback) {
            event.stopPropagation();
            this.active = 0;
            this.tip = '';
            this.identifyCode = '';
            this.dialogVisible = true;
            this.msg = msg ? msg : '后台操作';
            this.method = callback;
        },
        close(){
            this.dialogVisible = false;
            this.method();
            // this.$emit('dual-close');
        },
        next() {
            if (this.active == 0) {
                this.sendSms();
            } else {
                this.verify();
            }
        },
        sendSms() {
            this.$http.get('/iauth/dualFactor/send',{params:{operation:this.msg}})
            .then((res) => {
                var result = res.data;
                if (result.code == 0) {
                    this.tip='验证码已发送到您'+result.data.phone+'的手机，请注意查收！';
                    this.active++;
                } else {
                    this.tip=result.info;
                }
            },(res) => {
                this.tip='网络错误，请稍后重试';
            });
        },
        verify() {
            if (this.identifyCode == '') {
                this.tip = '验证码不能为空';
                return false;
            }
            this.$http.get('/iauth/dualFactor/verify',{params:{code:this.identifyCode}})
            .then((res) => {
                var result = res.data;
                if (result.code == 0) {
                    this.active++;
                    this.tip='验证成功！';
                    setTimeout(()=>{
                        this.close();
                    },1000);
                } else {
                    this.tip=result.info;
                }
            },(res) => {
                this.tip='网络错误，请稍后重试';
            });
        }
    }
}
</script>
