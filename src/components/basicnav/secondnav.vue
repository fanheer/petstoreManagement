<template>
  <div class="index-nav">
    <ul>
      <li>
        <router-link to="/petstore/storeindex">
          <span class="glyphicon glyphicon-home">
            首页
          </span>
        </router-link>
      </li>
      <li>
        <router-link to="/petstore/productindex">
          <span class="glyphicon glyphicon-duplicate">
            宠物及用品
          </span>
        </router-link>
      </li>
      <li>
        <router-link to="/petstore/serviceindex">
          <span class="glyphicon glyphicon-duplicate">
            预约服务
          </span>
        </router-link>
      </li>
      <li v-show="islogin">
        <router-link to="/petstore/cartindex">
          <span class="glyphicon glyphicon-shopping-cart">
            购物车
          </span>
        </router-link>
      </li>
      <!--<div class="exit-module">-->
      <!--欢迎ASD,{{name}} 注销-->
      <!--&lt;!&ndash; 教程中href是#，但我测试注销后不能自动跳到 &ndash;&gt;-->
      <!--&lt;!&ndash;<a href="/" v-on:click="quit">注销登入</a>&ndash;&gt;-->
      <!--</div>-->
    </ul>
  </div>
</template>
<script>
  import cookie from '../../assets/js/cookie'
  export default {
    name:'secondnav',
    data:function () {
      return{
//        islogin:false,
        islogin:true,
      }
    },
    mounted:function () {
      let loginuser=cookie.getUserName();
      if(loginuser===0){
        //没有登录
        this.islogin=false;
      }else{
        //已登录
        this.hasnotlogin=false;
        this.haslogin=true;
        this.weluser=loginuser;
      }
//      let uname = getCookie("username");
//      console.log(uname)
//      if(uname === ""){
//        this.islogin=false;
//      }else{
//        this.islogin=true;
//      }
    }
  }
</script>
<style scope>
  .index-nav{
    /*background-color: rgba(255,255,255,0.75);*/
    background-color: rgb(247, 176, 188);

    /*margin: -10px;*/
    /*margin-top: 16px;*/
    /*margin-bottom: -20px;*/
    height:65px;/*设置高度为28px*/
  }
  .index-nav ul{
    list-style:none;
    /*margin-left: -40px;*/
  }
  .index-nav li{
    float:left;/*让li元素左浮动*/
  }
  .index-nav ul li span{
    /*margin-right: 50px;*/
    margin-top: -1px;
    width:150px;/*设置元素宽为100px*/
    height: 65px;
    line-height:65px;/*设置行距为28px，让文字在每行的中间位置*/
    /*background-color: rgb(39, 121, 45);*/
    color: #ffffff;
    font-size:16px;/*用16号字*/
    position: relative;
    display:inline-block;/*这个比较关键，因为a本身就是联级元素，本身不具有宽高，用这个把它变成块级元素，这样前面设置的宽和高就能起作用了*/
    text-align:center;/*让文本居中*/
    text-decoration:none; /*去掉下划线*/
    /*border-right: 1px solid #a8acac;*/
  }
  /*.index-nav ul li span:after{*/
    /*content: "";*/
    /*border-left: 30px solid rgba(18,121,32,0.75);*/
    /*border-top: 30px solid transparent;*/
    /*border-bottom: 30px solid transparent;*/
    /*position: absolute;*/
    /*right: -30px;*/
    /*top: 0;*/
  /*}*/
  /*.index-nav ul li span:before{*/
    /*content: "";*/
    /*border-top: 30px solid rgba(18,121,32,0.75);*/
    /*border-bottom: 30px solid rgba(18,121,32,0.75);*/
    /*border-left: 30px solid transparent;*/
    /*position: absolute;*/
    /*top: 0;*/
    /*left: -30px;*/
  /*}*/
  /*!*.index-nav ul li:first-child span{*!*/
    /*!*border-top-left-radius: 10px;*!*/
    /*!*border-bottom-left-radius: 10px;*!*/
  /*!*}*!*/
  /*!*.index-nav ul li:first-child span:before{*!*/
    /*!*display: none;*!*/
  /*!*}*!*/
  /*!*.index-nav ul li:last-child span{*!*/
    /*!*border-top-right-radius: 10px;*!*/
    /*!*border-bottom-right-radius: 10px;*!*/
  /*!*}*!*/
  /*!*.index-nav ul li:last-child span:after{*!*/
    /*!*display: none;*!*/
  /*!*}*!*/
  /*.index-nav ul li span:hover:after{*/
    /*border-left-color: #f9ff95;*/
  /*}*/
  /*.index-nav ul li span:hover:before{*/
    /*border-top-color: #f9ff95;*/
    /*border-bottom-color: #f9ff95;*/
  /*}*/
  .index-nav ul li span:hover{ /*当鼠标放到a元素的上面时，a元素的样式改变*/
    background-color: rgba(216, 158, 158,1.0);
    color: #ffffff;
  }
</style>
