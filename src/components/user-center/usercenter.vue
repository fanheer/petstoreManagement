<template>
  <div class="user-message">
   <!--欢迎提示-->
    <div class="grid">
      <thirdnav></thirdnav>
    </div>
    <div class="item">
        <div >
          <router-view></router-view>
        </div>
    </div>
  </div>
</template>
<script>
  import thirdnav from '@/components/basicnav/thirdnav'
  export default {
    name:'userCenter',
    data(){
      return{
      }
    },
    components:{
      thirdnav,
    }
  }
</script>
<style scope>
  .user-message{
    margin: auto;
    margin-right:-1px;
    margin-bottom:-1px;
  }
  /*两子元素在父元素靠近排列*/
  .grid {
    margin-right:-1px;
    margin-bottom:-1px;
    display: flex;
    flex-flow: wrap;
    width: auto;
    height: auto;
  }
  .item{
    margin-left: 10px;
    flex: auto;
  }

</style>
