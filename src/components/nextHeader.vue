<template>
    <div class="header">
        <div style="display: flex;align-items: center;width: 200px;justify-content: center" @click="$router.push('/blogs')">
            <img src="http://www.micheal.wang:10020/michealHub.jpg" alt="" style="height: 45px">
        </div>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" >
            <el-menu-item index="1">处理中心</el-menu-item>
            <el-submenu index="2">
                <template slot="title">我的工作台</template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
                <el-menu-item index="2-3">选项3</el-menu-item>
                <el-submenu index="2-4">
                    <template slot="title">选项4</template>
                    <el-menu-item index="2-4-1">选项1</el-menu-item>
                    <el-menu-item index="2-4-2">选项2</el-menu-item>
                    <el-menu-item index="2-4-3">选项3</el-menu-item>
                </el-submenu>
            </el-submenu>
            <el-menu-item index="3">消息中心</el-menu-item>
            <el-menu-item index="4">订单管理</el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "nextHeader",
        data(){
            return{

            }
        },
        methods:{
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style scoped>
    .header {
        display: flex;
        position: absolute;
        line-height: 50px;
        top: 0px;
        left: 0px;
        right: 0px;
    }
</style>