<template>
  <div class="all">
    <!--导航栏div-->
    <div>
      <firstnav></firstnav>
    </div>
    <div>
      <secondnav></secondnav>
    </div>
    <!--主页功能模块-->
    <div class="func-module">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import firstnav from '@/components/basicnav/firstnav'
  import secondnav from '@/components/basicnav/secondnav'
  import cookie from '../../assets/js/cookie.js'
  import storeindex from '@/components/pet-store/storeindex'
  import productindex from '@/components/pet-store/productindex'
  export default{
    name:'petStore',
    components:{
      firstnav,
      secondnav,
    },
    data(){
      return{
        name:""
      }
    },
  }
</script>

<style scope>
  .all{
  }
  /*功能模块框*/
  .func-module{
    background-color: #ffffe0;
    padding: 10px 30px ;
  }
</style>
