<template>
  <div class="itemdetailall">
   <!--商品图片+购买选择区域-->
    <div class="pic-buy-area">
      <div class="picture-area">
        <div class="main-pic">
          <!--主图部分 由子图中选择焦点图-->
          <ul>
            <li v-show="pic1">
              <img :src="imgUrl+pic1data">
            </li>
            <li v-show="pic2">
              <img :src="imgUrl+pic2data">
            </li>
            <li v-show="pic3">
              <img :src="imgUrl+pic3data">
            </li>
          </ul>
        </div>
        <div class="all-pic">
          <ul>
            <li>
              <a @click="pic1click()" @onblur="pic1click">
                <img :src="imgUrl+pic1data">
              </a>
            </li>
            <li>
              <a @click="pic2click()">
                <img :src="imgUrl+pic2data">
              </a>
            </li>
            <li>
              <a @click="pic3click()">
                <img :src="imgUrl+pic3data">
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="buy-area">
        <!--关键词标题栏价格模块-->
        <div class="intro-area">
          <div class="proTitle">
            <span>
              {{titledata}}
            </span>
          </div>
          <div class="prodetails">
            <div class="price-style"> 价格：<span>￥{{pricedata}}</span></div>
            <div class="discount-style">折后价：<span>￥{{discountdata}}</span></div>

          </div>
        </div>
        <!--数量修改模块-->
        <div class="num-style">
          数量：
          <span class="alternum">
            <button id="minusbtn" @click="minusnum"  >-</button>
            <input type="text" placeholder="0" v-model="numdata">
            <button id="plusbtn" @click="plusnum" >+</button>
          </span>
          库存量：<span>{{storenumdata}}</span> 件
        </div>
        <!--加购模块-->
        <div class="pick-area">
          <button id="buy" @click="buyItem">立即购买</button>
          <button id="add" @click="addIntoCart" class="glyphicon glyphicon-shopping-cart">加入购物车</button>
        </div>
      </div>
    </div>
    <!--商品图片详情部分-->
    <div class="prodetail-module">
      <span><img :src="imgUrl+prodetail"></span>
    </div>
  </div>
</template>
<script>
  import config from '../../config/ipurl'
  export default {
    name:'itemsdetail',
    data:function () {
      return{
        imgUrl:'',
        //显示图片的v-show
        pic1:true,
        pic2:false,
        pic3:false,
        //图片src
        pic1data:'',
        pic2data:'',
        pic3data:'',
        //页面展示信息
        titledata:'',//显示的标题
        pricedata:'',//显示的商品价格
        discountdata:'',//显示的折扣价
        numdata:1,//页面上的商品数量
        storenumdata:'',//页面上的显示库存量
        prodetail:'',//商品详情简介
        proId:null,
      }
    },
    mounted:function () {
//      console.log("this.$route.query.Qproid:"+this.$route.query.Qproid);
      this.proId=this.$route.query.Qproid;
      if(this.proId){
        console.log(this.proId+"id");
        this.showprodetail();
        this.imgUrl=config.api.baseUrl;
      }else{
//        this.$router.push('/petstore/productindex');
      }
    },
    methods:{
      //焦点图切换
      pic1click:function () {
        this.pic1=true;
        this.pic2=false;
        this.pic3=false;
      },
      pic2click:function () {
        this.pic2=true;
        this.pic1=false;
        this.pic3=false;
      },
      pic3click:function () {
        this.pic3=true;
        this.pic1=false;
        this.pic2=false;
      },

      //数量修改
      minusnum:function () {
        if(this.numdata>0)
          this.numdata-=1;
      },
      plusnum:function () {
        if(this.numdata<this.storenumdata)
          this.numdata+=1;
      },

      //显示商品信息
      showprodetail:function () {
        let vm = this;
        let params = new URLSearchParams();
        params.append('itemId', vm.proId);
        this.axios.post(config.api.itemsingle, params).then((res) => {
          console.log(res.data);
          console.log(typeof res.data);
          if (res.data.status === 1) {
            console.log(res.msg);
          } else {
            let resdata=res.data.data;
            vm.titledata=resdata.itemName;
            vm.pricedata=resdata.itemPrice;
            vm.discountdata=resdata.itemSale*resdata.itemPrice;
            vm.prodetail=resdata.itemDetail;
            vm.storenumdata=resdata.stock;
            let subscribe=resdata.itemSubscribe;
            let allpic=subscribe.split(',');
            vm.pic1data=resdata.itemImage;
            vm.pic2data=allpic[0];
            vm.pic3data=allpic[1];
          }
        })
      },
      //加入购物车
      addIntoCart:function () {
        let vm=this;
        let params = new URLSearchParams();
        params.append('itemId', vm.proId);
        params.append('count', vm.numdata);
        vm.axios.post(config.api.addintocart,params).then((res)=>{
          console.log(res);
          console.log(res.data);
          if(res.data.status===0){
//            console.log("chenggong")
            let result = confirm('是否跳转到购物车！');
            if(result){
              vm.$router.push('/petstore/cartindex');
            }else{
              //不跳转 留在本页面
            }
          }
          else{
            let result = confirm('未登录，是否需要登录？');
            if(result){
              vm.$router.push('/');
            }else{
              //不跳转 留在本页面
            }
          }
        })
      },
      //立即购买
      buyItem:function () {
        let vm=this;
        let params = new URLSearchParams();
        params.append('itemId', vm.proId);
        params.append('count', vm.numdata);
        vm.axios.post(config.api.singlebuy,params).then((res)=>{
          if(res.data.status!==0){
            alert(res.data.msg);
          }else{
            let orderitem=res.data.data.orderDetailVoList;//订单内容
            let orderAmount=res.data.data.orderAmount;//总金额
            orderitem[0].oiImage=vm.imgUrl+orderitem[0].oiImage;
            console.log(orderitem);
            if(orderitem){
              //如果商品列表不为空
              vm.$router.push({
                path: '/petstore/orderdetail',
                query: {
                  orderlistdata: orderitem,
                  ordermoneydata:orderAmount,
                  flag:1,
                  proId:vm.proId,
                  proNum:vm.numdata,
                }
              });
            }
          }
        })
      },
    },
  }
