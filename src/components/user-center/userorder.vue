<template>
  <div>
    <div class="order-title">
      用户订单：
      <a @click="toProOrder">商品订单</a>
      <a @click="toSerOrder">服务订单</a>
    </div>
    <div v-show="showproduct">
      <productorder></productorder>
    </div>
    <div v-show="showservice">
      <serviceorder></serviceorder>
    </div>
  </div>

</template>
<script>
  import Vue from 'vue'
  import config from '../../config/ipurl'
  import productorder from '../../components/user-center/userproductorder.vue'
  import serviceorder from '../../components/user-center/userserviceorder.vue'
  export default {
    name:'userorder',
    data:function () {
      return{
        showproduct:true,//显示商品订单表
        showservice:false,//显示服务订单表
      }
    },
    components:{
      productorder,
      serviceorder,
    },
    mounted:function () {
      this.toProOrder();
      //购物车或者商品详情页面跳转的时候传一个flag 不为空的时候 ordershow=true
      //为空则跳转到个人中心的商品订单详情
    },
    methods: {
      toProOrder:function () {
        this.showproduct=true;
        this.showservice=false;
      },
      toSerOrder:function () {
        this.showproduct=false;
        this.showservice=true;
      },
    },
  }
</script>
<style scope>
  /*标题样式*/
  .order-title{
    margin-top: 10px;
    margin-bottom: 20px;
    font-size: 18px;
  }
  .order-title a{
    cursor: pointer;
    color: #888529;
    margin-right: 10px;
  }
</style>
