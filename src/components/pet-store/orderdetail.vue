<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="orderdetail-all">
    <div class="dialog-content">
      <div class="dialog-title"><b>选择收货地址</b></div>
      <div class="address">
        <div class="address-show" v-if="haveaddress">
          <div class="address-list" v-for="(ad,index) in adlist" :key="index" @click="selectAddress(index)">
            <div class="address-item">
              <div class="ad-name"><span>{{ad.adName}} 收</span></div>
              <div>
                <span>{{ad.adProvince}} {{ad.adCity}} {{ad.adDistrict}}</span>
                <br>
                <span>详细地址：{{ad.adDetail}}</span>
                <br>
                <span>手机：{{ad.adPhone}}</span>
              </div>
              <div class="checkimg" v-if="ad.checkadflag" >
                <img src="../../assets/check.png" >
              </div>
            </div>
          </div>
        </div>

      </div>
      <div class="dialog-title"><b>确认商品信息</b></div>
      <div>
        <v-table
          is-horizontal-resize
          style="width:100%;"
          :row-height="70"
          :columns="orderColumns"
          error-content="是不是加载出问题啦，订单中没有任何商品哦！"
          :table-data="orderData">
        </v-table>
      </div>
      <div class="dialog-main">
        <div>
          商品应付总计：<span>{{itemTotalPrice}}</span>元
        </div>
        <div>
          <button @click="ensurebuy">确认提交</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import cookie from '../../assets/js/cookie'
  import config from '../../config/ipurl'
  import Vue from 'vue'
  export default {
    name:'orderdetail',
    data:function () {
      return{
        imgUrl:'',
//        checkadflag:false,//选中地址
        loginuser:'',//用户名
        loginId:'',//用户id
        addressID:'',//选中的收货地址
        itemPriceInOrder:null,
        itemTotalPrice:0,//总金额
        singleflag:'',//是否是单一商品
        singleId:'',//单一id
        singleNum:'',//单一数量
        //是否有收货地址
        haveaddress:false,
        //收货地址数组
        adlist:[],
        //订单表
        orderData:[],
        orderColumns:[
          {field: 'oiImage', title: '商品图片', width: 100, titleAlign: 'center',columnAlign:'center',componentName:'orderpic',isResize:true},
          {field: 'oiName', title:'商品信息', width: 600, titleAlign: 'left',columnAlign:'left',isResize:true},
          {field: 'oiCprice', title: '单价(元)', width: 90, titleAlign: 'center',columnAlign:'center',isResize:true},
          {field: 'oiQuantity', title: '数量', width: 50, titleAlign: 'center',columnAlign:'center',isResize:true},
          {field: 'oiTprice', title: '金额(元)', width: 90, titleAlign: 'center',columnAlign:'center',isResize:true},
          ],
      }
    },
    mounted:function () {
      this.loginuser=cookie.getUserName();
      this.loginId=cookie.getUserId();
      if(this.loginuser){
        this.getOrderUserAddress();
        this.orderData=this.$route.query.orderlistdata;//获取路由订单数据
        this.itemTotalPrice=this.$route.query.ordermoneydata;//获取路由总金额
        this.singleflag=this.$route.query.flag;//是否是单一商品
        this.singleId=this.$route.query.proId;
        this.singleNum=this.$route.query.proNum;
        this.imgUrl=config.api.baseUrl;
      }else{
        let result = confirm('没有订单信息，是否跳转到购物车');
        if(result){
          this.$router.push('/petstore/cartindex');
        }else {
          //不跳转 留在本页面
        }
      }
    },
    methods:{
      //显示收货地址
      getOrderUserAddress:function(){
        let vm = this;
        this.axios({
          method: 'post',
          url: config.api.select,
        }).then(function (res) {
          console.log(res.data.data);
          console.log(res.data.status);
          let resdata = new Object();
          if (res.data.status === 1) {
            console.log(res.data.msg);
            alert("无法查到地址");
          } else {
            vm.adlist=res.data.data;
            vm.haveaddress = true;
            for(let i=0;i<vm.adlist.length;i++){
              vm.adlist[i].checkadflag=false;
              console.log(vm.adlist[i].checkadflag);
            }//这里是获取收获地址的时候 给这个flag赋初值
            console.log("显示收货地址");
          }
        }).catch(function (error) {
        })
      },
      //选择收货地址
      selectAddress:function (index) {
        this.addressID=this.adlist[index].id;
        console.log("addressID:"+this.addressID);
        for(let i=0;i<this.adlist.length;i++){
          const ad = Object.assign({}, this.adlist[i]); // 数组赋值不能响应
          ad.checkadflag = false;
          this.$set(this.adlist, i, ad);
        }//这里是全部置为不显示
        const ad = Object.assign({}, this.adlist[index]);
        ad.checkadflag = true;
        this.$set(this.adlist, index, ad)
//        this.adlist[index].checkadflag=true;//这里就是显示那个点击的 index
      },
      //下订单
      ensurebuy:function () {
        let vm=this;
        if(vm.singleflag===1){
          //不为空 则调用单一商品生成订单接口
          let params = new URLSearchParams();
          params.append('itemId',vm.singleId);
          params.append('count',vm.singleNum);
          params.append('addressId',vm.addressID);
          vm.axios.post(config.api.finishsinglebuy,params).then((res)=>{
            console.log(res);
            console.log(res.data);
            if(res.data.status===0){
              console.log(res.msg);
              alert("下单成功，即将跳转至订单页面！");
              vm.$router.push('/usercenter/userorder');
            }else{
            }
          });
        }else{
          //购物车商品生成订单
          let params = new URLSearchParams();
          console.log("addressId2:"+vm.addressID);
          params.append('addressId',vm.addressID);
          vm.axios.post(config.api.finishorder,params).then((res)=>{
            console.log(res);
            console.log(res.data);
            if(res.data.status===0){
              console.log(res.msg);
              alert("下单成功！");
              vm.$router.push('/usercenter/userorder');
            }else{
            }
          });
        }
      }
    },
  }
  // 自定义列组件cartpic
  Vue.component('orderpic',{
    template:`<span>
        <img :src="rowData.oiImage" style="height: 50px;width: 50px">
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
  })
</script>
<style scope>
  .orderdetail-all{

  }
  .dialog-content {
    margin: 0 10%;
    width: 80%;
    height: 800px;
    /*max-height: 50%;*/
    left: 50%;
    z-index: 10;
    padding: 3% 0;
    line-height: 1.6;
  }
  .dialog-title{
    text-align: left;
    font-size: 18px;
    font-family: 等线;
    color: #2a2a29;
    margin-right: 3%;
    margin-top: 50px;
    margin-bottom: 15px;
    padding-bottom: 5px;
    border-bottom: 1px solid #a6b4c4;
  }
  .address-show{
    /*border: 1px solid;*/
    width: auto;
    height: auto;
  }
  .address-list{
    width: 31%;
    height: 180px;
    margin-right:2%;
    /*text-align: center;*/
    display: inline-table;
    border:1px solid #d2d5e6;
    cursor:pointer;
  }
  .address-list:hover{
    background-color: #eff2f5;
  }
  .ad-name{
    margin: 10px ;
    border-bottom: 1px solid #d2d5e6;
  }
  .dialog-main{
    position: relative;
    float: right;
    margin-top: 20px;
  }
  .dialog-main span{
    font-size: 20px;
    color: #d88088;
  }
  .dialog-main button{
    margin: 20px;
    height: 50px;
    width: 120px;
    border: none;
    font-size: 20px;
    color: white;
    background-color: #d88088;
  }
  .dialog-main button:hover{
    background-color: #d89c96;
    color: #fbffff;
  }
  .v-table-class td{
    border: 0px;
  }
  .checkimg{
    float: right;
    margin-right: 5px;
  }
  .checkimg img{
    width: 45px;
    height: 40px;
  }

</style>
