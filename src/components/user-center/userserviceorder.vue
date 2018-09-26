<template>
  <div class="sorder-table">
    <ul v-for="sorder in solist">
      <li>
        <span></span>预约订单编号：{{sorder.id}}
      </li>
      <li>
        <span></span>预约人姓名：{{sorder.osName}}
      </li>
      <li>
        <span></span>联系方式：{{sorder.osPhone}}
      </li>
      <li>
        <span></span>服务名称：{{sorder.seName}}
      </li>
      <li>
        <span></span>服务价格：{{sorder.sePrice}}
      </li>
      <li>
        <span></span>预约时间：{{sorder.orderDate}}
      </li>
    </ul>
  </div>
</template>
<script>
  import Vue from 'vue'
  import config from '../../config/ipurl'
  export default {
    name:'userserviceorder',
    data:function () {
      return{
        //预约订单
        solist:[],
      }
    },
    mounted:function () {
      this.showServiceOrders();
    },
    methods:{
      //查询服务订单
      showServiceOrders:function () {
        console.log("1111");
        let vm=this;
        vm.axios({
          method: 'post',
          url: config.api.showserviceorders,
        }).then(function (res) {
          console.log(res.data);
          console.log(res.data.status);
          if (res.data.status === 1) {
//            alert(res.data.msg);
          } else {
            vm.solist=res.data.data;
            console.log("solist"+vm.solist);
          }
        }).catch(function (error) {
        });
      },
    },
  }
</script>
<style scoped>
  .sorder-table{
    margin: 10px;
    /*text-align: center;*/
    display: block;
  }
  .sorder-table ul{
    /*border: 1px solid;*/
    padding-top: 10px;
    margin: 20px 10%;
    height:140px;
    background-color: #f2f9cd;
  }
  .sorder-table li{
    font-size: 14px;
    color: #676520;
    margin-left: 50px;
  }
</style>
