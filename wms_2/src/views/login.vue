<template>
  <div id="login-wrap">
    <div class="login-container">
      <div class="login-title">系统管理平台</div>
      <div class="login-message">
        <el-form :model="loginData" :rules="loginRules"
          ref="loginForm">
          <el-form-item prop="username">
            <el-input v-model="loginData.username"
              @keyup.enter.native="login('loginForm')"
              prefix-icon="iconfont icon-zhanghao"
              size="large"
              placeholder="请输入登录账号">
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginData.password"
              @keyup.enter.native="login('loginForm')"
              prefix-icon="iconfont icon-mima"
              size="large"
              type="password"
              placeholder="请输入登录密码">
            </el-input>
          </el-form-item>
          <el-form-item prop="code" style="position: relative">
              <el-input v-model="loginData.code"
                style="width: 40%;"
                @keyup.enter.native="login('loginForm')"
                size="mini"
                type="text"
                placeholder="验证码：">
              </el-input>
              <div class="codeWrap">
                <img :src="codeUrl" alt="" class="codeImg">
                <p @click="changeCodeUrl" class="codeChange">再换一张</p>
              </div>
            </el-form-item>
          <el-form-item>
            <el-button class="login-button" size="large" @click="login('loginForm')">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginData: {
        username: null,
        password: null
      },
      codeUrl: null,
      loginRules: {
        username: [
          {
            required: true,
            message: '请输入用户名称',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入登录密码',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created () {
    this.codeUrl = this.$api.apiCommonCaptcha
  },
  methods: {
    changeCodeUrl () {
      this.codeUrl = this.$api.apiCommonCaptcha + '?seq=' + Math.random()
    },
    login (formName) {
      this.$refs[formName].validate((v) => {
        if (v) {
          this.$http({
            url: this.$api.adminLogin,
            method: 'POST',
            params: this.loginData
          }).then((r) => {
            if (r.code === '0') {
              this.$router.push('/index')
            }
          })
        } else {
          this.$message.error('请正确填写信息')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
#login-wrap {
  width: 100vw;
  height: 100vh;
  background-color: #1ABC9C;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .login-container {
    width: 350px;
    height: 400px;
    min-width: 350px;
    min-height: 400px;
    background-color: #FFF;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 50px 20px;
    .login-title {
      width: 100%;
      height: 60px;
      font-size: 26px;
      color: #1ABC9C;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 30px;
    }
    .login-message {
      width: 100%;
      height: calc(~"100% - 90px");
      .el-form-item {
        width: 100%;
      }
      .codeWrap{
        display: inline-block;
        height: 25px;
        position: absolute;
        top: 8px;
        right: 20px;
      }
      .codeImg{
        width: 60px;
        height: 25px;
        margin-right: 20px;
        vertical-align: top;
      }
      .codeChange{
        font-size: 12px;
        height: 25px;
        line-height: 25px;
        vertical-align: top;
        display: inline-block;
      }
    }
  }
  .login-button {
    width: 100%;
    background-color: #1ABC9C;
    margin-top: 20px;
  }
}
</style>

<style>
#login-wrap .el-input__icon {
  font-size: 20px;
}
#login-wrap .el-input--prefix .el-input__inner {
  padding-left: 40px;
}
</style>
