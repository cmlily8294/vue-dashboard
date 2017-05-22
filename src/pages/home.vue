<style type="text/css">
a{
    color: #20a0ff;
    text-decoration: none;
}
.main-wrapper {
    position: absolute;
    top: 70px;
    bottom: 0;
    left: 200px;
    right: 20px;
    overflow: auto;
}
.search-form{
    float: left;
    width: 750px;
}
.search-form-wrapper{
    float: left;
    width: 600px;
}
.search-form-wrapper .el-form-item{
    margin-bottom: 10px;
    width:180px;
}
.search-form-group{
    display: inline-block;
}
.search-form-group.hide{
    display: none;
}
.search-form-buttons{
    float: right;
    margin-bottom: 10px;
}
.button-group{
    float: right;
    margin-bottom: 10px;
}
</style>
<template>
    <div>
        <main-header></main-header>
        <side-nav :data="navsData"></side-nav>
        <div class="main-wrapper">
            <router-view class="content"></router-view>
        </div>
    </div>
</template>
<script>
import { navs } from '../route.config';
export default {
    data() {
        return {
            navsData: navs
        };
    },
    methods: {
    }
}
</script>
