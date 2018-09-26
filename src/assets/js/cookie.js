/*用export把方法暴露出来*/
/*设置cookie*/
//将localStorage的四个函数封装一下，使得当浏览器或客户端不兼容localStorage时自动切换到Cookies存储。
//设置user状态
 function setUserInfo(uid,uname) {
   const userInfo = localStorage.getItem('username');
   if (userInfo) {
      // 如果本地存在 userInfoState 将其移除
      localStorage.removeItem('username');
     localStorage.removeItem('id');
   }
   localStorage.setItem('username',uname);  //添加到localStorage
   localStorage.setItem('id',uid);
   // console.log(localStorage.getItem('username'));
}
//清除用户信息
function deleteUserInfo() {
  // sessionStorage.clear();
  console.log("clear~");
  localStorage.clear();
}
//获取用户姓名return username
function getUserName() {
  // let data1 = JSON.parse(sessionStorage.getItem('userInfoState'));
  let uname=localStorage.getItem('username');
  if(uname){
    console.log("uname:"+uname);
    return uname;
  }else{
    console.log("未登录");
    return 0;
  }
}
//获取用户id return id
function getUserId() {
  // let data1 = JSON.parse(sessionStorage.getItem('userInfoState'));
  let uid=localStorage.getItem('id');
  if(uid){
    // console.log("uid:"+uid);
    return uid;
  }else{
    // console.log("未登录");
    return 0;
  }
}
export default {
  setUserInfo,
  deleteUserInfo,
  getUserName,
  getUserId,
}
