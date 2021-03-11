<template>
    <div>
        <Header></Header>
        <div style="height: 60px"></div>
        <div class="m-blog">
            <div class="blog">
                <div class="left-blog">
                    <div>
                        <h2 class="title">
                            <div>
                                {{blog.title}}
                            </div>
                        </h2>
                        <div class="line-bottom">
                            <span>时间:发布时间</span>
                            <span>用户名</span>
                            <span>阅读(阅读次数)</span>
                            <span>评论(评论数量)</span>
                            <span>
                                <el-link v-if="ownBlog">
                                    <router-link :to="{name: 'BlogEdit', params: {blogId: blog.id}}">
                                        编辑
                                    </router-link>
                                </el-link>
                            </span>
                        </div>
                    </div>
                    <div class="markdown-body" v-html="blog.content"></div>
                </div>
                <div class="right-blog">

                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import Header from "../components/Header"
    import 'github-markdown-css'

    export default {
        name: "BlogDetail.vue",
        components: {Header},
        data() {
            return {
                blog: {
                    title: "micheal default",
                    content: "default content"
                },
                ownBlog: false
            }
        },
        created() {
            const blogId = this.$route.params.blogId
            console.log(blogId)
            const _this = this
            if (blogId) {
                this.$axios.get('/blog/' + blogId).then(res => {
                    const blog = res.data.data
                    _this.blog.id = blog.id
                    _this.blog.title = blog.title

                    var MarkdownIt = require("markdown-it")
                    var md = new MarkdownIt()

                    var result = md.render(blog.content)

                    _this.blog.content = result
                    _this.ownBlog = (blog.userId === _this.$store.getters.getUser.id)
                })
            }
        }
    }
</script>

<style scoped>
    .line-bottom>span{
        margin-right: 10px;
    }
    .line-bottom{
        text-align: right;
        font-size: 14px;
    }
    .title {
        background-image: url("http://www.micheal.wang:10020/mongo/read/6049ba2b29eb83032d5a1682");
        background-position: bottom left;
        background-repeat: repeat-x;
    }

    .m-blog {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        width: 100%;
        padding-top: 15px;
    }

    .blog {
        width: 1200px;
        display: flex;
        margin: 0 auto;
    }

    .left-blog {
        flex: 4;
        margin-right: 30px;
    }

    .right-blog {
        flex: 2;
    }
</style>