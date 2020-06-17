<template>
  <div class="login">
    <head-box />
    <div class="loginBox">
      <div class="loginTitle">
        <h1>{{$t('lang.userLogin')}}</h1>
      </div>
      <div class="userName">
        <i class="iconfont">&#xe623;</i>
        <input type="text" v-model="user.name" :placeholder="$t('lang.loginUserNameHint')" />
        <p ref="userNameError"></p>
      </div>
      <div class="userPassword">
        <i class="iconfont">&#xe60d;</i>
        <input
          type="password"
          v-model="user.password"
          :placeholder="$t('lang.loginUserPasswordHint')"
        />
        <p ref="userPasswordError"></p>
      </div>
      <div class="register">
        <input @click="isUserData" type="button" :value="$t('lang.login')" />
      </div>
    </div>
  </div>
</template>
<script>
import head from "@/pages/components/head.vue";
export default {
  data() {
    return {
      user: { name: "", password: "" },
      fullscreenLoading: false
    };
  },
  // 初始化判断用户是否已经登录
  beforeCreate() {
    if (!localStorage.myUser) {
      return;
    }
    let user = JSON.parse(this.$utility.uncompileStr(localStorage.myUser));
    if (user && user.id) {
      setTimeout(() => {
        this.$router.go(-1);
      }, 200);
    }
  },
  methods: {
    // 登录前判断用户数据
    isUserData() {
      let userNameError = this.$refs.userNameError;
      let userPasswordError = this.$refs.userPasswordError;
      userNameError.innerHTML = "";
      userPasswordError.innerHTML = "";
      if (!this.user.name) {
        userNameError.innerHTML = "用户名不能为空";
        return;
      } else if (this.user.name.length < 4 || this.user.name.length > 16) {
        userNameError.innerHTML = "用户名长度不正确";
        return;
      } else if (!this.user.password) {
        userPasswordError.innerHTML = "密码不能为空";
        return;
      } else if (
        this.user.password.length < 6 ||
        this.user.password.length > 16
      ) {
        userPasswordError.innerHTML = "密码长度不正确";
        return;
      }
      this.userLogin(this.user);
    },
    // 发送用户登录信息 user(用户信息)
    userLogin(user) {
      this.$request
        .post("/login", user)
        .then(result => {
          if (result.data.status == 1) {
            this.open({
              title: this.$t("lang.hint"),
              message: this.$t("lang.loginSucceed"),
              type: "success"
            });
            localStorage.myUser = this.$utility.compileStr(
              JSON.stringify(result.data.data)
            );
            setTimeout(() => {
              this.$router.go(-1);
            }, 600);
          } else {
            this.$refs.userNameError.innerHTML = result.data.error;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 登录成功提示 title标题 message内容 type 提示类型
    open(args) {
      this.$notify({
        title: args.title,
        message: args.message,
        type: args.type
      });
    }
  },
  components: {
    headBox: head
  }
};
</script>
<style lang="less" scoped>
.login {
  .loginBox {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: 400px;
    box-shadow: 0 0 10px #e3e3e3;
    border-radius: 5px;
    padding: 25px 40px;
    box-sizing: border-box;
    .loginTitle {
      text-align: center;
      line-height: 60px;
      font-size: 17px;
    }
    div {
      position: relative;
      i {
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        height: 44px;
        line-height: 44px;
        width: 44px;
        text-align: center;
      }
      input {
        width: 100%;
        height: 44px;
        box-sizing: border-box;
        padding-left: 44px;
        padding-right: 20px;
        border: 1px solid #e3e3e3;
        border-radius: 5px;
      }
      p {
        height: 20px;
        line-height: 20px;
        font-size: 12px;
        color: red;
      }
    }
    .userName {
      margin-top: 20px;
    }
    .userPassword {
      margin-top: 10px;
    }
    .register {
      margin-top: 20px;
      input {
        padding: 0;
        cursor: pointer;
      }
    }
  }
}
</style>