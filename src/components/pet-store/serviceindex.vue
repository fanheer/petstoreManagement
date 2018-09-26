<template>
  <div class="serviceindex-all">
    <div class="service-img">
      <img src="../../assets/petstore/service.png">
    </div>
    <div class="service-bg">
      <input value="立即预约" type="button" @click="showAlert">
    </div>
    <AlertModal :showAlertModal='showAlertModal' @closechild="changeAlertModal" :msg="msg"></AlertModal>
  </div>
</template>
<script>
  import AlertModal from '../../components/pet-store/servicedetail.vue'
  export default {
    name:'serviceindex',
    data:function () {
      return{
        showAlertModal:false,
      }
    },
    components:{
      AlertModal,
    },
    methods:{
      showAlert:function () {
        this.showAlertModal=true;
      },
      changeAlertModal:function (msg) {
        this.showAlertModal=msg;
      }
    }
  }
</script>
<style scope>
  /*整体*/
  .serviceindex-all{
    /*margin: 0 10%;*/
    /*display: block;
    background: url("../../assets/petstore/service-bg.png");*/
    background-color: black;
    text-align: center;
  }
  .service-bg input{
    width: 200px;
    height: 60px;
    margin: 20px;
    /*border: 5px outset;*/
    border: none;
    font-size: 20px;
    font-family: ;
    color: #f8f9d6;
    background-color: #d89e9e;
  }
  .service-bg input:hover{
    color: #f8f9d6;
    background-color: #d88088;
  }
  .service-img img{
    width: 100%;
  }
</style>
