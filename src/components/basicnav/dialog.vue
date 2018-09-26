<template>
  <div class="servicedetail-all">
    <div class="dialog-wrap">
      <div class="dialog-cover" v-show="showdialog" @click="closeMe"></div>
      <transition name="drop">
        <div class="dialog-content" v-show="showdialog" >
          <p class="dialog-close" @click="closeMe">x</p>
          <div class="order-detail">
            <ul>
              <li>
                订单编号：{{orderdetail.orderNo}}
              </li>
              <li>
                总金额：{{orderdetail.orderAmount}}
              </li>
              <li>
                订单状态：{{orderdetail.statusDesc}}
              </li>
              <li>
                订单创建时间：{{orderdetail.createTime}}
              </li>
              <li>
                收货人姓名：{{orderdetail.addressVo.adName}}
              </li>
              <li>
                收货人电话：{{orderdetail.addressVo.adPhone}}
              </li>
              <li>
                收货地址：{{orderdetail.addressVo.adProvince}}{{orderdetail.addressVo.adCity}}{{orderdetail.addressVo.adDistrict}}{{orderdetail.addressVo.adDetail}}
              </li>
            </ul>
          </div>
          <div>
            <v-table
              style="width:100%;"
              row-hover-color="#eee"
              row-click-color="#edf7ff"
              :columns="orderitemColumns"
              :table-data="orderitem"
              is-horizontal-resize>
            </v-table>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
  import config from '../../config/ipurl'
  export default {
    data:function(){
      return{
//        订单详情
        orderdetail:[],
//        订单内容
        orderitem:[],
        orderitemColumns:[
          {field: 'oiName', title:'商品名称', width: 400, titleAlign: 'center',columnAlign:'center',isResize:true},
          {field: 'oiCprice', title: '商品单价', width: 15, titleAlign: 'center',columnAlign:'center',isResize:true},
          {field: 'oiQuantity', title:'商品数量', width: 10, titleAlign: 'center',columnAlign:'center',isResize:true},
          {field: 'oiTprice', title: '商品总价', width: 15, titleAlign: 'center',columnAlign:'center',isResize:true},
         ],
      }
    },
    props: {
      showdialog: {
        type: Boolean,
        default: false
      },
      sendordernum:{
        type: Number,
      }
    },
    mounted:function () {
//      console.log(this.sendordernum);
//      this.showSingleOrder(this.sendordernum);
      console.log('mounted')
      this.showSingleOrder();
    },
    watch: {
      sendordernum: function(newVal) {
        this.showSingleOrder();
      }
    },
    methods:{
      //关闭对话框
      closeMe: function () {
        this.$emit('closedetail', false);
      },
      //查看订单
      showSingleOrder:function () {
        let vm =this;
        let params = new URLSearchParams();
        console.log(vm.sendordernum);
        params.append('orderNo',vm.sendordernum);
        this.axios.post(config.api.selectorderbyid, params).then((res) => {
          if (res.data.status !== 0) {
            console.log(res.data.msg);
//            alert("无法查看");
          }else {
            vm.orderdetail=res.data.data;
            vm.orderitem=res.data.data.orderDetailVoList;
//            console.log(res.data);
//            this.showdia = true;
          }
        });
      },
    }
  }
</script>
<style>
  .drop-enter-active {
    transition: all .5s ease;
  }
  .drop-leave-active {
    transition: all .8s ease;
  }
  .drop-enter {
    transform: translateY(500px);
  }
  .drop-leave-active {
    transform: translateY(-1000px);
  }

  .dialog-wrap {
    position: fixed;
    width: 100%;
    height: 100%;
  }
  .dialog-cover {
    background: #000;
    opacity: .3;
    position: fixed;
    z-index: 5;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  /*模态框-全部内容*/
  .dialog-content {
    width: 50%;
    position: fixed;
    height: 400px;
    /*max-height: 50%;*/
    overflow: auto;
    background: #eff2f5;
    top: 20%;
    left: 50%;
    margin-left: -25%;
    z-index: 10;
    border: 2px solid #a6b4c4;
    padding: 1%;
    line-height: 1.6;
  }
  .dialog-close {
    position: absolute;
    right: 5px;
    top: 5px;
    font-size: 20px;
    width: 40px;
    height: 40px;
    color: #2a2a29;
    text-align: center;
    cursor: pointer;
  }
  .dialog-close:hover {
    color: #15791b;
  }
</style>
