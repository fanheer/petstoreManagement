<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="main-box">
    <div class="main-banner"></div>
    <div class="item-login">
      <div class="login-wrap" v-show="showLogin">
        <h3>登录</h3>
        <p v-show="showTishi" class="tipshow">{{tishi}}</p>
        <div>
          <input v-validate="'required|email'" name="email" placeholder="请输入登录邮箱" v-model="username"type="text" >
          <span v-show="errors.has('email')" class="tipshow">{{ errors.first('email') }}</span>
        </div>
        <div class="encrypt-box">
          <input v-validate="'required|password'" name="password" placeholder="请输入密码" v-model="password" :type="encrypt.pwdType">
          <a @click="changeType()"> <img :src="encrypt.imgSrc"></a>
        </div>
        <div>
          <span v-show="errors.has('password')" class="tipshow">{{ errors.first('password') }}</span>
        </div>
        <div class="yzm-box">
          <input v-validate="'required'" name="code" v-model="yzm" placeholder="请输入验证码" type="text">
          <input type="button" @click="createCode" class="verification1" v-model="checkCode"/>
        </div>
        <div>
          <span v-show="errors.has('code')" class="tipshow">{{ errors.first('code') }}</span>
        </div>
        <div class="check-role">
          <input type="radio" name="checkRole" value="0" checked="checked">会员
          <!--<a @click="ToFindPsw">找回密码</a>-->
          <!--<input type="radio"  name="checkRole" value="1">管理员-->
        </div>
        <button v-on:click="login">登录</button>
        <span v-on:click="ToRegister" class="skipspan">没有账号？马上注册</span>
      </div>
      <div class="register-wrap" v-show="showRegister">
        <h3>注册</h3>
        <p v-show="showTishi" class="tipshow">{{tishi}}</p>
        <div>
          <input v-validate="'required'" name="newname" placeholder="请输入用户名" v-model="newUsername"type="text" >
          <span v-show="errors.has('newname')" class="tipshow">{{ errors.first('newname') }}</span>
        </div>
        <div>
          <input v-validate="'required|email'" name="newemail" placeholder="请输入邮箱" v-model="newEmail"type="text" >
          <span v-show="errors.has('newemail')" class="tipshow">{{ errors.first('newemail') }}</span>
        </div>
        <div class="encrypt-box">
          <input v-validate="'required|password'" name="newpassword" placeholder="请输入密码" v-model="newPassword" :type="encrypt.pwdType">
          <a @click="changeType()"> <img :src="encrypt.imgSrc"></a>
        </div>
        <div>
          <span v-show="errors.has('newpassword')" class="tipshow">{{ errors.first('newpassword') }}</span>
        </div>
        <div>
          <input v-validate="'required'" name="newquestion" placeholder="请输入密码提示问题" v-model="newQuestion" type="text">
          <span v-show="errors.has('newquestion')" class="tipshow">{{ errors.first('newquestion') }}</span>
        </div>
        <div>
          <input v-validate="'required'" name="newanswer" placeholder="请输入密码提示答案" v-model="newAnswer"type="text" >
          <span v-show="errors.has('newanswer')" class="tipshow">{{ errors.first('newanswer') }}</span>
        </div>
        <div class="email-yzm">
          <input v-validate="'required'" placeholder="请输入验证码" type="text" v-model="emailcode">
          <a @click="getEmailCode">获取验证码</a>
        </div>
        <button v-on:click="register">注册</button>
        <span v-on:click="ToLogin" class="skipspan">已有账号？马上登录</span>
      </div>
      <div class="findpsw-wrap" v-show="showFind">
        <h3>找回密码</h3>
        <div>
          <input v-validate="'required|email'" name="pemail" placeholder="请输入邮箱" v-model="pemail"type="text" >
          <span v-show="errors.has('pemail')" class="tipshow">{{ errors.first('pemail') }}</span>
        </div>
        <div class="email-yzm">
          <input v-validate="'required'" placeholder="请输入验证码" type="text" v-model="pemailcode">
          <a @click="getpEmailCode">获取验证码</a>
        </div>
        <div class="find-button-group">
          <button v-on:click="resetpsw">重置密码</button>
          <button v-on:click="ToLogin">返回</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
