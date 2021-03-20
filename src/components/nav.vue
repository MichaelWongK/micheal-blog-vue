<template>
    <div class="nav">
        <el-col style="height: 100%">
            <el-menu
                    style="height: 100%"
                    default-active="2"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                <el-menu-item index="2">
                    <i class="el-icon-setting"></i>
                    <span slot="title">导航一</span>
                </el-menu-item>
                <el-menu-item index="1" @click="$router.push('/echarts')">
                    <i class="el-icon-menu"></i>
                    <span slot="title">echarts图表</span>
                </el-menu-item>
            </el-menu>
        </el-col>
    </div>
</template>

<script>
    export default {
        name: "nav"
    }
</script>

<style scoped>
.nav{
    position: absolute;
    width: 201px;
    height: calc(100% - 60PX);
    top: 60px;  /* 距离上面50像素 */
    overflow-y: auto; /* 当内容过多时y轴出现滚动条 */
}
</style>