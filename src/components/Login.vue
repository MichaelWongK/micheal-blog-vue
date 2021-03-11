<template>
  <div class="login animate__animated animate__backInDown">
      <el-container class="m-content">
        <el-main>
            <div @click="loginOut()" class="loginOut">
                <img src="http://www.micheal.wang:10020/mongo/read/60487b0f29eb83032d5a1680" alt="" style="width: 25px;height: 25px">
            </div>
            <h1>账号登陆</h1>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="ruleForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="ruleForm.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-main>
      </el-container>
  </div>
</template>

<script>
export default {
    data() {
      return {
        ruleForm: {
          // username: 'micheal.wang',
          username: 'chenjiawei',
          password: '',
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'change' },
          ]
        }
      };
    },
    methods: {
        loginOut(){
            this.$parent.login = false
        },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const _this = this
            this.$axios.post("/login", this.ruleForm).then(res => {
                const jwt = res.headers['authorization']
                const userInfo = res.data.data
                // 数据共享
                _this.$store.commit("SET_TOKEN", jwt)
                _this.$store.commit("SET_USERINFO", userInfo)

                // 数据取出
                // console.log('-------userinfo:' + _this.$store.getters.getUser)
                _this.$router.go(0)
                // _this.$router.push("/blogs")
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>

<style scoped>
    .loginOut{
        width: 25px;
        height: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        right: 5%;
        cursor: pointer;
        transition: .3s;
    }
    .loginOut:hover{
        transform: scale(1.5);
    }
    .login{
        z-index: 10;
        position: absolute;
        width: 30%;
        top: 100px;
        left: 35%;
        border-radius: 50px;
    }
 .m-content {
     text-align: center;
 }
 .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: white;
    color: #333;
    text-align: center;
    line-height: 160px;
    height: 500px;
      border-radius: 20px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(2) .el-aside {
    line-height: 460px;
  }
  
  .el-container:nth-child(1) .el-aside {
    line-height: 620px;
  }

  .mlogo {
      height: 80%;
      margin-top: 5px;
  }

  .demo-ruleForm {
      max-width: 500px;
      margin: 0 auto;
  }
    /deep/.el-input__inner{
        background: #F6F6FF;
    }
    /deep/.el-form-item__content{
        width: 60%;
    }
    /deep/.el-form-item__label{
        padding: 0;
    }
</style>