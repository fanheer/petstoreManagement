<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="cart-all">
    <div class="cart-content">
      <div class="carttitle">
        我的购物车：  {{itemNumInCart}}
      </div>
      <!--表格-->
      <div class="itemincart">
        <v-table
          is-horizontal-resize
          style="width:100%"
          row-height="110"
          row-hover-color="#eee"
          row-click-color="#edf7ff"
          error-content="购物车里空空如也，赶紧去逛逛吧~"
          :columns="cartcolumns"
          :table-data="cartData"
          :select-all="selectALL"
          :select-change="selectChange"
          :cell-edit-done="cellEditDone"
          @on-custom-comp="cartCustomCompFuc">
        </v-table>
      </div>
      <div class="carttail">
        <div class="delete-select" @click="delchecked"><a>删除选中商品</a></div>
        <div><button @click="buyincart">去结算</button></div>
        <div class="carttail-text">已选商品<a1>{{itemNumInCart}}</a1>件，总价：<a1>{{itemPriceInCart}}元</a1></div>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import config from '../../config/ipurl'
  export default {
    name:'cartindex',
    data:function () {
      return{
        imgUrl:'',
        itemNumInCart:0,//购物车内物品数量
        itemPriceInCart:0,//购物车内物品总价
        cartitemId:'',//选中的商品id
        //表格
//        cartData:[],
        cartData:[],
        cartcolumns:[
          {width: 20, titleAlign: 'center',columnAlign:'center',type: 'selection',isResize:true},
          {field: 'itemImage', title: '商品图片', width: 100, titleAlign: 'center',columnAlign:'center',componentName:'cartpic',isResize:true},
          {field: 'itemName', title:'商品信息', width: 400, titleAlign: 'center',columnAlign:'center',isResize:true},
          {field: 'itemPrice', title: '单价(元)', width: 70, titleAlign: 'center',columnAlign:'center',isResize:true},
          {field: 'quantity', title: '数量', width: 70, titleAlign: 'center',columnAlign:'center',isEdit:true,isResize:true},
          {field: 'itemTotalPrice', title: '金额(元)', width: 70, titleAlign: 'center',columnAlign:'center',isResize:true},
          {field: 'delfunc', title: '操作', width: 70, titleAlign: 'center',columnAlign:'center',componentName:'deletecart',isResize:true},
        ],
      }
    },
    mounted:function () {
      this.imgUrl=config.api.baseUrl;
      this.showAllInCart();
    },
    methods:{
//      查询购物车的全部数据
      showAllInCart:function () {
        let vm=this;
        vm.axios({
          method: 'post',
          url: config.api.showcartdata,
        }).then(function (res) {
          console.log(res.data.data);
          console.log(res.data.status);
          let resdata = new Object();
          if (res.data.status === 2) {
//            console.log(res.data.msg);
            alert("请登录！");
          } else {
//            vm.itemPriceInCart=res.data.data.cartTotalPrice;//购物车总价
            vm.cartData=res.data.data.cartItemVoList;
            for(let i=0;i<vm.cartData.length;i++){
              vm.cartData[i].itemImage=vm.imgUrl+vm.cartData[i].itemImage;//图片地址处理
            }
            vm.itemPriceInCart=0;
            vm.itemNumInCart=0;
          }
        }).catch(function (error) {
        })
      },
//      删除购物车里的一条/或几条数据
      deleteCartItem:function (param) {
        let vm=this;
        let params = new URLSearchParams();
        console.log("index id:"+param);
        params.append('itemIds',param);
        vm.axios.post(config.api.deleteitemincart,params).then((res)=>{
          console.log(res);
          console.log(res.data);
          if(res.status===2){
            console.log(res.msg);
          }else{
            vm.showAllInCart();
          }
        });
      },
//      on-custom-comp	自定义列为组件时，子组件与父组件通讯的方法
//      回调参数params （参数为任意类型，根据业务场景随意构造，由自定义组件设置）
      cartCustomCompFuc:function (params) {
        let vm=this;
//        console.log(params);
        if (params.type === 'delete'){
          let result = confirm('请确认是否删除！');
          if(result){
            let pid=vm.cartData[params.index].itemId;
            vm.deleteCartItem(pid);
            alert("删除成功");
          }else{
            alert("祝您购物愉快！")
          }
        }else if(params.type==='minus'){

        }else if(params.type==='plus'){

        }
      },
//      删除选中
      delchecked:function () {
        let vm=this;
        if (vm.cartitemId){
          let result = confirm('请确认是否删除！');
          if(result){
            vm.deleteCartItem(vm.cartitemId);
            alert("删除成功")
          }else{
            alert("祝您购物愉快~")
          }
        }else{
          alert("请选择您要操作的商品");
        }
      },

//      多选操作
//    全选后触发，回调参数为 selection，已选项。
      selectALL(selection){
        let vm=this;
        let selength=selection.length;
        let idstring='';
        let num=0;
        let amount=0;
        for(;num<selength;num++){
          idstring=idstring+selection[num].itemId+',';
          amount=amount+selection[num].itemPrice*selection[num].quantity;

          let params = new URLSearchParams();
          params.append('itemId',selection[num].itemId);
          vm.axios.post(config.api.selectsingleincart,params).then((res)=>{
            console.log(res.data);
            if(res.status===0){
              console.log(res.msg);
            }else{
            }
          });
        }
        this.cartitemId=idstring;
        this.itemNumInCart=selength;
        this.itemPriceInCart=amount;
      },
//    select-change回调函数，选中某一项触发，
//    回调参数为 selection 和 rowData，分别为已选项和刚选择的项
      selectChange(selection,rowData){
        let vm=this;
//      批量删除id数组
        let selength=selection.length;
        let idstring='';
        let num=0;
        let amount=0;
        for(;num<selength;num++){
          idstring=idstring+selection[num].itemId+',';
          amount=amount+selection[num].itemPrice*selection[num].quantity;
        }
        this.cartitemId=idstring;
        this.itemNumInCart=selength;
        this.itemPriceInCart=amount;

        let params = new URLSearchParams();
        params.append('itemId',rowData.itemId);
        vm.axios.post(config.api.selectsingleincart,params).then((res)=>{
          console.log(res.data);
          if(res.status===0){
            console.log(res.msg);
          }else{
          }
        });
//        console.log('select-change selection',selection);
//        console.log('select-change rowData',rowData)
      },
      //      下订单
      buyincart:function () {
        let vm=this;
        this.axios({
          method: 'post',
          url: config.api.setorder,
        }).then(function (res) {
          console.log(res.data);
          console.log("res.data.status:"+res.data.status);
          if (res.data.status === 2) {
//            console.log(res.data.msg);
            alert("请登录！");
          } else if (res.data.status === 0){
            let orderlist=res.data.data.orderDetailVoList;//订单内容
            console.log("111");
            console.log(orderlist);
            let orderAmount=res.data.data.orderAmount;//总金额
//            处理图片链接
            for(let i=0;i<orderlist.length;i++){
              orderlist[i].oiImage=vm.imgUrl+orderlist[i].oiImage;
            }
            if(orderlist){
              //如果商品列表不为空
              vm.$router.push({
                path: '/petstore/orderdetail',
                query: {
                  orderlistdata: orderlist,
                  ordermoneydata:orderAmount
                }
              });
            }
          }
        }).catch(function (error) {
        })
      },
      // 单元格编辑回调
      cellEditDone(newValue,oldValue,rowIndex,rowData,field){
//        this.tableData[rowIndex][field] = newValue;
        // 接下来处理你的业务逻辑，数据持久化等...
        let itemid=this.cartData[rowIndex].itemId;
        console.log("this.cartData[rowIndex].itemid"+this.cartData[rowIndex].itemId);
        let vm = this;
        let params = new URLSearchParams();
        params.append('itemId',itemid);
        params.append('count', newValue);
        this.axios.post(config.api.alternumincart, params).then((res) => {
          console.log(res.data);
          console.log(typeof res.data);
          if (res.data.status !== 0) {
            console.log(res.data.msg);
          } else {
            vm.showAllInCart();
          }
        })
      },

    },
  }
  // 自定义列组件cartpic
  Vue.component('cartpic',{
    template:`<span>
        <img :src="rowData.itemImage" style="height: 100px;width: 90px">
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
  }),
  Vue.component('deletecart',{
    template:`<span>
        <a href="" @click.stop.prevent="deleteRow(rowData,index)">删除</a>
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
      deleteRow(){
        // 参数根据业务场景随意构造
        let params = {type:'delete',index:this.index};
        this.$emit('on-custom-comp',params);
        //触发自定义事件（方法在table部分绑定到事件上）
      }
    }
  })