//  import {setCookie,getCookie} from '../../assets/js/cookie.js'
  import cookie from '../../assets/js/cookie'
  import config from '../../config/ipurl'
  export default {
    name:'main1',
    data() {
      return {
        showLogin:true ,
        showRegister: false,
        showFind:false,
        showTishi: false,
        tishi: '',
//        登录时输入框内容
        username: '',
        password: '',
        checkCode:'',//当前的验证码
        yzm:'',//输入框中获得的验证码
        role:'',//登录角色
//        注册时输入框内容
        newUsername: '',
        newEmail:'',
        newPassword: '',
        newQuestion:'',
        newAnswer:'',
        emailcode:'',//邮箱验证码
//        密码明密文切换
        encrypt: {
          pwdType: 'password',
          imgSrc:require("../../assets/login/eye-close.png")
        },
        token:'',//邮箱验证的时效token
        checkcode:'',//验证

        //找回密码
        pemail:'',
        pemailcode:'',
        ptoken:'',//邮箱验证的时效token
        pcheckcode:'',//验证
      }
    },
    mounted() {
      let loginuser=cookie.getUserName();
      if(loginuser===0){
        //没有登录
        this.createCode();
      }else{
        //已登录
        this.$router.push('/petstore');
      }
    },
    methods: {
      //重置密码
      resetpsw:function () {
        let vm=this;
        if(vm.pemailcode===vm.pcheckcode){
          let params = new URLSearchParams();
          console.log(vm.ptoken);
          params.append('forgetToken',vm.ptoken);
          params.append('passwordNew', "123456");
          this.axios.post(config.api.forget_reset_password, params).then((res) => {
            if (res.data.status === 1) {
              console.log("修改密码错误");
              alert("页面验证码已过期，请重新验证邮箱！");
            }else if(res.data.status===2){
              console.log("页面已过期")
            }else {
              //将问题显示在页面上
              alert("密码已重置为初始密码：123456，如需修改密码请在个人中心页面修改");
              this.ToLogin();
            }
          })
        }else{
          alert("请输入正确的验证码")
        }
      },
      login:function(){
        let vm=this;
        if(vm.username===''||vm.password===''){
          alert("请输入登录信息");
        }else if(!vm.checkLpicma()){
        }else {
          vm.role=$('input:radio:checked').val();
          console.log(vm.role);
          if(vm.role==='1'){
            //管理员登录
            let params = new URLSearchParams();
            params.append('hostNo', vm.username);
            params.append('password', vm.password);
            this.axios.post(config.api.adlogin,params).then((res)=>{
              console.log(res.data);
              console.log(typeof res.data);
              if(res.data.status===4){
                vm.tishi = " 工号不存在";
                vm.showTishi = true
              }else if(res.data.status === 1){
                vm.tishi = "密码输入错误";
                vm.showTishi = true
              }else if(res.data.status===0){
                vm.tishi = "登录成功";
                vm.showTishi = true;
                console.log("res.data.id:"+res.data.data.id);
                setTimeout(function(){
                  alert("管理员登录成功！");
                  vm.$router.push({path:'http://192.168.43.85:8080/admin.jsp'});
                }.bind(vm),1000)
              }
            })
          }
          else{
            //用户登录
            // URLSearchParams对象是为了让参数以form data形式
            let params = new URLSearchParams();
            params.append('email', vm.username);
            params.append('password', vm.password);
            this.axios.post(config.api.login,params).then((res)=>{
              console.log(res.data);
              console.log(typeof res.data);
              if(res.data.status===4){
                vm.tishi = " 账号输入错误";
                vm.showTishi = true
              }else if(res.data.status === 1){
                vm.tishi = "密码输入错误";
                vm.showTishi = true
              }else if(res.data.status===0){
                vm.tishi = "登录成功";
                vm.showTishi = true;
                //存储localsession
                console.log("res.data.id:"+res.data.data.id);
                let uid=res.data.data.id;
                let uname=res.data.data.uName;
                cookie.setUserInfo(uid,uname);
                setTimeout(function(){
                  vm.$router.push({path:'/petstore'});
                }.bind(vm),1000)
              }
            })
          }
        }
      },
      register:function(){
        let vm=this;
        if(vm.newUsername===''||vm.newEmail===''||vm.newPassword===''||vm.newQuestion===''||vm.newAnswer===''){
          alert("请填写注册信息");
        }else if(vm.emailcode===''){
          alert("请输入接收到的邮箱验证码");
        }else if(vm.emailcode!==vm.checkcode){
          alert("验证码输入错误");
        }else{
          let params = new URLSearchParams();
          params.append('uName', vm.newUsername);
          params.append('uEmail',vm.newEmail);
          params.append('uPsd', vm.newPassword);
          params.append('uQuestion', vm.newQuestion);
          params.append('uAnswer', vm.newAnswer);
          params.append('emailToken', vm.token);
          params.append('emailCode', vm.emailcode);
          vm.axios.post(config.api.register,params).then((res)=>{
            console.log(res);
            console.log(res.data);
            if(res.data.status===0){
              vm.tishi = "注册成功";
              vm.showTishi = true;
              vm.newUsername="";
              vm.newEmail="";
              vm.newPassword="";
              vm.newQuestion="";
              vm.newAnswer="";

              setTimeout(function(){
                vm.ToLogin();
                this.showTishi = false
              }.bind(this),1000);
            }else {
              alert(res.data.msg);
            }
          })
        }
      },
      ToRegister:function(){
        this.showRegister = true;
        this.showLogin = false;
        this.showFind=false;
      },
      ToLogin:function(){
        this.showRegister = false;
        this.showLogin = true;
        this.showFind=false;
      },
      ToFindPsw:function () {
        this.showRegister = false;
        this.showLogin =false ;
        this.showFind=true;
      },

      // 图片验证码
      createCode:function(){
        let code = "";
        let codeLength = 4;//验证码的长度
        let random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R',
          'S','T','U','V','W','X','Y','Z');//随机数
        for(let i = 0; i < codeLength; i++) {
          //循环操作
          let index = Math.floor(Math.random()*36);//取得随机数的索引（0~35）
          code += random[index];//根据索引取得随机数加到code上
        }
        this.checkCode = code;//把code值赋给验证码
      },
      // 失焦验证图和密码
      checkLpicma:function(){
        this.yzm.toUpperCase();//取得输入的验证码并转化为大写
        if(this.yzm === '') {
          alert("请输入验证码");
          return false;
          //未输入验证码
        }else if(this.yzm.toUpperCase() !== this.checkCode ) {
          //输入的验证码与产生的验证码不一致
          alert("验证码不一致，请重新输入");
          console.log( this.yzm.toUpperCase());
          this.createCode();//刷新验证码
          this.yzm = '';
          return false;
        }else {
          //输入正确时
          return true;
        }
      },
      //明密文切换
      changeType: function () {
        if(this.encrypt.pwdType==="text"){
          this.encrypt.pwdType = "password";
          this.encrypt.imgSrc =require("../../assets/login/eye-close.png");
        }else if(this.encrypt.pwdType==="password"){
          this.encrypt.pwdType = "text";
          this.encrypt.imgSrc =require("../../assets/login/eye-open.png")
        }
      },
      //邮箱验证
      getEmailCode:function () {
        let vm=this;
        let params = new URLSearchParams();
        params.append('email', vm.newEmail);
        vm.axios.post(config.api.getemailcode,params).then((res)=>{
          console.log(res.data);
          if(res.data.status===0){
//            console.log("chenggong")
            vm.token=res.data.data[0];
            vm.checkcode=res.data.data[1];
            alert("发送成功，请注意查收");
          }
        })
      },
      getpEmailCode:function () {
        let vm=this;
        let params = new URLSearchParams();
        params.append('email', vm.pemail);
        vm.axios.post(config.api.getemailcode,params).then((res)=>{
          console.log(res.data);
          if(res.data.status===0){
//            console.log("chenggong")
            vm.ptoken=res.data.data[0];
            vm.pcheckcode=res.data.data[1];
          }
        })
      },
    }
  }
