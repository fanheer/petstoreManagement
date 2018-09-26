<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="allmessshow">
    <div class="mess-title">
      <a @click="showaddressmsg">查看收货地址</a>
      <a @click="showaddmsg">添加收货地址</a>
      <a @click="showpersonmsg">个人信息</a>
    </div>
    <div class="mess-main">
      <!--个人信息-->
      <div class="mess-box" v-show="messflag">
        <ul>
          <li>
            <span class="glyphicon glyphicon-info-sign"></span>用户编号：{{UID}}
          </li>
          <li>
            <span class="glyphicon glyphicon-user"></span>账号：{{Newname}}
          </li>
          <li>
            <span class="glyphicon glyphicon-envelope"></span>邮箱：{{Newemail}}
          </li>
          <li>
            <span class="glyphicon glyphicon-earphone"></span>手机号：{{Newphone}}
          </li>
        </ul>

      </div>
      <!--收货地址-->
      <div v-show="addressflag">
        <v-table
          is-horizontal-resize
          style="width:100%;font-size:16px"
          :width="882"
          :columns="columns"
          :table-data="tableData"
          row-hover-color="#eee"
          row-click-color="#edf7ff"
          @on-custom-comp="customCompFunc">
        </v-table>

      </div>
      <!--添加收货地址-->
      <div v-show="addflag">
        <add-site></add-site>
      </div>
    </div>
  </div>


</template>
<script>
  import cookie from '../../assets/js/cookie'
  import Vue from 'vue'
  import addSite from '../../components/user-center/addsite.vue'
  import config from '../../config/ipurl'
  export default {
    name: 'usermess',
    data() {
      return {
//      页面跳转
        messflag:false,
        addressflag:true,
        addflag:false,
//      文本框中的数据修改存放
        thenewname: '',
        thenewphone: '',
        thenewemail: '',
//      显示数据
        Newname: '',
        Newphone: '',
        Newemail: '',
        UID: '',
//      收货地址表
        tableData: [],
        columns: [
          {
            field: 'custome', title:'序号', width: 5, titleAlign: 'center', columnAlign: 'center',
            formatter: function (rowData,rowIndex) {
              return  rowIndex + 1
            }, isFrozen: true,isResize:true
          },
            {field: 'adName', title:'姓名', width: 40, titleAlign: 'center',columnAlign:'center',isResize:true},
            {field: 'adPhone', title: '手机号码', width: 80, titleAlign: 'center',columnAlign:'center',isResize:true},
            {field: 'adZip', title: '邮编', width: 40, titleAlign: 'center',columnAlign:'center',isResize:true},
            {field: 'address', title: '地址', width: 400, titleAlign: 'center',columnAlign:'center',isResize:true},
            {field: 'custome-adv', title: '操作',width: 80, titleAlign: 'center',columnAlign:'center',componentName:'table-operation',isResize:true}
          ],
      }
    },
    components:{
      addSite,
    },
    mounted: function () {
      let loginuser=cookie.getUserName();
      if(loginuser===0){
        //没有登录
//        this.$router.push('/');
      }else{
        //已登录
        this.getUsermess();
        this.getUserAddress();
      }
    },
    methods: {
      //跳转到显示个人资料模块
      showpersonmsg:function () {
        this.messflag=true;
        this.addressflag=false;
        this.addflag=false;
        this.getUsermess();
      },
      //跳转到显示收货地址模块
      showaddressmsg:function () {
        this.addressflag=true;
        this.messflag=false;
        this.addflag=false;
        this.getUserAddress();
      },
      //跳转到添加收货地址模块
      showaddmsg:function () {
        this.addressflag=false;
        this.messflag=false;
        this.addflag=true;
      },
      //得到后台的数据 打印到页面上

      //将文本框中的内容打印到页面上 并提交到后台
      alterNewname: function () {
        this.Newname = this.thenewname;
        return this.Newname
      },
      alterNewphone: function () {
        this.Newphone = this.thenewphone;
        return this.Newname
      },
      alterNewemail: function () {
        this.Newemail = this.thenewemail;
        return this.Newname
      },
      //修改个人信息
      alterUsermess: function () {

      },
      //显示个人信息
      getUsermess: function () {
        let vm = this;
        this.axios({
          method: 'post',
          url: config.api.get_information,
        }).then(function (response) {
          if (response.data.status === 10) {
            console.log("未登录，需要重新登陆");
            vm.$router.push({path: '/'});
          } else {
            let resdata = response.data.data;
            //将信息显示在页面上
            vm.UID = resdata.id;
            vm.Newname = resdata.uName;
            vm.Newphone = resdata.uPhone;
            vm.Newemail = resdata.uEmail
          }
        }).catch(function (error) {
        })
      },
      //显示收货地址
      getUserAddress:function(){
        let vm = this;
        this.axios({
          method: 'post',
          url: config.api.select,
        }).then(function (res) {
          console.log(res.data.data);
          if (res.data.status === 1) {
            console.log(res.data.msg);
            alert("无法查到地址");
          } else {
            vm.tableData=res.data.data;
            vm.itemnum=res.data.data.length;
            console.log("显示收货地址");
          }
        }).catch(function (error) {
        })
      },
      //删除和编辑收获地址操作
      customCompFunc(params){
        let vm=this;
        console.log(params);
        if (params.type === 'delete'){
          this.deleteItem(params);
        }else if (params.type === 'edit'){
          // do edit operation
          alert(`行号：${params.index} 姓名：${params.rowData['adName']}`)
        }
      },
      //删除一列
      deleteItem:function (param) {
        let vm =this;
        let params = new URLSearchParams();
        params.append('addressId',vm.tableData[param.index].id);
        this.axios.post(config.api.del, params).then((res) => {
          console.log(res.data);
          console.log(typeof res.data);
          console.log(res.data.status);
          if (res.data.status === 1) {
            console.log(res.data.msg);
            alert("删除地址失败");
          }else {
            alert("删除地址成功!");
            this.$delete(this.tableData,param.index);
          }
        })
      },
    }
  }
  // 自定义列组件
  Vue.component('table-operation',{
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
      update(){
        // 参数根据业务场景随意构造
        let params = {type:'edit',index:this.index,rowData:this.rowData};
        this.$emit('on-custom-comp',params);
      },
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
  .allmessshow{
    margin: 0 10px;
    /*border: 1px solid;*/
  }
  /*标题*/
  .mess-title{
    margin-top: 10px;
    margin-left: 50px;
    font-size: 16px;
  }
  .mess-title a{
    cursor: pointer;
    border: 1px solid;
    display: inline-table;
    width: 120px;
    height: 30px;
    line-height:30px;
    text-align:center;
    color: white;
    background-color: #d7c450;
  }
  /*主要内容*/
  .mess-main{
    border: 1px solid #d7c450;
    margin: 0 50px ;
    padding: 10px;
    font-size: 16px;
    color: #676520;
  }
  /*个人信息*/
  .mess-box {
    margin-top: 10px;
    text-align: left;
    /*border-color: #2b542c;*/
    /*border-style: ridge;*/
  }
  .mess-box ul {
    list-style: none;
  }
  .mess-box li {
    /*margin-bottom: 10px;*/
    margin: 20px 10%;
    padding-left: 30px;
    height: 100px;
    line-height: 100px;
    font-size: 18px;
    color: #676520;
    background-color: #f2f9cd;
  }
  .mess-box span{
    font-size: 30px;
    line-height: 100px;
    margin-right: 5px;
  }
  /*分页div*/
  .page-box{
    margin-top: 100px;
    text-align: center;
  }
</style>