</script>
<style scope>
  /*.alternum{*/
    /*display: inline-flex;*/
  /*}*/
  /*.alternum input{*/
    /*border:1px solid #8c8c8c;*/
    /*text-align: center;*/
    /*width: 50px;*/
    /*height: 35px;*/
    /*margin-left: -2px;*/
    /*font-size: 20px;*/
  /*}*/
  /*.alternum button{*/
    /*background-color:white;*/
    /*border:1px solid #8c8c8c;*/
    /*line-height:20px;*/
    /*width: 30px;*/
    /*height: 35px;*/
    /*margin-left: -1px;*/
    /*font-size: 20px;*/
  /*}*/

  a1{
    font-size: 20px;
    color: #d89c96;
  }
  .cart-all{
    /*border: 2px solid;*/
    /*height:510px;*/
    padding-top: 20px;
}
  .cart-content{
    /*border: 1px solid;*/
    background-color: #ffffe0;
    margin:0 120px;
    /*width: 100%;*/
    height: 500px;
  }
  .carttitle{
    height: 45px;
    background-color: #fbffb8;
    padding: 10px;
  }
  .itemincart{
    margin-top: 40px;
    /*height: 400px;*/
  }
  .carttail{
    position: relative;
    margin-top: 80px;
    height: 60px;
    background-color: #fbffb8;
    /*display: block;*/
    /*padding: 10px;*/
  }
  .select-all{
    float: left;
    margin: 15px 20px;
  }
  .delete-select{
    /*position: relative;*/
    float: left;
    margin: 18px 20px;
    cursor:pointer;
  }
  .carttail-text{
    margin: 18px 20px;
    color: #8c8c8c;
    position: relative;
    float: right;
  }
  .carttail button{
    position: relative;
    float: right;/*右浮动*/
    height: 60px;
    width: 120px;
    border: none;
    font-size: 20px;
    color: white;
    background-color: #d88088;
  }
  .carttail button:hover{
    background-color: #d89c96;
    color: #fbffff;
  }
</style>
