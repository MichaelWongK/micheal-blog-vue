<template>
    <div>
        <nextHeader></nextHeader>
        <navlist></navlist>
        <div class="main">
            <div>1121</div>
        </div>
    </div>
</template>

<script>
    import nextHeader from "../components/nextHeader";
    import navlist from "../components/nav";

    export default {
        name: "Manage",
        components: {nextHeader, navlist},
        data() {
            return {
                activeIndex: '1',
                activeIndex2: '1'
            }
        },
        methods: {}
    }
</script>

<style scoped>
    /* 主区域 */
    .main {
        position: absolute;
        top: 50px;
        left: 200px;
        bottom: 0px;
        right: 0px; /* 距离右边0像素 */
        padding: 15px;
        overflow-y: auto; /* 当内容过多时y轴出现滚动条 */
        /* background-color: red; */
    }
</style>