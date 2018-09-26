<template>
  <div class="product-all">
    <div class="menubar">
      <select  @change="selectType">
        <option value="default">按类别查询</option>
        <option v-for="(ty,index) in tylist" :key="index" :value ="ty.id">
          {{ty.typeName}}
        </option>
      </select>
      <!--<select >-->
        <!--<option value="">按价格查询</option>-->
      <!--</select>-->
    </div>
    <!--<div class="recommendshow">-->
      <!--<div class="recommend-item">-->
        <!--<img src="">-->
        <!--<a @click="opennew()">立即抢购</a>-->
      <!--</div>-->
      <!--<div class="recommend-item">-->
        <!--<img src="">-->
        <!--<a @click="opennew()">立即抢购</a>-->
      <!--</div>-->
      <!--<div class="recommend-item">-->
        <!--<img src="">-->
        <!--<a @click="opennew()">立即抢购</a>-->
      <!--</div>-->
    <!--</div>-->
    <div class="searchshow">
      <button @click="searchifwhat()">搜索</button>
      <input placeholder="请输入您想搜索的商品" type="text" v-model="searchif"/>
    </div>
    <!--菜单导航 商品总览-->
    <div>
      <petproductnav></petproductnav>
    </div>

  </div>
</template>
<script>
  import petproductnav from '../basicnav/petproductnav.vue'
  import config from '../../config/ipurl'
  export default {
    name:'productindex',
    data:function () {
      return{
        searchif:'',//关键字搜索
        searchtype:'',//类别搜索
        searchlist:[
          { itemName: '',itemPrice:'',itemImage:''},
        ],
        tylist:[],//下拉列表
      }
    },
    mounted:function () {
      this.showType();
    },
    components:{
      petproductnav
    },
    methods:{
      //打开一个商品详情页面
      opennew:function () {
        window.open("/petstore/itemsdetail");
      },
      //展示所有类别
      showType:function () {
        let vm = this;
        this.axios({
          method: 'post',
          url: config.api.showproducttype,
        }).then(function (response) {
          if (response.data.status !== 0) {
            console.log(response.data.msg);
          } else {
            vm.tylist=response.data.data;
          }
        }).catch(function (error) {
        })
      },
      //搜索商品
      searchifwhat:function () {
        let vm = this;
        let params = new URLSearchParams();
        console.log("搜索条件："+vm.searchif);
        params.append('keyword', vm.searchif);
        this.axios.post(config.api.selectbyname, params).then((res) => {
          console.log(res.data);
          console.log(typeof res.data);
          if (res.data.status !== 0) {
            console.log("查询失败");
          } else {
            let resdata = res.data.data;
            //将信息显示在页面上
            vm.searchlist=resdata;
            if(vm.searchlist){
            //如果商品列表不为空
              vm.$router.push({
                path: '/petstore/productindex',
                query: {
                  dataObj: vm.searchlist,
                  counts: vm.searchlist.length
                }
              });
            }
          }
        });
      },
      //显示按种类查询的结果
      selectType:function(ele){
        //获取类别名称
        this.selected = ele.target.value;
        let typeid=this.selected;
        for(let i=0;i<this.tylist.length;i++){
          if(this.tylist[i].id.toString()===typeid) {
            this.searchtype=this.tylist[i].typeName;
          }
        }
        if(this.selected==="default"){
        }else{
          let vm = this;
          let params = new URLSearchParams();
          params.append('typeNmae', vm.searchtype);
          this.axios.post(config.api.selectbytype, params).then((res) => {
            console.log(res.data);
            if (res.data.status !== 0) {
              console.log("查询失败");
            } else {
              let resdata = res.data.data;
              //将信息显示在页面上
              vm.searchlist=resdata;
              if(vm.searchlist){
                //如果商品列表不为空
                vm.$router.push({
                  path: '/petstore/productindex',
                  query: {
                    dataObj: vm.searchlist,
                    counts: vm.searchlist.length
                  }
                });
              }
            }
          })
        }

      },
    }
  }
</script>
<style scope>
  /*菜单导航*/
  .menubar{
    margin: 10px 100px;
    padding-bottom: 30px;
  }
  .menubar select{
    width: 180px;
    margin-right: 20px;
    padding-left: 5px;
    height: 35px;
    line-height: 35px;
    font-size: 16px;
    border-radius: 4px;
    color: #c39e9e;
    border-color: #d88088;
  }
  .product-all{
    /*border-color: #f9ff95;*/
    /*border: 5px solid;*/
    /*margin: 0px;*/
    /*height: 1000px;*/
  }
  /*搜索框和按钮*/
  .searchshow{
    height: 50px;
    /*border-color: #c1350f;*/
    /*border: 1px solid;*/
    padding-top: 20px;
    margin-top: -90px;
    margin-right: 50px;
  }
  .searchshow input{
    float: right;
    display:block;
    width:200px;
    height:35px;
    line-height:35px;
    font-size: 14px;
    padding-left: 5px;
    margin-right: 3px;
    border-radius: 3px;
    border:1px solid #c39e9e;
  }
  .searchshow input:focus{
    background-color: #f6ffd1;
    border-color: #d89c96;
    outline: none;
  }
  .searchshow button{
    height: 35px;
    width: 70px;
    line-height:35px;
    font-size: 16px;
    color: #ffffe0;
    border-radius: 3px;
    border-style: none;
    background-color: #d88088;
    float: right;
  }
  .searchshow button:hover{
    background-color: #d89c96;
    color: #f2f9cd;
  }
  /*热门推荐展示区域*/
  .recommendshow{
    padding-left:100px;
    border-color: #c1350f;
    border: 1px solid;
    margin: 20px 120px;
    background: url("../../assets/productindex/recommend.png");
  }
  .recommendshow a{
    color: red;
    text-decoration: underline;
  }
  .recommend-item{
    margin-left: 30px;
    /*position:relative;*/
    /*left: 10px;*/
    display: inline-flex;
    margin-top: 25px;
    margin-bottom: 20px;
    background-color: white;
    height: 150px;
    width: 250px;
  }

</style>
