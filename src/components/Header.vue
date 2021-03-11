<template>
    <div class="m-content">
        <div class="s-content">
            <div style="display: flex;align-items: center" @click="backHome()">
                <img src="http://www.micheal.wang:10020/michealHub.jpg" alt="" style="height: 45px">
            </div>
            <div style="display:flex;align-items: center">
                <div class="block" v-show="hasLogin">
                    <el-avatar :size="25" :src="user.avatar" style="margin-right: 10px"></el-avatar>
                    <div>{{ user.username }}</div>
                    <el-divider direction="vertical"></el-divider>
                </div>
                <div class="m-action"  v-show="hasLogin">
                    <!--        <span><el-link type="primary" href="/blogs">主页</el-link></span>-->
                    <span><el-link type="danger" @click="logout">退出</el-link></span>
                </div>
                <div class="m-action" @click="routerTo()">
                    <div class="my-button" v-show="!hasLogin">
                        <el-link type="info" style="color: white" icon="el-icon-user">登录</el-link>
                    </div>
                </div>

            </div>
        </div>
        <login v-if="login"></login>
        <div class="mask" v-if="login"></div>
    </div>
</template>

<script>
    import login from '../components/Login'

    export default {
        name: "Header.vue",
        components: {login},
        data() {
            return {
                login:false,
                user: {
                    username: '请先登录',
                    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
                },
                hasLogin: false
            }
        },
        methods: {
            backHome(){
                if (this.$route.path !=='/blogs'){
                    this.$router.push('/blogs')
                }
            },
            routerTo(){
                this.login = true
            },
            logout() {
                const _this = this
                _this.$axios.get("/logout", {
                    headers: {
                        "Authorization": localStorage.getItem("token")
                    }
                }).then(res => {
                    _this.$store.commit("REMOVE_INFO")
                    _this.$router.go(0)
                    // _this.$router.push("/login")
                })
            }
        },
        created() {
            if (this.$store.getters.getUser.username) {
                this.user.username = this.$store.getters.getUser.username
                this.user.avatar = this.$store.getters.getUser.avatar
                this.hasLogin = true
                console.log(this.hasLogin)
            }
        }
    }
</script>

<style scoped>
    .el-link.is-underline:hover:after{
        border-bottom: none;
    }
    .my-button{
        background: #3a8ee6;
        border-color: #3a8ee6;
        color: #FFF;
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        -webkit-appearance: none;
        text-align: center;
        box-sizing: border-box;
        outline: 0;
        margin: 0;
        transition: .1s;
        font-weight: 500;
        padding: 12px 20px;
        font-size: 14px;
        border-radius: 4px;
    }

    .block{
        display: flex;
        align-items: center;
    }
    .m-content {
        height: 60px;
        position: fixed;
        z-index: 5;
        background: white;
        width: 100%;
        box-shadow: 0 0 1em #b7b7b7
    }
    .s-content{
        cursor: pointer;
        height: 60px;
        margin: 0 auto;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 70%;
    }
    .m-action {
        margin: 10px 0;
    }
    .mask{
        width: 100%;
        height: 100%;
        background: black;
        opacity: .5;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 9;
    }
</style>