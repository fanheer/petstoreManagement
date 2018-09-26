<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="userpswshow">
    <div v-show="firststep">
      <div class="psw-box">
        密码提示问题：
        <span>{{userQuestion}}</span>
      </div>
      <div class="psw-box">
        密码提示答案：
        <input v-model="userAnswer" type="text">
      </div>
      <div class="psw-box">
        <button v-on:click="checkquestion()">提交</button>
      </div>
    </div>
    <div v-show="secondstep">
      <div class="encrypt-box">
        请输入原密码：<input v-validate="'required'" name="newpassword" placeholder="请输入密码" v-model="oldPsw" :type="encrypt1.pwdType">
        <a @click="changeType1()"> <img :src="encrypt1.imgSrc"></a>
      </div>
      <div class="encrypt-box">
        请输入新密码：<input v-validate="'required'" name="newpassword" placeholder="请输入密码" v-model="newPsw" :type="encrypt2.pwdType">
        <a @click="changeType2()"> <img :src="encrypt2.imgSrc"></a>
      </div>
      <div class="encrypt-box">
        请再一次输入新密码：<input v-validate="'required'" name="newpassword" placeholder="请输入密码" v-model="newPsw2" :type="encrypt3.pwdType">
        <a @click="changeType3()"> <img :src="encrypt3.imgSrc"></a>
      </div>
      <div class="psw-box">
        <button v-on:click="alterUpsw()">确认修改</button>
      </div>
    </div>

  </div>
</template>
<script>
  import cookie from '../../assets/js/cookie'
  import config from '../../config/ipurl'
  import firstnav from '../../components/basicnav/firstnav.vue'
  export default {
    name: 'userpsw',
    data() {
      return {
        firststep: true,
        secondstep: false,
        userQuestion: '',
        userAnswer: '',
        oldPsw: '',
        newPsw: '',
        newPsw2: '',
        forgetToken:'',
        encrypt1: {
          pwdType: 'password',
          imgSrc:require("../../assets/login/eye-close.png")
        },
        encrypt2: {
          pwdType: 'password',
          imgSrc:require("../../assets/login/eye-close.png")
        },
        encrypt3: {
          pwdType: 'password',
          imgSrc:require("../../assets/login/eye-close.png")
        },
//        forgetToken=new Object(),
      }
    },
    mounted: function () {
      let loginuser=cookie.getUserName();
      if(loginuser===0){
        //没有登录
        this.$router.push('/petstore');
      }else{
        //已登录
        this.getUquestion(loginuser)
      }
    },
    methods: {
      getUquestion: function (username) {
        let vm = this;
        let params = new URLSearchParams();
        params.append('username', username);
        console.log(typeof username+username);
        this.axios.post(config.api.forget_get_question, params).then((res) => {
          console.log(res.data);
          if (res.data.status === 1) {
            console.log("用户不存在");
          } else {
            //将问题显示在页面上
            vm.userQuestion = res.data.data;
          }
        })
      },
      checkquestion: function () {
        let vm = this;
        let params = new URLSearchParams();
        params.append('answer', vm.userAnswer);
        console.log(typeof vm.userAnswer);
        this.axios.post(config.api.forget_check_answer, params).then((res) => {
          console.log(res.data);
          console.log(typeof res.data);
          if (res.data.status === 1) {
            alert("问题答案错误")
          } else {
            console.log("问题答案正确");
            //跳转到修改密码div
            vm.firststep = false;
            vm.secondstep = true;
            vm.forgetToken=res.data.data;
            console.log("res.data.token1"+res.data.data);
            console.log("this.forgetToken1"+vm.forgetToken);
          }
        })
      },
      alterUpsw: function () {
        if(this.newPsw!==this.newPsw2){
          alert("输入密码不一致，请重新输入！");
        }else{
          let vm = this;
          let params = new URLSearchParams();
          params.append('forgetToken',vm.forgetToken);
          params.append('passwordNew', vm.newPsw);
          this.axios.post(config.api.forget_reset_password, params).then((res) => {
            if (res.data.status === 1) {
              console.log("修改密码错误");
              alert("页面已过期，请重新回答密保问题！");
              vm.firststep = true;
              vm.secondstep = false;
            }else if(res.data.status===2){
              alert("页面已过期")
            }else {
              //将问题显示在页面上
              console.log("修改成功");
              alert("修改密码成功，请重新登录！");
              cookie.deleteUserInfo();
              vm.$router.push({path:'/'});
//            firstnav.quit();
            }
          })
        }
      },
      //明密文切换1
      changeType1: function () {
        if(this.encrypt1.pwdType==="text"){
          this.encrypt1.pwdType = "password";
          this.encrypt1.imgSrc =require("../../assets/login/eye-close.png");
        }else if(this.encrypt1.pwdType==="password"){
          this.encrypt1.pwdType = "text";
          this.encrypt1.imgSrc =require("../../assets/login/eye-open.png")
        }
      },
      //明密文切换2
      changeType2: function () {
        if(this.encrypt2.pwdType==="text"){
          this.encrypt2.pwdType = "password";
          this.encrypt2.imgSrc =require("../../assets/login/eye-close.png");
        }else if(this.encrypt2.pwdType==="password"){
          this.encrypt2.pwdType = "text";
          this.encrypt2.imgSrc =require("../../assets/login/eye-open.png")
        }
      },
      //明密文切换3
      changeType3: function () {
        if(this.encrypt3.pwdType==="text"){
          this.encrypt3.pwdType = "password";
          this.encrypt3.imgSrc =require("../../assets/login/eye-close.png");
        }else if(this.encrypt3.pwdType==="password"){
          this.encrypt3.pwdType = "text";
          this.encrypt3.imgSrc =require("../../assets/login/eye-open.png")
        }
      },
    }
  }
</script>
<style scope>
  .userpswshow {
    text-align: center;
    margin: 60px;
  }
  .psw-box{
    font-size: 16px;
    margin: 10px;
  }
  .psw-box button{
    width: 120px;
    height: 30px;
    border: 1px solid;
    line-height:30px;
    text-align:center;
    color: white;
    background-color: #d7c450;
  }
</style>
