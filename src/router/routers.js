import Login from '@/components/login/main'
//宠物店页面路由
import petStore from '@/components/pet-store/petstore'
import storeIndex from '@/components/pet-store/storeindex.vue'
import productIndex from '@/components/pet-store/productindex.vue'
import serviceIndex from '@/components/pet-store/serviceindex.vue'
import cartIndex from '@/components/pet-store/cartindex.vue'
//用户中心路由
import userCenterNav from '@/components/basicnav/usercenternav.vue'
import userCenter from '@/components/user-center/usercenter.vue'
import centerIndex from '@/components/user-center/centerindex.vue'
import userMess from '@/components/user-center/usermess.vue'
import userOrder from '@/components/user-center/userorder.vue'
import userPsw from '@/components/user-center/userpsw.vue'
//商品详情
import itemsDetail from '@/components/pet-store/itemsdetail.vue'
//服务详情
import serviceDetail from '@/components/pet-store/servicedetail.vue'
import orderDetail from '@/components/pet-store/orderdetail.vue'
const routers = [
  // 注册登录页面
  {
    path: '/',
    name: 'main1',
    component: Login
  },
  {
    path:'/itemsdetail',
    name:'itemsdetail',
    component:itemsDetail
  },
  //宠物店主页
  {
    path: '/petstore',
    name: 'petStore',
    component: petStore,
    children:[
      {
        path:'/',
        name:'storeindex',
        component:storeIndex
      },
      {
        path:'storeindex',
        name:'storeindex',
        component:storeIndex
      },
      {
        path:'productindex',
        name:'productindex',
        component:productIndex,
        // children:[
        //   {
        //     path:'itemsdetail',
        //     name:'itemsdetail',
        //     component:itemsDetail
        //   }
        // ]
      },
      {
        path:'itemsdetail',
        name:'itemsdetail',
        component:itemsDetail
      },
      {
        path:'serviceindex',
        name:'serviceindex',
        component:serviceIndex
      },
      {
        path:'servicedetail',
        name:'servicedetail',
        component:serviceDetail
      },
      {
        path:'cartindex',
        name:'cartindex',
        component:cartIndex
      },
      {
        path:'orderdetail',
        name:'orderdetail',
        component:orderDetail
      }
    ]
  },
  //用户中心界面
  {
    path:'/usercenternav',
    name:'usercenternav',
    component:userCenterNav,
  },
  {
    path: '/usercenter',
    name: 'usercenter',
    component: userCenter,
    children: [
      {
        path: '/',
        name: 'centerindex',
        component: centerIndex
      },
      {
        path: 'centerindex',
        name: 'centerindex',
        component: centerIndex
      },
      {
        path: 'usermess',
        name: 'usermess',
        component: userMess
      },
      {
        path: 'userorder',
        name: 'userorder',
        component: userOrder
      },
      {
        path: 'userpsw',
        name: 'userpsw',
        component: userPsw
      },

    ]
  },

]

// routers.beforeEach((to, from, next) => {
//   // console.log('to:' + to.path)
//   if (to.path.startsWith('/login')) {
//     window.sessionStorage.removeItem('access-token')
//     next()
//   } else {
//     let token = window.sessionStorage.getItem('access-token')
//     if (!token) {
//       next({ path: '/petstore' })
//     } else {
//       next()
//     }
//   }
// })
export default routers
