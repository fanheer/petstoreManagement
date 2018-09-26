<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="add-address-box">
    <!--添加收货地址-->
    <input type="text" v-model="adName" placeholder="请输入收货人">
    <input type="text" v-model="adPhone" placeholder="请输入收货人电话">
    <input type="text" v-model="adZip" placeholder="请输入收货邮编">
    <v-distpicker class="selectArea" @selected="onSelected" :province="select.province" :city="select.city" :area="select.area" :placeholders="placeholders" id="address" ></v-distpicker>
    <input type="text" v-model="adDetail" placeholder="请输入收货详细地址">
    <button v-on:click="addItem()">确认添加</button>
    <!--<button v-on:click="backtoUsermess()">返回</button>-->

  </div>
</template>
<script>
  import config from '../../config/ipurl'
  import VDistpicker from 'v-distpicker'
  export default {
    name:"addsite",
    data(){
      return{
        //        添加新的收获地址
        adName:"",
        adPhone:"",
        adProvince:"",
        adCity:"",
        adDistrict:"",
        adDetail:"",
        adZip:"",
        //省市区三级联动
        placeholders: {
          province: '请选择所在省份',
          city: '请选择所在城市',
          area:'请选择所在区',
        },
        select: {
          province: '',
          city: '',
          area:'',
        },
      }
    },
    components: {
      VDistpicker
    },
    methods:{
      //返回个人信息页面
      backtoUsermess:function () {
        this.$router.push({path: '/usercenter/usermess'})
      },
      //添加一条收货地址
      addItem:function () {
        let vm=this;
        let params = new URLSearchParams();
        params.append('adName',this.adName);
        params.append('adPhone',this.adPhone);
        params.append('adProvince',this.adProvince);
        params.append('adCity',this.adCity);
        params.append('adDistrict',this.adDistrict);
        params.append('adDetail',this.adDetail);
        params.append('adZip',this.adZip);
        vm.axios.post(config.api.addaddress, params).then((res) => {
          if (res.data.status === 1) {
            console.log(res.data.msg);
            alert("添加地址失败");
          }else {
            console.log(res.data.msg);
            alert("添加成功！");
            vm.adName="";
            vm.adPhone="";
            vm.adProvince="";
            vm.adCity="";
            vm.adDistrict="";
            vm.adDetail="";
            vm.adZip="";
            vm.setDistpicker();
          }
        })
      },
      // 城市选择赋值
      onSelected: function (data) {
        this.adProvince=data.province.value;
        this.adCity=data.city.value;
        this.adDistrict=data.area.value;
//        console.log("this.adProvince"+this.adProvince+"this.adCity"+this.adCity+"this.adDistrict"+this.adDistrict);
      },
      setDistpicker:function () {
        this.select.province="请选择所在省份";
        this.select.city="请选择所在城市";
        this.select.area="请选择所在区";
      },
    }
  }
</script>
<style scope>
  /*添加收货地址模块*/
  .add-address-box{
    margin-top: 20px;
    text-align: center;
    /*flex: 0 0 50%;*/
  }
  .add-address-box input{
    display:block;
    width:490px;
    height:40px;
    line-height:40px;
    margin:10px auto;
    font-size: 16px;
    /*margin-bottom: 10px;*/
    /*outline:none;*/
    border:1px solid #cbbb3f;
    border-radius: 5px;
    padding:10px;
    /*box-sizing:border-box;*/
  }
  .add-address-box button{
    /*display:block;*/
    width:490px;
    height:40px;
    line-height: 40px;
    border:none;
    background-color: #cbbb3f;
    color:#fff;
    font-size:16px;
    margin-bottom:20px;
    border-radius: 5px;
  }
  #address{
    margin-top: 10px;
  }
  #address select{
    border-color: #cbbc27;
  }
  .selectArea select{
    width: 160px;
    height:40px;
    font-size: 16px;
    color: #7a7a7a;
    border-radius: 5px;
  }
</style>
