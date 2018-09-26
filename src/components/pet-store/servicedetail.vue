<template>
  <div class="servicedetail-all">
    <div class="dialog-wrap">
      <div class="dialog-cover" v-show="showAlertModal" @click="closeMyself"></div>
      <transition name="drop">
        <div class="dialog-content" v-show="showAlertModal" >
          <p class="dialog-close" @click="closeMyself">x</p>
          <div class="dialog-title"> 预约申请</div>
          <div class="dialog-after" v-show="showafter">
            提交订单成功！
            <router-link to="/usercenter/userorder">查看所有订单</router-link>
          </div>
          <div class="dialog-before" v-show="showbefore">
            <div>
              选择服务：
              <select  @change="selectService">
                <option value="default">请选择一项服务</option>
                <option v-for="(ser,index) in serlist" :key="index" :value ="ser.id">
                  {{ser.seName}}
                </option>
              </select>
            </div>
            <div>联系姓名：<input type="text" v-model="orperson"></div>
            <div>联系电话：<input type="text" v-model="ortel"></div>
            <div>宠物品种：<input type="text" v-model="orpettype"></div>
            <Calendar
              class="Calendar-box"
              v-on:choseDay="clickDay"
              :agoDayHide="agoday">
            </Calendar>
            <div class="select-time-box">
              <hb>请选择预约的时间段：</hb>
              <input type="radio" name="selecttime" value="10" :disabled="isdisabled1" v-model="radiochoice" @change="selecttime">10:00
              <input type="radio" name="selecttime" value="12" :disabled="isdisabled2" v-model="radiochoice" @change="selecttime">12:00
              <br>
              <input type="radio" name="selecttime" value="14" :disabled="isdisabled3" v-model="radiochoice" @change="selecttime">14:00
              <input type="radio" name="selecttime" value="16" :disabled="isdisabled4" v-model="radiochoice" @change="selecttime">16:00
              <input type="radio" name="selecttime" value="18" :disabled="isdisabled5" v-model="radiochoice" @change="selecttime">18:00
            </div>
            <div class="order-handin">
              <hb>(灰色为已被预约的时间段)</hb>
              <br>
              <button @click="sendServiceOrder">确认提交</button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
  import config from '../../config/ipurl'
  import cookie from '../../assets/js/cookie'
  import Calendar from 'vue-calendar-component';
  export default {
    name: 'servicedetail',
    data:function () {
      return{
        //radio
        radiochoice:'',

        showbefore:true,//模态框-初始状态
        showafter:false,//模态框-生成订单后
        agoday:'',//禁止该日期之前的 时间戳
        isdisabled1:false,//radio是否可选
        isdisabled2:false,
        isdisabled3:false,
        isdisabled4:false,
        isdisabled5:false,
        serviceid:'',//服务编号
        servicename:'',//服务名称
        serlist:[],//服务列表
        sdate:'',//预约日期
        stime:'',//预约时间
        orperson:'',//预约人
        ortel:'',//预约人电话
        orprice:'',//服务价格
        orpettype:'',//预约宠物品种
      }
    },
    props: {
      showAlertModal: {
        type: Boolean,
        default: false
      }
    },
    components: {
      Calendar
    },
    watch:{
      agoday:function(newVal){
//        this.$refs.Calendar.agoDayHide=this.agoday();
      }
    },
    mounted:function () {
      this.showorderdetail();//展示服务标题
      this.getTimeStamp();//后台获取时间戳
      console.log("时间戳"+this.agoday);
//      this.clickDay(this.sdate);//触发点击事件得到时间段radio显示与否
      this.showbefore=true;
      this.showafter=false;
    },
    methods: {
      //查询服务标题
      showorderdetail:function () {
        let vm = this;
        this.axios({
          method: 'post',
          url: config.api.getallservice,
        }).then(function (response) {
          if (response.data.status === 1) {
            console.log("无法查找全部服务信息");
          } else {
            //将标题显示在select上
            console.log(response.data.data);
            vm.serlist=response.data.data;
          }
        }).catch(function (error) {
        })
      },
      //初始化radio
      setRadio:function () {
        this.isdisabled1=false;
        this.isdisabled2=false;
        this.isdisabled3=false;
        this.isdisabled4=false;
        this.isdisabled5=false;
      },
      //在下拉框中选择服务
      selectService: function(ele) {
        let selected = ele.target.value;
        this.serviceid=selected;
        for(let i=0;i<this.serlist.length;i++){
          if(this.serlist[i].id.toString()===this.serviceid) {
            this.orprice=this.serlist[i].sePrice;
            this.servicename=this.serlist[i].seName;
          }
        }
        console.log("名字："+this.servicename);
        this.setRadio();
        this.clickDay(this.sdate);
      },
      //从后台获取时间戳
      getTimeStamp:function () {
        let vm = this;
        vm.axios({
          method: 'post',
          url: config.api.getClientTime,
        }).then(function (response) {
          vm.agoday=response.data.data.date;
          vm.sdate=response.data.data.date1;
        }).catch(function (error) {
        })
      },
      //点击将当前选中日期和服务名称传到后台 获取时间段数据
      clickDay(data) {
        console.log(data); //选中某天
        let vm = this;
        vm.setRadio();
        vm.sdate=data;
        let params = new URLSearchParams();
        params.append('serviceId', vm.serviceid);
        params.append('date', data);
        vm.axios.post(config.api.getresttime, params).then((res) => {
//          console.log(res.data);
          if(res.data.status===1){
            //为空
            console.log(res.data.msg);
          }else{
            console.log(res.data.data.orderServiceList);
            let resdata=res.data.data.orderServiceList;
            let choosetime=[];
            for(let i=0;i<resdata.length;i++){
              choosetime[i]=resdata[i];
              if(choosetime[i].orderTime===10){
                console.log("choosetime[i]===1");
                vm.isdisabled1=true;
              }else if(choosetime[i].orderTime===12){
                vm.isdisabled2=true;
                console.log("choosetime[i]===2");
              }else if(choosetime[i].orderTime===14){
                vm.isdisabled3=true;
                console.log("choosetime[i]===3");
              }else if(choosetime[i].orderTime===16){
                vm.isdisabled4=true;
                console.log("choosetime[i]===4");
              }else if(choosetime[i].orderTime===18){
                vm.isdisabled5=true;
                console.log("choosetime[i]===5");
              }
            }
          }
        })
      },
      selecttime:function () {
        this.stime=this.radiochoice;
        console.log(this.stime);
      },
      //提交预约
      sendServiceOrder:function () {
        let loginuser=cookie.getUserName();
        if(loginuser===0){
          //没有登录
          alert("未登录，请登录后进行预约")
        }
        else if(this.orperson===''||this.ortel===''||this.servicename===''||this.sdate===''||this.stime===''){
          alert("请填写预约信息")
        }else{
          //已登录
//        console.log(this.stime);
          let vm = this;
          let params = new URLSearchParams();
          params.append('seId', vm.serviceid);
          params.append('seName', vm.servicename);
          params.append('osName', vm.orperson);
          params.append('osPhone', vm.ortel);
          params.append('sePrice', vm.orprice);
          params.append('orderDate', vm.sdate);
          params.append('orderTime', vm.stime);
          this.axios.post(config.api.setserviceorder, params).then((res) => {
            console.log(res.data);
            if(res.data.status===0){
              //服务订单生成成功
              vm.showafter=true;
              vm.showbefore=false;
            }else{
              //生成失败
              vm.showbefore=true;
              vm.showafter=false;
              alert(res.data.msg);
            }
          })
        }
      },
      //关闭对话框
      closeMyself: function () {
        this.$emit('closechild', false);
        this.showbefore=true;
        this.showafter=false;
      },

    }
  }
