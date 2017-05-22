<style type="text/css">
.side-nav {
    position: absolute;
    top: 50px;
    left: 0;
    bottom: 0;
    width: 180px;
    z-index: 10;
    padding-left: 0px;
    margin-right: 20px;
    overflow: auto;
    background-color: #eff2f7;
}
.side-nav .menu-link{
    color:#475669;
    text-decoration:none;
    display:inline-block;
    width:100%;
}
</style>
<template>
    <div class="side-nav">
        <el-menu router v-for="(item, index) in navData" @open="handleopen">
            <el-menu-item v-if="item.type == 'link'" :index="'el-menu-link-'+index"><a :href="item.path" target="_blank" class="menu-link">{{item.name}}</a></el-menu-item>
            <el-menu-item v-else-if="!item.hideInSide && isShow(item.path)" :index="item.path">{{item.name}}</el-menu-item>
            <el-submenu :index="'sub-'+index.toString()" v-else="item.groups || item.children">
                <template slot="title">{{item.name}}</template>
                <el-menu-item v-for="childItem in item.children" v-if="!childItem.hideInSide && isShow(childItem.path)" :index="childItem.path">
                    <a v-if="childItem.type == 'link'" :href="childItem.path" target="_blank" class="menu-link">{{childItem.name}}</a>
                    <span v-else>{{childItem.name}}</span>
                </el-menu-item>
                <el-menu-item-group v-for="group in item.groups" :title="group.groupName">
                    <el-menu-item v-for="navItem in group.list" v-if="!navItem.hideInSide && isShow(navItem.path)" :index="navItem.path">
                        {{navItem.name}}
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>
<script>
export default {
    props: {
        data: Array,
        base: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            navData:this.data
        };
    },
    mounted(){
        // this.$router.push({path:'/guarantor'});
    },
    methods: {
        isShow(path){
            return path && this.$auth.checkAuth(path);
        },
        handleopen : function(index,indexpath) {
        }
    }
}
</script>
