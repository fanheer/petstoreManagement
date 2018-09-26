<template>
  <div class="third-nav">
    <div>
      <ul>
        <li>
          <router-link to="/usercenter/centerindex">
            <span class="glyphicon glyphicon-envelope">通知中心</span>
          </router-link>
        </li>
        <li>
          <router-link to="/usercenter/usermess">
            <span class="glyphicon glyphicon-duplicate">我的资料</span>
          </router-link>
        </li>
        <li>
          <router-link to="/usercenter/userpsw">
            <span class="glyphicon glyphicon-pencil">修改密码</span>
          </router-link>
        </li>
        <li>
          <router-link to="/usercenter/userorder">
            <span class="glyphicon glyphicon-menu-hamburger">查询订单</span>
          </router-link>
        </li>
        <li>
          <router-link to="/usercenternav">
            <span class="glyphicon glyphicon-share-alt">
              Return
            </span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import cookie from '../../assets/js/cookie'
  export default {
    name:'thirdnav',
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
  .third-nav{
    width: 1500px;
    background-color: #fbffb8;
    box-shadow: 0px 3px 5px #a68e20;
    /*border-bottom: 1px solid;*/
  }
  .third-nav ul{
    padding-left: 660px;
    margin:0;
  }
  .third-nav ul li{
    float: left;
    text-decoration:none;
    height:45px;
    line-height:45px;
    font-size: 16px;
    width:130px;
    display:block;/*这个比较关键，因为a本身就是联级元素，本身不具有宽高，用这个把它变成块级元素，这样前面设置的宽和高就能起作用了*/
    text-align:center;/*让文本居中*/

  }
  .third-nav li a{
    text-shadow: 0 0 1px rgba(0,0,0,0.2);
    color: #cbbc27;
  }
  .third-nav li a:hover{
    color: #e6d95b;
  }
</style>