</script>
<style scoped>

  /*整体注册登录页框*/
  .main-box{
    border: 1px solid;
    padding: 180px 350px;
    font-size: 16px;
    background: url("../../assets/login/bg.jpg")no-repeat center;
    background-size:100% 99.9%;
  }
  /*登录注册导航头*/
  .main-banner{
    height: 70px;
    width: 1400px;
    margin-top: -180px;
    margin-left: -350px;
    margin-bottom: 80px;
    background-color: rgba(14, 97, 26, 0.65);
  }
  .item-login{
    background-color: rgba(255, 255, 255, 0.75);
    /*border:2px ridge #2b542c;*/
    width: 600px;
    height: auto;
    padding:20px 0;
    /*flex: 0 0 50%;*/
    /*margin-right: 10px;*/
    /*margin-right: auto;*/
    /*margin-left: auto;*/
  }
  /*登录/注册/找回密码模块*/
  .login-wrap{
    text-align:center;
    /*margin-top: 100px;*/
  }
  .findpsw-wrap{
    text-align: center;
  }
  .register-wrap{
    text-align: center;
  }
  .item-login input{
    display:block;
    width:250px;
    height:40px;
    line-height:40px;
    margin:10px auto;
    margin-bottom: 10px;
    outline:none;
    border:1px solid #888;
    padding:10px;
    box-sizing:border-box;
  }
  .item-login button{
    display:block;
    width:250px;
    height:40px;
    line-height: 40px;
    margin:10px auto;
    border:none;
    background-color:#41b883;
    color:#fff;
    font-size:16px;
    margin-bottom:5px;
  }
  .skipspan{
    cursor:pointer;
  }
  .skipspan:hover{
    color:#41b883;
  }
  .tipshow{
    /*border: 1px solid;*/
    font-size: 14px;
    color: #0d7934;
    height: 20px;
    line-height:20px;
  }
