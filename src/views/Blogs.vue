<template>
    <div style="height: 100vh;width: 100vw;overflow-x: hidden" ref="box">
        <Header></Header>
        <div style="height: 60px"></div>
        <div class="big-block">
            <div class="sm-box">
                <div class="box-left">
                    <div class="left-top">
                        <div style="display: flex;align-items: center">全部<span>({{this.total}})</span></div>
                        <div style="display: flex;align-items: center;border: 1px solid #ccc; border-radius: 20px;height: 32px;">
                            <el-input v-model="input" placeholder="请输入内容"></el-input>
                            <div class="el-icon-search" @click="getInput()"></div>
                        </div>
                    </div>
                    <el-timeline>
                        <el-timeline-item v-for="blog in blogs" key="blog">
                            <el-card>
                                <h4 style="margin: 10px 0">
                                    <router-link :to="{name: 'BlogDetail', params: {blogId:blog.id}}">
                                        {{blog.title}}
                                    </router-link>
                                </h4>
                                <p style="margin: 20px 0">{{blog.description}}</p>
                                <div style="display: flex">
                                    <p>发布人:{{blog.user}}</p>
                                    <p style="margin: 0 50px">时间:{{blog.createDate}}</p>
                                    <p>分类:</p>
                                </div>
                            </el-card>
                        </el-timeline-item>
                    </el-timeline>
                    <el-pagination class="m-page"
                                   background
                                   layout="prev, pager, next"
                                   :current-page=currentPage
                                   :page-size=pageSize
                                   @current-change=page
                                   :total="total">
                    </el-pagination>
                </div>
                <div class="box-right">
                    <div class="right-top" @click="goRelease()">
                        <i class="el-icon-edit"></i>发布文章
                    </div>
                    <div class="right-bottom">
                        <div class="class-sort">
                            <div style="color: #aaa"><i class="el-icon-menu"></i>分类</div>
                            <div class="sort" v-for="item in itemize">
                                <div>{{item.item}}</div>
                                <div :class="
                                              item.id == 1 ? 'num-color' : 'num-normal' &&
                                              item.id == 2 ? 'num-color1' : 'num-normal' &&
                                              item.id == 3 ? 'num-color2' : 'num-normal' &&
                                              item.id == 7 ? 'num-color3' : 'num-normal'
                                            "
                                     class="num"
                                >{{item.value}}
                                </div>
                            </div>
                        </div>
                        <div class="class-sort">
                            <div style="color: #aaa" @click="manage()">

                                <i class="el-icon-price-tag" style="transform: rotate(45deg)"></i>标签
                            </div>
                            <div class="sort-lable">
                                <div class="lable" v-for="item in lable"
                                     :class="
                                              item.id == 1 ? 'lable-color' : 'lable-normal' &&
                                              item.id == 2 ? 'lable-color1' : 'lable-normal' &&
                                              item.id == 3 ? 'lable-color2' : 'lable-normal' &&
                                              item.id == 5 ? 'lable-color3' : 'lable-normal' &&
                                              item.id == 5 ? 'lable-color4' : 'lable-normal' &&
                                              item.id == 6 ? 'lable-color5' : 'lable-normal' &&
                                              item.id == 7 ? 'lable-color6' : 'lable-normal'
                                            "
                                >{{item.item}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="live2d">
                    <vuelive

                            :style="style"
                            :model="[1,40]"
                            :direction="direction"
                            :size="200"
                            :height="height"
                    >
                    </vuelive>
                </div>

                <div class="upScroll" v-if="isScroll" @click="upScroll">
                    <i class="el-icon-upload2"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import vuelive from  'vue-live2d'
    import Header from "../components/Header"
    import loginCheck from "../js/loginCheck";

    export default {
        name: "Blogs.vue",
        components: {Header,vuelive},
        data() {
            return {
                login: false,
                //lable id 1 前端 2 后端 3 Android 4 人工智能 5开发工具 6代码人生 7阅读
                lable: [{
                    id: 1,
                    item: 'vue'
                }, {
                    id: 2,
                    item: 'java'
                }, {
                    id: 4,
                    item: '大数据'
                }, {
                    id: 6,
                    item: '面试'
                }, {
                    id: 1,
                    item: 'html'
                }, {
                    id: 7,
                    item: '随笔'
                }, {
                    id: 1,
                    item: 'css'
                }, {
                    id: 5,
                    item: 'git'
                },],
                itemize: [{
                    id: 1,
                    item: '前端',
                    value: 10,
                }, {
                    id: 2,
                    item: '后端',
                    value: 23,
                }, {
                    id: 3,
                    item: 'Android',
                    value: 33,
                }, {
                    id: 4,
                    item: '人工智能',
                    value: 42,
                }, {
                    id: 5,
                    item: '开发工具',
                    value: 52,
                }, {
                    id: 6,
                    item: '代码人生',
                    value: 14,
                }, {
                    id: 7,
                    item: '阅读',
                    value: 24,
                }],
                input: '',
                blogs: {},
                currentPage: 1,
                total: 0,
                pageSize: 5,
                oldScrollTop: 0,
                isScroll: false,
                timeout:null
            }
        },
        mounted() {
            window.addEventListener("scroll", this.scrolling(this.handle, 1000), true)
        },
        methods: {
            manage(){
                this.$router.push('/manage')
            },
            handle() {
                if (this.$refs.box.scrollTop < 60) {
                    this.isScroll = false
                } else {
                    this.isScroll = true
                }
            },
            upScroll() {
                this.$refs.box.scrollTop = 0
            },
            scrolling(fn, wait) {
                let that = this
                return function () {
                    if (that.timeout !== null)
                    clearTimeout(that.timeout);  //清除这个定时器
                    that.timeout = setTimeout(fn, wait);
                }


            },
            goRelease() {
                console.log(this.$children[0].login)
                console.log(this.$emit.login)
                debugger
                // this.$children[0].login = true
                this.checkLogin.checkLogin(this)
                // this.$router.push("/blog/add")
            },
            getInput() {
                console.log(this.input)
            },
            page(currentPage) {
                const _this = this
                _this.$axios.get("/blogs?currentPage=" + currentPage).then(res => {

                    console.log(666666666)
                    console.log(res)
                    _this.blogs = res.data.data.records
                    _this.currentPage = res.data.data.current
                    _this.total = res.data.data.total
                    _this.pageSize = res.data.data.size

                })
            }
        },
        created() {
            this.page(1)
        }

    }
</script>

<style scoped type="text/css">
    .lable {
        color: white;
        padding: 5px;
        border-radius: 5px;
        display: flex;
        margin: 2px;
        font-size: 10px;
        cursor: pointer;
    }

    .lable-normal {
        background: skyblue;
    }

    .lable-color {
        background: #1E9FFF;
    }

    .lable-color1 {
        background: rgb(171, 189, 129);
    }

    .lable-color2 {
        background: #f9d681;
    }

    .lable-color3 {
        background: rgb(132, 155, 135);
    }

    .lable-color4 {
        background: rgb(171, 189, 129);
    }

    .lable-color5 {
        background: darkblue;
    }

    .lable-color6 {
        background: rgb(248, 178, 106);
    }

    .sort-lable {
        display: flex;
        flex-flow: wrap;
    }

    .num {
        color: white;
        padding: 3px;
        border-radius: 5px;
    }

    .num-normal {
        background: #1E9FFF;
    }

    .num-color {
        background: red;
    }

    .num-color1 {
        background: rgb(171, 189, 129);
    }

    .num-color2 {
        background: rgb(248, 178, 106);
    }

    .num-color3 {
        background: darkblue;
    }

    .sort {
        margin: 10px 0;
        box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.2);
        border-radius: 15px;
        padding: 10px 15px;
        background: white;
        display: flex;
        justify-content: space-between;
        transition: .3s;
    }

    .sort:hover {
        transform: scale(1.05);
    }

    .right-bottom {
        padding: 10px 20px;
        border-radius: 10px;
        margin-top: 10px;
        height: calc(100% - 102px);
        background: white;
    }

    .right-top {
        background: #1E9FFF;
        color: white;
        height: 40px;
        width: 100%;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    /deep/ .el-timeline-item {
        padding-bottom: 0;
        margin-bottom: 20px;
    }

    /deep/ .el-input {
        height: 30px;
        margin-left: 15px !important;
    }

    /deep/ .el-input__inner {
        border: none !important;
        height: 30px;
        line-height: 30px;
    }

    /deep/ .el-timeline-item__wrapper {
        padding-left: 0;
        top: 0;
    }

    /deep/ .el-timeline-item__tail {
        display: none;
    }

    /deep/ .el-timeline-item__node {
        display: none;
    }

    /deep/ .el-timeline-item:hover {
        box-shadow: 0 0 12px rgb(0 0 0 / 10%);
    }

    .left-top {
        justify-content: space-between;
        display: flex;
        align-items: center;
        height: 40px;
        border-radius: 10px;
        margin: 10px 0;
        padding: 15px;
        background: white;
    }

    .m-page {
        margin: 0 auto;
        text-align: center;
    }

    .big-block {
        padding-bottom: 20px;
        width: 100%;
        background: rgba(221, 221, 221, 0.7);
    }

    .sm-box {
        width: 1300px;
        margin: 0 auto;
        display: flex;
        justify-content: center;
    }

    .box-left {
        width: 800px;
        margin-right: 20px
    }

    .box-right {
        margin-top: 10px;
        width: 270px;
        border-radius: 20px;
    }

    .el-icon-search {
        width: 40px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .upScroll {
        width: 50px;
        height: 50px;
        background: white;
        position: absolute;
        right: 5%;
        bottom: 2%;
        cursor: pointer;
    }

    /deep/ .el-icon-upload2 {
        font-size: 30px;
        display: flex;
        height: 100%;
        width: 100%;
        align-items: center;
        justify-content: center;
    }
    .live2d{
        position: fixed;
        left: 20px;
        bottom: 0;
    }
    /deep/.vue-live2d-toggle-on-right{
        left:-19px;
        border-radius: 0 .5rem .5rem 0;
    }
</style>