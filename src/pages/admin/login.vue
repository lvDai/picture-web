<template>
  <div class="adminLogin">
    <div class="loginBox">
      <div class="loginTitle">
        <h1>{{$t('lang.backStageManagement')}}</h1>
      </div>
      <div class="userName">
        <input type="text" v-model="user.name" :placeholder="$t('lang.loginUserNameHint')" />
        <i class="iconfont">&#xe623;</i>
        <p ref="nameError"></p>
      </div>
      <div class="userPassword">
        <input
          type="password"
          v-model="user.password"
          @keydown="carriage"
          :placeholder="$t('lang.loginUserPasswordHint')"
        />
        <i class="iconfont">&#xe60d;</i>
        <p ref="passwordError"></p>
      </div>
      <div class="button">
        <button @click="isUserData">{{$t('lang.login')}}</button>
      </div>
    </div>
  </div>
</template>
<script>
import { Loading } from "element-ui";
export default {
  data() {
    return {
      fullscreenLoading: false,
      user: { name: "", password: "" }
    };
  },
  methods: {
    // 在密码框点击回车
    carriage(e){
      e = e || window.event;
      if(e.keyCode==13){
        this.isUserData();
      }
    },
    //   登录前验证用户信息
    isUserData() {
      if (!this.user.name) {
        this.open({ content: "用户名不能为空", type: "warning" });
        return;
      } else if (this.user.name.length < 4 || this.user.name.length > 16) {
        this.open({ content: "用户名长度不正确", type: "warning" });
        return;
      } else if (!this.user.password) {
        this.open({ content: "密码不能为空", type: "warning" });
        return;
      } else if (
        this.user.password.length < 6 ||
        this.user.password.length > 16
      ) {
        this.open({ content: "用户名长度不正确", type: "warning" });
        return;
      }
      let loadingInstance = Loading.service();
      this.userLogin(loadingInstance, this.user);
    },
    //用户登录  data要登录的用户信息
    userLogin(loadingInstance, data) {
      this.$request
        .post("/admin/login", data)
        .then(result => {
          loadingInstance.close();
          if (result.data.status == 1) {
            this.$utility.setCookie(
              "adminUser",
             this.$utility.compileStr(JSON.stringify(result.data.data))
            );
            this.open({content:"登录成功",type:"success"})
            setTimeout(() => {
              this.$router.push({
                path: "/admin/"
              });
            }, 600);
          } else {
            this.$refs.nameError.innerHTML = result.data.error;
          }
        })
        .catch(err => {
          loadingInstance.close();
          console.log(err);
        });
    },
    // 提示
    open(args) {
      this.$message({
        message: args.content,
        type: args.type
      });
    }
  }
};
</script>
<style lang="less" scoped>
.adminLogin {
  width: 100%;
  height: 100vh;
  background-image: url("@{imgUrl}1.jpg");
  background-repeat: no-repeat;
  background-size: 100%;
  .loginBox {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 460px;
    height: 360px;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 10px #a9a9a9;
    border-radius: 6px;
    padding: 40px 30px;
    background-color: #fff;
    box-sizing: border-box;
    .loginTitle {
      text-align: center;
      font-size: 17px;
    }
    div {
      position: relative;
      width: 100%;
      input {
        width: 100%;
        line-height: 40px;
        box-sizing: border-box;
        border-radius: 6px;
        padding: 0 40px;
        border: 1px solid #d3d3d3;
      }
      i {
        position: absolute;
        top: 0;
        left: 0;
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
      }
      p {
        height: 20px;
        font-size: 12px;
        color: #f42;
      }
    }
    .userName {
      margin-top: 30px;
    }
    .userPassword {
      margin-top: 10px;
    }
    .button {
      margin-top: 15px;
      button {
        height: 40px;
        line-height: 40px;
        text-align: center;
        width: 100%;
        border: 1px solid #e3e3e3;
        color: #686868;
        cursor: pointer;
      }
    }
  }
}
</style>