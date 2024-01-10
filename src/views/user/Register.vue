<template>
  <!-- 注册页面 -->
  <div class="image-preview">
    <el-avatar shape="circle" :size="150" :src="url" />
  </div>
  <el-form ref="ruleFormRef" :model="loginForm" status-icon :rules="rules" class="demo-ruleForm" v-if="showFrom">
    <el-form-item prop="userName">
      <el-input v-model="loginForm.userName" placeholder="请输入姓名" prefix-icon="User" />
    </el-form-item>
    <el-form-item prop="email">
      <el-input v-model="loginForm.email" type="email" autocomplete="off" placeholder="请输入邮箱" prefix-icon="Message" />
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="loginForm.password" type="password" autocomplete="off" placeholder="请输入密码" prefix-icon="Lock"
        show-password />
    </el-form-item>
    <el-form-item prop="repassword">
      <el-input v-model="loginForm.repassword" type="password" autocomplete="off" placeholder="请输入确认密码"
        prefix-icon="Lock" />
    </el-form-item>

    <el-form-item class="register-tools">
      <el-button type="primary" class="item btnRegister" @click="submitForm()">用户注册</el-button>
      <el-button class="item btnRegister" @click="Login(ruleFormRef)">用户登录</el-button>
    </el-form-item>
  </el-form>
  <!-- 登陆 -->
  <el-form ref="ruleFormRef" :model="loginForm" status-icon :rules="rules" class="demo-ruleForm" v-if=!showFrom>
    <el-form-item prop="email">
      <el-input v-model="loginForm.email" type="email" autocomplete="off" placeholder="请输入邮箱" prefix-icon="Message" />
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="loginForm.password" type="password" autocomplete="off" placeholder="请输入密码" prefix-icon="Lock"
        show-password />
    </el-form-item>
    <el-form-item class="register-tools">
      <el-button type="primary" class="item btnRegister" @click="submitForm()">用户注册</el-button>
      <el-button class="item btnRegister" @click="Login(ruleFormRef)">用户登录</el-button>
    </el-form-item>
  </el-form>
</template>
    
<script >
// import { useRouter } from "vue-router";
import { login, register } from '../../http/LoginAndRegister'
import { useUserStore } from '../../pinia/store';
export default {
  setup() { },

  data() {
    return {
      // 控制注册和登陆
      showFrom: true,
      loginForm: {
        email: "",
        password: "",
        userName: "",
        repassword: "",
      },
      url: "https://springboot-web-image.oss-cn-fuzhou.aliyuncs.com/touxiang.jpg",
      rules: {
        userName: [
          {
            type: "string",
            required: true,
            message: "必填项",
            triggler: "blur",
          },
          {
            min: 8,
            max: 20,
            message: "名称的长度在8到20之间",
            triggler: "blur",
          },
        ],
        email: [
          {
            type: "string",
            required: true,
            message: "必填项",
            triggler: "blur",
          },
          { type: "email", message: "请输入正确格式的邮箱" },
        ],
        password: [
          {
            type: "string",
            required: true,
            message: "必填项",
            triggler: "blur",
          },
          {
            min: 8,
            max: 20,
            message: "密码的长度在8到20之间",
            triggler: "blur",
          },
        ],
        repassword: [
          {
            type: "string",
            required: true,
            message: "必填项",
            triggler: "blur",
          },
          {
            min: 8,
            max: 20,
            message: "密码的长度在8到20之间",
            triggler: "blur",
          },
        ],
      },
    };
  },
  methods: {

    submitForm() {
      if (!this.showFrom) {
        this.showFrom = true;
        return;
      }
      console.log(this.$refs["ruleFormRef"]);
      // let data = {
      //   email: this.loginForm.email,
      //   password: this.loginForm.password,
      //   userName: this.loginForm.userName,
      // };
      if (this.loginForm.password == this.loginForm.repassword) {
        let data = this.loginForm;
        this.$refs["ruleFormRef"].validate(function (valid) {
          if (valid) {
            // 加载中
            const loading = ElLoading.service({
              lock: true,
              text: 'Loading',
              background: 'rgba(0, 0, 0, 0.7)',
            })
            // 注册
            register(data).then(result => {
              console.log(result);
              // 注册成功关闭加载中，并显示登陆界面
              if (result.code == 1) {
                setTimeout(() => {
                  loading.close()
                  ElMessage({
                    showClose: true,
                    message: result.msg,
                    type: 'success',
                  })
                }, 1000)
              } else {
                // 登陆失败弹出
                setTimeout(() => {
                  loading.close()
                  ElMessage({
                    showClose: true,
                    message: result.msg,
                    type: 'error',
                  })
                }, 1000)
              }
            }).catch(err => {
              setTimeout(() => {
                loading.close()
                ElMessage({
                  showClose: true,
                  message: result.msg,
                  type: 'error',
                })
              }, 1000)
              console.log(err);

            })
          } else {
            console.log("error submit!");
            return false;
          }
        });
      } else {
        alert("二次密码不一致");
      }
    },

    Login() {
      if (this.showFrom) {
        this.showFrom = false
        return
      }

      console.log(this.$refs["ruleFormRef"]);
      // let data = this.loginForm;
      let data = {
        email: this.loginForm.email,
        password: this.loginForm.password,
      };
      
      var that = this;
      this.$refs["ruleFormRef"].validate(function (valid) {
        if (valid) {
          const loading = ElLoading.service({
            lock: true,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.7)',
          })
          login(data).then(result => {
            if (result.code == 1) {
              setTimeout(() => {
                loading.close()
                ElMessage({
                  showClose: true,
                  message: result.msg,
                  type: 'success',
                })
                // 存储 token
                const userStore = useUserStore();
                userStore.setToken(result.data.userinfo.token);  
                // 跳转
                that.$router.push({
                  path: "/userinfo",
                });
              }, 1000)
            } else {
              setTimeout(() => {
                loading.close()
                ElMessage({
                  showClose: true,
                  message: result.msg,
                  type: 'error',
                })
              }, 1000)
            }

          }).catch(err => {
            console.log(err);
            setTimeout(() => {
              loading.close()
              ElMessage({
                showClose: true,
                message: result.msg,
                type: 'error',
              })
            }, 1000)

          })

        } else {
          console.log("error submit!");
          return false;
        }
      });


    },
    remake() {
      this.loginForm = {
        email: "",
        password: "",
        userName: "",
        repassword: "",
      };
    },
    test() {
      this.$router.push({
        path: "/userinfo",
      });
    },
  },
};
</script>
  
<style scoped>
.el-form-item__content {
  justify-content: center;
}

.image-preview {
  height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.register-tools {
  display: flex;
}

.register-tools .item {
  flex-grow: 1;
}
</style>
    