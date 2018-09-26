<template>
  <div>
    <div class="center-title">
      消息中心
    </div>
    <div class="message-table">
      <v-table
        is-horizontal-resize
        style="width:100%;"
        :row-height="50"
        row-hover-color="#eee"
        row-click-color="#edf7ff"
        :columns="noticeColumns"
        error-content="暂时没有任何通知呢！"
        :table-data="noticeData">
      </v-table>
    </div>
  </div>
</template>
<script>
  import config from '../../config/ipurl'
  export default {
    name:'centerindex',
    data:function () {
      return{
        noticelist:[],//通知数组
        noticeColumns:[
          {field: 'id', title:'公告编号', width: 10, titleAlign: 'center',columnAlign:'center',isResize:true},
          {field: 'noticeTitle', title:'公告标题', width: 40, titleAlign: 'center',columnAlign:'center',isResize:true},
          {field: 'noticeContent', title: '公告内容', width: 400, titleAlign: 'center',columnAlign:'center',isResize:true},
          {field: 'createTime', title: '发布时间', width: 70, titleAlign: 'center',columnAlign:'center',isResize:true},
         ],
        noticeData:[],
      }
    },
    mounted(){
      this.getNotice();
    },
    methods:{
      getNotice:function(){
        let vm = this;
        this.axios({
          method: 'post',
          url: config.api.getnotice,
        }).then(function (res) {
          console.log(res.data.data);
          let resdata = new Object();
          if (res.data.status === 1) {
            console.log(res.data.msg);
            alert("无法查到地址");
          } else {
            vm.noticelist = res.data.data;
            vm.noticeData=res.data.data;
            console.log(vm.noticelist[0].noticeTitle);
          }
        }).catch(function (error) {
        })
      }
    },
  }
</script>
<style scope>
  .center-title{
    margin: 30px 180px ;
    padding-bottom: 7px;
    border-bottom: 1px solid;
    font-size: 16px;
    color: #92928f;
  }
  .message-table{
    /*border: 1px solid;*/
    margin: 30px 180px;
    height: 300px;
  }

</style>
