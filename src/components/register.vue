<template>
  <div>
    <Icon />
    <form>
      <a-row justify="center" align="middle" type="flex">
        <a-col span="4" class="text-right">
          <label for="username">用户名:</label>
        </a-col>
        <a-col span="15" offset="1">
          <a-input id="username" v-model="username" />
        </a-col>
      </a-row>
      <br />
      <a-row justify="center" type="flex" align="middle">
        <a-col span="4" class="text-right">
          <label for="password">密码:</label>
        </a-col>
        <a-col span="15" offset="1">
          <a-input id="password" v-model="password" />
        </a-col>
      </a-row>
      <br />
      <a-row justify="center" type="flex" align="middle">
        <a-col span="4" class="text-right">
          <label for="again">确认密码:</label>
        </a-col>
        <a-col span="15" offset="1">
          <a-input id="again" v-model="againpwd" />
        </a-col>
      </a-row>
      <br />
      <a-row justify="center" type="flex" align="middle">
        <a-col span="20">
          <a-button block size="large" type="primary" @click="register">注册</a-button>
        </a-col>
      </a-row>
      <br />
      <a-row justify="center" type="flex" align="middle">
        <a-col span="20">
          <a-button block size="large" type="primary" @click="$router.push('/')">去登录</a-button>
        </a-col>
      </a-row>
    </form>
  </div>
</template>

<script>
import Icon from "./icon";
import { input, button, row, col, radioGroup, radio } from "ant-design-vue";
export default {
  data() {
    return {
      username: "",
      password: "",
      againpwd: "",
    };
  },
  components: {
    Icon,
    aInput: input,
    aButton: button,
    aRow: row,
    aCol: col,
    aRadio: radio,
    aRadioGroup: radio.Group
  },
  methods: {
    register() {
      if (this.username && this.password) {
        if (this.password === this.againpwd) {
          this.$axios
            .post("api/register", {
              username: this.username,
              password: this.password,
            })
            .then(res => {
              if (res.data.code) {
                this.$message.error(res.data.msg);
              } else {
                this.$message.success(res.data.msg);
                this.$router.push("/login");
              }
            })
            .catch(err => {
              this.$message.error("请求出错");
            });
        }else{
          this.$message.warning('两次密码不一致')
        }
      }else{
        this.$message.warning('用户名或密码不能为空')
      }
    }
  }
};
</script>

<style lang="less" scoped>
form {
  margin-top: 30px;
  .text-right {
    text-align: right;
  }
}
</style>