</script>
<style scope>
  .servicedetail-all {

  }
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
    height: 600px;
    /*max-height: 50%;*/
    overflow: auto;
    background: #eff2f5;
    top: 2%;
    left: 50%;
    margin-left: -25%;
    z-index: 10;
    border: 2px solid #a6b4c4;
    padding: 1%;
    line-height: 1.6;
  }
  /*模态框-标题*/
  .dialog-title{
    text-align: center;
    font-size: 24px;
    color: #2a2a29;
  }
  /*模态框-支付之后*/
  .dialog-after{
    margin-top: 200px;
    text-align: center;
  }
  /*模态框-支付之前*/
  .dialog-before{
    text-align: center;
    /*margin-left: 45px;*/
    font-size: 16px;
  }
  .dialog-before input{
    margin: 5px;
    font-size: 14px;
    width: 200px;
    height: 20px;
    padding: 10px;
  }
  .dialog-before select{
    margin: 5px;
    font-size: 14px;
    width: 200px;
    height: 20px;
  }
  .dialog-before button{
    margin: 20px;
    width: 100px;
    height: 40px;
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
  .Calendar-box{
    width: 350px;
    /*height: 350px;*/
    margin-top: 5px;
  }
  .select-time-box{
    display: inline-flex;
    font-size: 18px;
    margin-top: 10px;
    line-height: 18px;
  }
  .select-time-box h5{
    text-align: left;
    margin-left: 100px;
  }
  .select-time-box input{
    border: 1px solid;
    float: left;
    width: 20px;
    height: 20px;
    margin: 0;
  }
  .order-handin{
    text-align: center;
  }
  .order-handin button{
    margin: 0;
    border: none;
    color: white;
    background-color: #4ed690;
  }
</style>
