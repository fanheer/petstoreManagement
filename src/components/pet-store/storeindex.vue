<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="storeindex-all">
    <!--轮播-->
    <div class="slide" v-on:mouseover="stop()" v-on:mouseout="move()">
      <div class="slideshow">
        <!--过渡效果transition-->
        <transition-group tag="ul" name="image">
          <li v-for="(img,index) in imgArray" v-show="index===mark" :key="index">
            <a href="#">
              <img :src='img'>
            </a>
          </li>
        </transition-group>
      </div>
      <div class="bar">
         <span v-for="(item,index) in imgArray" :class="{'active':index===mark}"
               @click="change(index)" :key="index">
         </span>
      </div>
    </div>
    <!--功能跳转-->
    <div class="func-all">
      <div class="func-intro">
        <div>
          <router-link to="/petstore/productindex"><img src="../../assets/petstore/logo1.jpg"></router-link>
        </div>
        <div>
          <router-link to="/petstore/productindex">宠物及商品</router-link>
        </div>
      </div>
      <div class="func-intro">
        <div>
          <router-link to="/petstore/serviceindex"><img src="../../assets/petstore/logo2.jpg"></router-link>
        </div>
        <div>
          <router-link to="/petstore/serviceindex">预约服务</router-link>
        </div>
      </div>
      <div class="func-intro">
        <div>
          <router-link to="/usercenter"><img src="../../assets/petstore/logo3.jpg"></router-link>
        </div>
        <div>
          <router-link to="/usercenter">最新活动</router-link>
        </div>
      </div>
    </div>
    <!--详情介绍-->
    <div class="store-intro">

      <div class="col-md-5 text-center">
        <p class="text_style">
          您好，这里是爱宠宠物店。
          <br>
          本网店提供了丰富的宠物和宠物用品等商品，以及便捷的服务预约功能。
          <br>
          诚挚地希望您可以在此享受到优质服务，谢谢光临。
        </p>
        <p class="text_style">
          <span class="glyphicon glyphicon-home"></span>
          重庆市南岸区重庆交通大学
        </p>
        <p class="text_style">
          <span class="glyphicon glyphicon-phone-alt"></span>
          联系电话：13666666666
        </p>
        <p class="text_style">
          <span class="glyphicon glyphicon-envelope"></span>
          电子邮件：12345678@163.com
        </p>
      </div>
      <div class="col-md-6 msg-box">
          <div class="col-md-6">
            <input type="text" class="form-control text_box" placeholder="请输入您的姓名">
          </div>
          <div class="col-md-6">
            <input type="text" class="form-control text_box" placeholder="请输入您的电子邮件">
          </div>
          <div class="col-md-12">
            <input type="text" class="form-control text_box" placeholder="标题">
          </div>
          <div class="col-md-12">
            <textarea placeholder="留言内容" rows="4" class="form-control text_box"></textarea>
          </div>
          <div class="col-md-8">
            <input type="submit" value="提交信息" class="form-control btn-info message_submit">
          </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'storeindex',
//    创建定时器 每隔2.5s给变量mark+1 挂载到钩子函数created
    data() {
      return {
        timer: null,//定时器
        mark: 0,//比对图片的索引变量
        imgArray: [
          '../../static/lb-pic1.png',
          '../../static/lb-pic2.png',
          '../../static/lb-pic3.png',
          '../../static/lb-pic4.png'
        ]
      }
    },
    methods: {
      autoPlay() {
        this.mark++;
        if (this.mark === 4) {
          this.mark = 0
        }
      },
      play() {
        this.timer = setInterval(this.autoPlay, 2500)
      },
      change(i) {
        this.mark = i;
      },
      stop() {
        clearInterval(this.timer)
      },
      move() {
        this.timer = setInterval(this.autoPlay, 2500)
      }
    },
    created() {
      this.play()
    }
  }
</script>

<style scope>
  .storeindex-all{

  }
  /*图片轮播部分*/
  .slide {
    height: 400px;
    /*max-height:460px;*/
    overflow: hidden;
  }
  .slideshow {
    /*margin-top: -20px;*/
    height: 400px;

  }
  .slideshow ul li {
    height: 450px;
    position: relative;
    text-align: center;
    display:block;
    list-style-type: none;
  }
  .slideshow li img {
    /*width: 100%;*/
    /*height: 320px;*/
    /*margin-top: -30px;*/
    margin-left: -40px;
    max-width: 100%;
    max-height: inherit;
  }
  .bar {
    position: relative;
    width: 100%;
    bottom: 50px;
    z-index: 10;
    text-align: center;
  }
  .bar span {
    width: 15px;
    height: 15px;
    border: 2px solid #D89E9E;
    border-radius: 10px;
    background: #f2f9cd;
    display: inline-block;
    margin-right: 10px;
  }
  .active {
    background: rgba(216, 158, 158,0.60) !important;
  }
/*Vue 提供了 transition 的封装组件，在下列情形中，可以给任何元素和组件添加 entering/leaving 过渡*/
  .image-enter-active {
    transition: all 1.5s ease;
  }
  .image-leave-active {
    transition: all 1.5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .image-enter, .image-leave {
    /*padding-left: 10px;*/
    opacity: 0;
  }

  /*功能展示部分*/
  .func-all {
    /*border-color: #2b542c;*/
    /*border: 1px solid;*/
    display: flex;
    width: auto;
    height: auto;
    text-align: center;
  }
  .func-intro {
    /*border-color: #2b542c;*/
    /*border: 1px solid;*/
    margin: auto;
    margin-top: 5%;
  }

  /*网店简介部分*/
  .store-intro {
    background: url("../../assets/petstore/main-map.jpg");
    height: 400px;
    width: 100%;
    margin-bottom: 30px;
    border-color: #2b542c;
    border-top: 1px solid;
    margin-top: 5%;
    padding-top: 5%;
  }
  .text_style{
    color: white;
    margin-top: 25px;
  }
  .msg-box input{
    margin-top: 10px;
  }
  .msg-box textarea{
    margin-top: 10px;
  }
</style>