</script>
<style scope>
  .itemdetailall{
    /*border: 1px solid;*/
    margin: 0 2%;
  }
  /*图片+购买选项*/
  .pic-buy-area{
    padding: 50px 120px;    /*整体往内缩50px*/
    display: flex;
  }
  /*标题和加购区*/
  .buy-area{
    float: right;
    margin: 0 30px;
    width:  55%;
    height: 400px;
  }
  /*标题和介绍区域*/
  .intro-area{
    /*background-color: #0f0f0f;*/
    width: 100%;
    height: 300px;
    padding-top: 10px;
  }
  /*标题*/
 .proTitle{
   text-align: center;
   margin-top: 40px;
   font-size: 20px;
   height: 40px;
   width: inherit;

  }
 /*详情*/
 .prodetails{
   text-align: center;
   margin-top: 20px;
 }
 /*价格*/
  .price-style{
    font-size: 16px;
  }
 .price-style span{
   margin-left: 20px;
   text-decoration:line-through;
   font-size: 16px;
 }
  .discount-style{
    color: #cb383d;
    font-size: 16px;
  }
 .discount-style span{
   margin-left: 20px;
   color: #cb383d;
   font-weight: bold;
   font-size: 28px;
 }

 /*-+框及库存*/
  .num-style{
    text-align: center;
    height: 80px;
    padding: 20px 0 ;
  }
  .alternum{
    /*margin: 0;*/
    display: inline-flex;
  }
  .alternum input{
    border:1px solid #d89c96;
    color: #555555;
    text-align: center;
    width: 50px;
    height: 35px;
    margin-left: -2px;
    font-size: 20px;
  }
  .alternum button{
    background-color:white;
    border:1px solid #d89c96;
    line-height:20px;
    width: 30px;
    height: 35px;
    margin-left: -1px;
    font-size: 20px;
  }
  /*加购区域*/
  .pick-area{
    width: 100%;
    height: 120px;
    text-align: center;
    margin-top: 20px;
  }
  #buy{
    margin-left: 20px;
    width: 200px;
    height: 50px;
    font-size: 18px;
    border: 1px solid;
    border-color: #aa2f33;
    color: #aa2f33;
    background-color: #fff0e9;
  }
  #buy:hover{
    border: 1px solid;
    border-color: #ffb1a0;
    background-color: #ffcbba;
  }
  #add{
    margin-left: 20px;
    width: 200px;
    height: 50px;
    font-size: 16px;
    border: none;
    background-color: #aa2f33;
    color: #ffffff;
  }
  .pick-area button:focus{
    outline: none;
  }



  /*图片：大图&全部的图*/
  .picture-area{
    margin: 0 20px;
  }
  .main-pic{
    /*border: 1px solid;*/
    width: 100%;
    height: 370px;
    margin-bottom: 10px;
  }
  .main-pic ul{
    list-style:none;
    padding: 0;
  }
  .main-pic ul li img{
    width: 330px;
    height: 370px;
  }
  .all-pic ul{
    list-style: none;
    padding: 0 5px;
    width: 325px;
    height: 120px;
    border: 1px solid;
  }
  .all-pic ul li{
    float:left;
  }
  .all-pic ul li a img{
    /*width: 120px;*/
    width:100px;
    margin: 0 1px;
    height: 116px;
    /*border-right: 1px solid;*/
    display:block;
    z-index: 20;
  }
  .all-pic ul li a img:hover{
    border: 2px solid;
    border-color: #ff8269;
    /*border-radius: 3px;*/
  }
  /*商品图片详情*/
  .prodetail-module{
    /*border: 1px solid;*/
    margin:30px 50px;
    /*background-color: #d88e8f;*/
    text-align: center;
  }
</style>
