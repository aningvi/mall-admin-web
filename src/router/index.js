import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  {path: '/login', component: () => import('@/views/login/index'), hidden: true},
  {path: '/404', component: () => import('@/views/404'), hidden: true},
  {
    path: '',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: {title: '仪表盘', icon: 'dashboard'}
    }
    ]
  }
]

export const asyncRouterMap = [
  {
    path:'/device',
    component: Layout,
    children: [
      {
        path: 'device',
        name: 'device',
        component: () => import('@/views/bms/device/index'),
        meta: {title: '设备管理', icon: 'sms-coupon'}
      },
      {
        path: 'addDevice',
        name: 'addDevice',
        component: () => import('@/views/bms/device/add'),
        meta: {title: '添加设备'},
        hidden:true
      },
      {
        path: 'updateDevice',
        name: 'updateDevice',
        component: () => import('@/views/bms/device/update'),
        meta: {title: '修改设备'},
        hidden:true
      },
      {
        path: 'deviceDetail',
        name: 'deviceDetail',
        component: () => import('@/views/bms/device/detail'),
        meta: {title: '查看详情'},
        hidden:true
      }]
  },
  {
    path:'/fitting',
    component: Layout,
    children: [
      {
        path: 'fitting',
        name: 'fitting',
        component: () => import('@/views/bms/fitting/index'),
        meta: {title: '配件管理', icon: 'sms-subject'}
      },
      {
        path: 'addFitting',
        name: 'addFitting',
        component: () => import('@/views/bms/fitting/add'),
        meta: {title: '添加配件'},
        hidden:true
      },
      {
        path: 'updateFitting',
        name: 'updateFitting',
        component: () => import('@/views/bms/fitting/update'),
        meta: {title: '修改配件'},
        hidden:true
      },
      {
        path: 'fittingDetail',
        name: 'fittingDetail',
        component: () => import('@/views/bms/fitting/detail'),
        meta: {title: '配件详情'},
        hidden:true
      }]
  },
  {
    path:'/maintain',
    component: Layout,
    children: [
      {
        path: 'maintain',
        name: 'maintain',
        component: () => import('@/views/bms/maintain/index'),
        meta: {title: '维修管理', icon: 'sms-subject'}
      },
      {
        path: 'addMaintain',
        name: 'addMaintain',
        component: () => import('@/views/bms/maintain/add'),
        meta: {title: '添加维修单'},
        hidden:true
      },
      {
        path: 'updateMaintain',
        name: 'updateMaintain',
        component: () => import('@/views/bms/maintain/update'),
        meta: {title: '修改维修单'},
        hidden:true
      },
      {
        path: 'maintainHistory',
        name: 'maintainHistory',
        component: () => import('@/views/bms/maintain/detail'),
        meta: {title: '维修单详情'},
        hidden:true
      }]
  },
  {
    path:'/ums',
    component: Layout,
    redirect: '/ums/admin',
    name: 'ums',
    meta: {title: '权限', icon: 'ums'},
    children: [
      {
        path: 'admin',
        name: 'admin',
        component: () => import('@/views/ums/admin/index'),
        meta: {title: '用户列表', icon: 'ums-admin'}
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/ums/role/index'),
        meta: {title: '角色列表', icon: 'ums-role'}
      },
      {
        path: 'allocMenu',
        name: 'allocMenu',
        component: () => import('@/views/ums/role/allocMenu'),
        meta: {title: '分配菜单'},
        hidden: true
      },
      {
        path: 'allocResource',
        name: 'allocResource',
        component: () => import('@/views/ums/role/allocResource'),
        meta: {title: '分配资源'},
        hidden: true
      },
      {
        path: 'menu',
        name: 'menu',
        component: () => import('@/views/ums/menu/index'),
        meta: {title: '菜单列表', icon: 'ums-menu'}
      },
      {
        path: 'addMenu',
        name: 'addMenu',
        component: () => import('@/views/ums/menu/add'),
        meta: {title: '添加菜单'},
        hidden: true
      },
      {
        path: 'updateMenu',
        name: 'updateMenu',
        component: () => import('@/views/ums/menu/update'),
        meta: {title: '修改菜单'},
        hidden: true
      },
      {
        path: 'resource',
        name: 'resource',
        component: () => import('@/views/ums/resource/index'),
        meta: {title: '资源列表', icon: 'ums-resource'}
      },
      {
        path: 'resourceCategory',
        name: 'resourceCategory',
        component: () => import('@/views/ums/resource/categoryList'),
        meta: {title: '资源分类'},
        hidden: true
      }
    ]
  },
  {path: '*', redirect: '/404', hidden: true}
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

