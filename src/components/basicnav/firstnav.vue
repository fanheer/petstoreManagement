<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="black-nav">
    <ul>
      <li v-show="haslogin">
        <span class="glyphicon glyphicon-share-alt" v-on:click="quit()">
          <a id="quita">注销</a>
        </span>
      </li>
      <li>
        <router-link to="/">
          <span class="glyphicon glyphicon-send">
            与我们联系
          </span>
        </router-link>
      </li>
      <li v-show="haslogin">
        <router-link to="/usercenternav">
          <span class="glyphicon glyphicon-user">
            个人中心
          </span>
        </router-link>
      </li>
      <li v-show="hasnotlogin">
        <router-link to="/">
          <span class="glyphicon glyphicon-send">
            注册&登录
          </span>
        </router-link>
      </li>
      <li v-show="haslogin">
        欢迎会员{{weluser}}
      </li>
    </ul>
  </div>
</template>
<script>
  import config from '../../config/ipurl'
  import cookie from '../../assets/js/cookie'
  export default {
    name:'firstnav',
    data(){
      return{
        hasnotlogin:true,
        haslogin:false,
        weluser:''
      }
    },
    mounted(){
      let loginuser=cookie.getUserName();
      if(loginuser===0){
        //没有登录
        this.hasnotlogin=true;
        this.haslogin=false;
      }else{
        //已登录
        this.hasnotlogin=false;
        this.haslogin=true;
        this.weluser=loginuser;
      }
    },
    methods:{
      quit(){
        let vm=this;
        vm.axios({
          method:'post',
          url:config.api.logout,
        }).then(function (response) {
          if(response.data.status===0){
            cookie.deleteUserInfo();
            alert("已退出登录！");
            vm.hasnotlogin=true;
            vm.haslogin=false;
            vm.$router.push({path:'/'});
          }
          else{
            //注销失败
          }
        }).catch(function (error) {
        })
      }
    }

  }
</script>
<style scope>
  .black-nav{
    background-color: #a0a0a0;
    /*background-color:rgba(255,255,168,0.75);*/
    /*border: 1px solid;*/
    /*border-color: #0c5115;*/
    margin: -10px;
    height: 40px;
    /*color: #15791b;*/
  }
  .black-nav ul li{
    float: right;
    width:170px;/*设置元素宽为100px*/
    margin-top: 10px;
    height: 28px;
    line-height:28px;/*设置行距为22px，让文字在每行的中间位置*/
    background-color: #a0a0a0;
    display:block;/*这个比较关键，因为a本身就是联级元素，本身不具有宽高，用这个把它变成块级元素，这样前面设置的宽和高就能起作用了*/
    text-align:center;/*让文本居中*/
    color: #f2f9cd;
   }
  .black-nav ul li span{
    font-size:14px;/*用16号字*/
    /*color: #15791b;*/
    color: #f2f9cd;
  }
  #quita{
    /*鼠标移上去是手*/
    cursor:pointer;
    color: #f2f9cd;
    /*text-decoration:none; //去掉下划线*!*?*/
  }
</style>
