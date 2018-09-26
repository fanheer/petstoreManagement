<template>
  <div class="usercenter-nav">
    <div class="wel-words">
        欢迎您，  {{welusername}}
        <router-link to="/petstore">返回主页</router-link>
    </div>
    <div class="logo-link">
      <router-link to="/usercenter/centerindex">
        <span class="glyphicon glyphicon-envelope"><h5>通知中心</h5></span>
      </router-link>
      <router-link to="/usercenter/usermess">
        <span class="glyphicon glyphicon-duplicate"><h5>我的资料</h5></span>
      </router-link>
      <router-link to="/usercenter/userpsw">
        <span class="glyphicon glyphicon-pencil"><h5>修改密码</h5></span>
      </router-link>
      <router-link to="/usercenter/userorder">
        <span class="glyphicon glyphicon-menu-hamburger"><h5>我的订单</h5></span>
      </router-link>
    </div>
  </div>
</template>
<script>
  import cookie from '../../assets/js/cookie'
  export default {
    name:'usercenternav',
    data(){
      return{
        welusername:'',
      }
    },
    mounted(){
      let loginuser=cookie.getUserName();
      if(loginuser===0){
        //没有登录
//        this.$router.push("/")
      }else{
        //已登录
        this.welusername=loginuser;
      }
    },
  }
</script>
<style scope>
  .usercenter-nav{
    max-width:100%;
    height:700px;
    background: url("../../assets/usercenter/bg2.jpg");
  }
  .wel-words{
    padding-top: 20px;
    padding-left: 50px;
    font-size: 22px;
    border: 1px solid;
  }
  .wel-words a{
    color: #202020;
  }
  .logo-link{
    width: 500px;
    height: 190px;
    margin-top: 80px;
    margin-left: 80px;
    padding: 50px;
    font-size: 60px;
    color: #342e0c;
    align-content: center;
    border:1px #342e0c;
    color: transparent;
    text-shadow: 0 0 5px rgba(0,0,0,0.5);
    background-color:rgba(255,255,255,0.25);
    /*border-style: solid;*/
    border-radius: 100px;
    word-spacing:35px;
  }
  .logo-link a{
    color: #342e0c;
  }
  .logo-link span:hover{
    color: #8c8c8c;
    font-size: 61px;
    cursor: pointer;
  }
</style>
