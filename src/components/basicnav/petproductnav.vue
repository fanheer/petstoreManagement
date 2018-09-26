<template>
  <div>
    <!--菜单导航-->

    <div class="getborder"></div>
    <!--商品总览-->
    <div class="product-show" v-show="haveproduct">
      <!--<div class="pro-item" v-for="(pro,index) in proList" :key="index"-->
      <div class="pro-item" v-for="(pro,index) in prolist" :key="index"
           v-if="index<=pageIndex*pageSize-1&&index>=(pageIndex-1)*pageSize">
        <!--后面要修改轮播区域 把v-for放在最外层div上-->
        <div class="item-imagerule">
          <img :src="imgUrl+pro.itemImage" @click="opennew1(index)">
          <!--<img :src="pro.itemImage" @click="opennew1(index)">-->
        </div>
        <div class="item-title-show">
          <div class="item-title">
            <span @click="opennew1(index)">{{pro.itemName}}</span>
          </div>
         <div class="money-show">
            <span>￥{{pro.itemPrice}}</span>
            <button @click="opennew1(index)">立即购买</button>
          </div>
        </div>
      </div>
      <!--分页-->
      <div class="page-show">
        <v-pagination
          @page-change="pageChange"
          :total="itemcounts"
          :showPagingCount="3"
          :paging-index="pageIndex"
          :layout="['total', 'prev','pager', 'next', 'jumper']"
          :page-size="pageSize">
        </v-pagination>
      </div>
    </div>

  </div>
</template>
<script>
  import config from '../../config/ipurl'
  export default {
    name:'petproductnav',
    data(){
      return{
        imgUrl:'',
        //分页
        pageIndex:1,//当前页面
        pageSize:12,//每页大小
        itemcounts:0,//商品总个数
        //导航
        //商品总览区
        prolist: [],
        searchmsg:'',//搜索条件
        searchtype:'',//类别搜索
        haveproduct:true, //是否显示商品列表
      }
    },
    mounted:function () {
      this.showallproduct();
      this.imgUrl=config.api.baseUrl;
    },
    methods:{
      pageSizeChange(newSize) {
        // TODO page size change
      },
      //分页
      pageChange:function(pageIndex){
        this.pageIndex = pageIndex;
//        this.getTableData();
        console.log(pageIndex)
      },
      //打开新的商品详情页面
      opennew1:function (index) {
        let proID=this.prolist[index].id;
        console.log("index:"+proID);
//        console.log(this.prolist[index].id);
        let routeData = this.$router.resolve({path:'/petstore/itemsdetail',query:{Qproid:proID}});
        window.open(routeData.href, '_blank');
      },
      //显示全部商品
      showallproduct:function () {
        let vm = this;
        this.axios({
          method: 'post',
          url: config.api.itemlist,
        }).then(function (response) {
          let resdata = new Object();
          if (response.data.status !== 0) {
            console.log("未登录，需要重新登陆");
            vm.$router.push({path: '/'})
          } else {
            resdata = response.data.data;
            //将信息显示在页面上
            vm.prolist=resdata;
            console.log(resdata);
            if(vm.prolist){
              vm.haveproduct=true;//如果商品列表不为空
              vm.itemcounts=resdata.length;
              console.log(itemcounts);
            }
          }
        }).catch(function (error) {
        })
      },
      //获取路由参数
      getParams:function() {
        // 取到路由带过来的参数
        let routerParams = this.$route.query.dataObj;
        // 将数据放在当前组件的数据内
        this.prolist = routerParams;
        this.itemcounts=this.$route.query.counts;
        console.log(this.prolist);
      },
    },
      watch:{
        // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
        '$route': 'getParams'
      },
  }
</script>
<style scope>

  /*分界线div*/
  .getborder{
    margin-top: 20px;
    border-top: 2px solid #d89e9e;
  }
  /*商品集*/
  .product-show{
    margin: 20px 100px;
    /*border: 1px solid #365cd8;*/
    width: auto;
    height: auto;
  }
  /*单个商品样式*/
  .pro-item{
    padding: 5px;
    width: 230px;
    height: 300px;
    margin: 20px;
    border: 1px solid #ffffff;
    text-align: center;
    display: inline-table ;
  }
  .pro-item:hover{
    border: 1px solid #c39e9e;;
  }
  /*商品图片规格*/
  .item-imagerule{
    margin-bottom: 2px;
  }
  .item-imagerule img{
    width: 220px;
    height: 300px;
    cursor: pointer;
  }
  /*商品标题*/
  .item-title span{
    color: #555555;
    font-size: 14px;
    font-weight: bolder;
    text-align: center;
    cursor: pointer;
  }
  .item-title span:hover{
    text-decoration: underline;
    cursor: pointer;
  }
  .money-show{
    margin-top: 20px;
  }
  .money-show span{
    color: #df3529;
    font-size: 20px;
    font-weight: bolder;
    float: left;
  }
  .money-show button{
    float: right;
    border-style: none;
    width: 100px;
    height: 28px;
    color: white;
    background-color: #cb383d;
  }

  /*导航样式*/
  .petnavshow{
    margin-left: 40px;
    /*margin-bottom: 10px;*/
    height: 24px;
  }
  .petnavshow ul li{
    float: left;
    display:block;/*这个比较关键，因为a本身就是联级元素，本身不具有宽高，用这个把它变成块级元素，这样前面设置的宽和高就能起作用了*/
    /*width:  100px;*/
    padding-left: 20px;
    padding-right: 20px;
    height: 24px;
    list-style-type: none;
    border-left: 1px solid;
    text-align:center;/*让文本居中*/
    /*margin-left: 10px;*/
  }
  /*分页*/
  .page-show{
    margin-top: 30px;
    text-align: center;
  }
</style>
