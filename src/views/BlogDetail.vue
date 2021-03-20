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
                    <div class="right-top">
                        <h3 style="border-bottom: 1px solid hsla(0,0%,58.8%,.2);height: 40px">关于作者</h3>
                        <div class="author-title">
                            <el-avatar :size="40"  style="margin-right: 10px"></el-avatar>
                            <h4>作者姓名</h4>
                        </div>
                        <div style="padding-left: 15px">粉丝: <span>数量</span></div>
                        <div style="padding-left: 15px;margin: 10px 0">关注: <span>数量</span></div>
                        <div style="padding-left: 15px;cursor:pointer;"> +加关注</div>
                    </div>
                    <div class="right-bottom">
                        <h3 style="border-bottom: 1px solid rgba(150, 150, 150, 0.2);height: 35px">相关推荐</h3>
                        <div v-for="(item,idx) in list">
                            <div class="relevant">
                                {{item.item}}
                            </div>
                        </div>
                    </div>
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
                //根据分类或者标签来推荐相关文章
                list:[{
                    id:1,
                    item:'啊啊是飞洒发顺丰啊沙发沙发发顺丰'
                },{
                    id:2,
                    item:'的公司公司的VS的我啊沙发沙发请问请问v'
                },{
                    id:3,
                    item:'公司的赶紧弄二号热钱进入你气溶胶哦去微软'
                },{
                    id:4,
                    item:'去我太穷问题及其家族弄起我让你为其全文建瓯菩提评论'
                },{
                    id:5,
                    item:'请问贫穷家庭贫穷没出息佛恩却为了几块钱问题其为人精明'
                }],
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
    .right-top{
        background: #fff;
        padding: 10px;
    }
    .right-bottom{
        padding:10px;
        margin-top: 30px;
        background: #ffffff;
    }
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
        height: 50px;
        margin-bottom: 15px;
    }

    .m-blog {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        width: 100%;
        padding-top: 15px;
        background: #f4f5f5 ;
    }

    .blog {
        width: 1200px;
        display: flex;
        margin: 0 auto;
        padding: 20px 20px 0 0;
    }

    .left-blog {
        flex: 4;
        margin-right: 30px;
        background: #ffffff;
        padding: 20px;
        border-radius: 10px;
    }

    .right-blog {
        flex: 1.2;
    }
    .markdown-body{
        margin-top: 20px;
    }
    .author-title{
        padding: 10px;
        height: 60px;
        display: flex;
        align-items: center;
    }
    .relevant{
        height: 50px;
        margin: 10px;
        cursor: pointer;
    }
    .relevant:hover{
       color: #007fff;
    }
</style>