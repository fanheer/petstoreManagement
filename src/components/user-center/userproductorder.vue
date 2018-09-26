<template>
  <div class="porder-table">
    <v-table
      is-horizontal-resize
      style="width:100%;"
      :row-height="50"
      row-hover-color="#eee"
      row-click-color="#edf7ff"
      :columns="pordersColumns"
      error-content="暂时没有任何订单哦，快去逛逛吧！"
      :table-data="pordersData"
      @on-custom-comp="orderCustomCompFuc">
    </v-table>
    <dialog-bar :showdialog='showdia' :sendordernum='ordernum' @closedetail="closethis" msg="msg"></dialog-bar>
    <!--<button @click="openorder">打开</button>-->
    <!--<orderdetail :showorder='ordershow' @closedetail="changeOrderFlag"></orderdetail>-->
  </div>
</template>
<script>
  import Vue from 'vue'
  import config from '../../config/ipurl'
  import dialogBar from '../../components/basicnav/dialog.vue'
  export default {
    name:'userproductorder',
    data:function () {
      return{
        //订单号
        ordernum:0,
        //组件
        showdia:false,
        //商品订单表格信息
        pordersData:[],
        pordersColumns:[
          {width: 20, titleAlign: 'center',columnAlign:'center',type: 'selection',isResize:true},
          {field: 'orderNo', title:'商品编号', width: 300, titleAlign: 'center',columnAlign:'center',isResize:true},
          {field: 'orderAmount', title: '总金额(元)', width: 70, titleAlign: 'center',columnAlign:'center',isResize:true},
          {field: 'statusDesc', title:'支付状态', width: 40, titleAlign: 'center',columnAlign:'center',isResize:true},
          {field: 'createTime', title: '订单生成时间', width: 70, titleAlign: 'center',columnAlign:'center',isResize:true},
          {field: 'func', title: '操作', width: 120, titleAlign: 'center',columnAlign:'center',componentName:'ordersfunc',isResize:true},
        ],
      }
    },
    components:{
      'dialog-bar': dialogBar,
    },
    mounted:function () {
      this.showProductOrders();
      //购物车或者商品详情页面跳转的时候传一个flag 不为空的时候 ordershow=true
      //为空则跳转到个人中心的商品订单详情
    },
    methods:{
      //关闭弹窗
      closethis:function () {
        this.showdia=false;
      },
      //打开弹窗
      openDialog(num){
        this.ordernum=num;
        this.showdia = true;
      },
      //查询商品订单
      showProductOrders:function () {
        let vm=this;
        this.axios({
          method: 'post',
          url: config.api.showproductorders,
        }).then(function (res) {
          if (res.data.status === 2) {
            alert("请登录！");
          } else {
            vm.pordersData=res.data.data;
          }
        }).catch(function (error) {
        })
      },
      orderCustomCompFuc:function (params) {
        let vm=this;
//        console.log(params);
        if (params.type === 'check'){
          vm.checkProOrder(params);
        }else if(params.type==='delete'){
          vm.deleteProOrder(params);
        }else if(params.type==='cancel'){
          vm.cancelProOrder(params);
        }
      },
      //查看订单详情
      checkProOrder:function (param) {
//        let vm =this;
//        let params = new URLSearchParams();
//        params.append('orderNo',vm.pordersData[param.index].orderNo);
//        this.axios.post(config.api.selectorderbyid, params).then((res) => {
//          console.log(res.data.data);
//          if (res.data.status === 1) {
//            console.log(res.data.msg);
//            alert("无法查看");
//          }else {
//            let odetail=res.data.data;
////            console.log(res.data);
////            this.showdia = true;
//            alert(odetail.orderId);
//            this.openDialog();
//          }
//        });
        this.openDialog(this.pordersData[param.index].orderNo);
        console.log(this.ordernum);
      },
      //删除一列订单
      deleteProOrder:function (param) {
        let vm =this;
        let params = new URLSearchParams();
        params.append('orderId',vm.pordersData[param.index].orderId);
        this.axios.post(config.api.delporder, params).then((res) => {
          console.log(res.data);
          if (res.data.status === 1) {
            alert(res.data.msg);
          }else {
            alert("删除成功!");
            vm.$delete(vm.pordersData,param.index);
          }
        })
      },
      //取消订单
      cancelProOrder:function (param) {
        let vm =this;
        let params = new URLSearchParams();
        params.append('orderId',vm.pordersData[param.index].orderId);
        this.axios.post(config.api.cancelporder, params).then((res) => {
          console.log(res.data);
          if (res.data.status === 1) {
            alert(res.data.msg);
          }else {
            alert("取消成功!");
            vm.showProductOrders();
          }
        })
      }
    },
  }
  // 自定义列组件
  Vue.component('ordersfunc',{
    template:`<span>
        <a href="" @click.stop.prevent="checkRow(rowData,index)">查看</a>
        <a href="" @click.stop.prevent="deleteRow(rowData,index)">删除</a>
        <a href="" @click.stop.prevent="cancelRow(rowData,index)">取消</a>
        </span>`,
    props:{
      rowData:{
        type:Object
      },
      field:{
        type:String
      },
      index:{
        type:Number
      },
    },
    methods:{
      checkRow(){
        // 参数根据业务场景随意构造
        let params = {type:'check',index:this.index};
        this.$emit('on-custom-comp',params);
        //触发自定义事件（方法在table部分绑定到事件上）
      },
      deleteRow(){
        // 参数根据业务场景随意构造
        let params = {type:'delete',index:this.index};
        this.$emit('on-custom-comp',params);
        //触发自定义事件（方法在table部分绑定到事件上）
      },
      cancelRow(){
        // 参数根据业务场景随意构造
        let params = {type:'cancel',index:this.index};
        this.$emit('on-custom-comp',params);
        //触发自定义事件（方法在table部分绑定到事件上）
      }
    }
  })
</script>
<style>
  /*表格样式*/
  .porder-table{
    margin: 10px 150px;
  }
</style>