/*验证码*/
  .yzm-box{
    /*border: 1px solid;*/
    display:inline-flex;

  }
  .yzm-box input{
    width: 120px;
    margin: 10px 4px;
    text-align: center;
    font-size: 16px;
    /*padding-top:0px;*/
  }

  .email-yzm{
    display:inline-flex;
  }
  .email-yzm input{
    width: 170px;
    margin: 0 auto;
  }
  .email-yzm a{
    /*border: 1px solid;*/
    text-align: center;
    margin-top: 10px;
    cursor: pointer;
  }
  /*密码和图标框*/
  .encrypt-box{
    display:inline-flex;
  }
  .encrypt-box input{
    width: 200px;
    margin: 3px 4px;
  }
  .encrypt-box a{
    margin-top: 8px;
    cursor: pointer;
  }
  .check-role {
    /*border: 1px solid;*/
    display: inline-flex;
    width: 50%;
  }
  .check-role a{
    cursor: pointer;
    margin-left: 20px;
  }
  .check-role input{
    border: 1px solid;
    float: left;
    width: 20px;
    height: 20px;
    margin: 0;
    margin-left: 26px;
  }
  /*找回密码*/
  .find-button-group{
    /*border: 1px solid;*/
    display: flex;
    /*text-align: center;*/
    /*width: 400px;*/
    margin: 20px 160px;
  }
  .find-button-group button{
    width: 120px;
  }
</style>
