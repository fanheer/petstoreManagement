import Vue from 'vue'
import VeeValidate, {Validator} from 'vee-validate'
import zh from 'vee-validate/dist/locale/zh_CN';//引入中文文件

// 配置中文
Validator.addLocale(zh);

const config = {
  locale: 'zh_CN'
};

Vue.use(VeeValidate,config);

// 自定义validate
const dictionary = {
  zh_CN: {
    messages: {
      email: () => '请输入正确的邮箱格式',
      required: ( field )=> "请输入" + field,
    },
    attributes:{
      email:'邮箱',
      password:'密码',
      name: '账号',
      phone: '手机',
      code:'验证码',
      newname:'用户昵称',
      newemail:'登录邮箱',
      newpassword:'登录密码',
      newquestion:'密码提示问题',
      newanswer:'密码提示答案',
    }
  }
};

Validator.updateDictionary(dictionary);

Validator.extend('phone', {
  messages: {
    zh_CN:field => field + '必须是11位手机号码',
  },
  validate: value => {
    return value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
  }
});
Validator.extend('email', {
  messages: {
    zh_CN: (field) => '请填写有效邮箱地址'
  },
  validate: (value, arg) => {
    return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value);
  }
});
Validator.extend('password', {
  messages: {
    zh_CN: field => '请输入6-16位数字、字母登录密码'
  },
  validate: value => {
    return /^[0-9A-Za-z]{6,16}$/.test(value);
  }
});
