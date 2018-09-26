/**
 * 主要用于存储基础配置文件
 */
const baseUrl="http://192.168.43.85:8080/";
//API接口
const api={
  'baseUrl': baseUrl,
  'login':baseUrl+'user/login.do',//用户登录接口
  'adlogin':baseUrl+' /manage/user/login.do',//管理员登录接口
  'register':baseUrl+'user/register.do',//注册接口
  'getemailcode':baseUrl+'user/email.do',//注册邮箱验证码接口
  // 'logout':baseUrl+'/manage/user/logout.do',//注销接口
  'logout':baseUrl+'user/logout.do',//注销接口
  'forget_get_question':baseUrl+'user/forget_get_question.do',//查询密保问题
  'forget_check_answer':baseUrl+'user/forget_check_answer.do',//核对密保答案
  'forget_reset_password':baseUrl+'user/forget_reset_password.do',//重置密码
  'get_information':baseUrl+'user/get_information.do',//查询用户基本信息
  'select':baseUrl+'address/select.do',//查询全部收货地址
  'addaddress':baseUrl+'address/add.do',//添加一条收货地址
  'del':baseUrl+'address/del.do',//删除一条收货地址
  'itemlist':baseUrl+'item/list.do',//查询全部商品
  'showproducttype':baseUrl+'item/get_type.do',//查询商品类别
  'itemsingle':baseUrl+'item/detail.do',//查询一条商品信息
  'selectbyname':baseUrl+'item/select_by_name.do',//按名称查询
  'selectbytype':baseUrl+'item/select_by_type_name.do',//按种类查询
  'addintocart':baseUrl+'cart/add.do',//加入购物车
  'showcartdata':baseUrl+'cart/list.do',//显示购物车里的全部数据
  'deleteitemincart':baseUrl+'cart/del_item.do',//删除购物车里的一条数据
  'alternumincart':baseUrl+'cart/update.do',//修改购物车一条数据
  'clearcart':baseUrl+'',//清除购物车
  'selectsingleincart':baseUrl+'cart/select.do',//购物车单选
  'setorder':baseUrl+'order/first_create.do',//从购物车生成一条订单信息（1）
  'finishorder':baseUrl+'order/create.do',//从购物车生成一条订单信息（2）
  'singlebuy':baseUrl+'order/first_create_single.do',//直接购买(1)
  'finishsinglebuy':baseUrl+'order/create_single.do',//直接购买(2)
  'showproductorders':baseUrl+'order/list.do',//查询商品订单
  'selectorderbyid':baseUrl+'order/detail.do',//查询一条订单信息
  'delporder':baseUrl+'order/change_order_status.do',//删除一条订单信息
  'cancelporder':baseUrl+'order/cancel.do',//取消一条订单
  'getresttime':baseUrl+'service/get_service_order_info.do',//查询未被预约的服务时间
  'getallservice':baseUrl+'service/get_all_service.do',//查询全部服务
  'getClientTime':baseUrl+'service/get_current_time.do',//获取服务器时间
  'setserviceorder':baseUrl+'service/create_service_order.do',//生成服务订单
  'showserviceorders':baseUrl+'service/get_all_service_order.do',//查询所有服务订单
  'getnotice':baseUrl+'user/get_notice.do',//获取公告
  '':baseUrl+'',//
  '':baseUrl+'',//
  '':baseUrl+'',//
  '':baseUrl+'',//

};
const config={
  api:api,
};
export default config;
