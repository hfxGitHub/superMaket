import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/shouye',
    children: [{
      path: 'shouye',
      name: 'Shouye',
      component: () => import('@/views/shouye/index'),
      meta: {
        title: '首页',
        icon: 'icon'
      }
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: {
      roles: [1],
      icon: 'bug',
      title: '商品管理'
    },
    children: [{
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: {
          title: '商品列表',
          icon: 'list',
          roles: [1]
        }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: {
          title: '商品分类',
          icon: 'tree',
          roles: [1]
        }
      },
      {
        path: 'form',
        name: 'Form',
        hidden: true,
        component: () => import('@/views/form/index'),
        meta: {
          title: '商品编辑',
          icon: 'form',
          roles: [1]
        }
      },
      {

        path: 'add',
        name: 'Add',
        component: () => import('@/views/add/index'),
        meta: {
          title: '商品添加',
          icon: 'edit',
          roles: [1]
        }
      }
    ]
  },
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: '订单管理',
      icon: 'nested'
    },
    children: [{
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: {
          title: '订单列表',
          icon: 'list'
        }
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: {
          title: '导出订单',
          icon: 'excel'
        }
      },
      {
        path: 'menu3',
        component: () => import('@/views/nested/menu3/index'),
        meta: {
          title: '店铺订单',
          icon: 'list',
          roles: [1]
        }
      }
    ]
  },
  {
    path: '/fenxi',
    component: Layout,
    redirect: '/fenxi',
    meta: {
      roles: [1]
    },
    children: [{
      path: 'fenxi',
      name: 'Fenxi',
      component: () => import('@/views/fenxi/index'),
      meta: {
        title: '销售分析',
        icon: 'eye-open',
        roles: [1]
      }
    }]
  },
  // {
  //   path: '/ditu',
  //   component: Layout,
  //   redirect: '/ditu',
  //   children: [{
  //     path: 'ditu',
  //     name: 'Ditu',
  //     component: () => import('@/views/ditu/index'),
  //     meta: {
  //       title: '实施地图',
  //       icon: 'international'
  //     }
  //   }]
  // },

  // {
  //   path: '/yonghu',
  //   component: Layout,
  //   redirect: '/yonghu',
  //   children: [{
  //     path: 'yonghu',
  //     name: 'Yonghu',
  //     component: () => import('@/views/yonghu/index'),
  //     meta: {
  //       title: '商户权限',
  //       icon: 'peoples'
  //     }
  //   }]
  // },

  // 商城展示页面

  {
    path: '/zhanshiye',
    component: Layout,
    redirect: '/zhanshiye',
    children: [{
      path: 'zhanshiye',
      name: 'Zhanshiye',
      component: () => import('@/views/zhanshiye/index'),
      meta: {
        title: '商城展示首页',
        icon: 'star'
      }
    }]
  },

  {
    path: '/gouwuche',
    component: Layout,
    redirect: '/gouwuche',
    children: [{
      path: 'gouwuche',
      name: 'Gouwuche',
      component: () => import('@/views/gouwuche/index'),
      meta: {
        title: '购物车',
        icon: 'shopping'
      }
    }]
  },

  // {
  //   path: '/register',
  //   component: Layout,
  //   redirect: '/register',
  //   children: [{
  //     path: 'register',
  //     name: 'Register',
  //     component: () => import('@/views/register/index'),
  //     meta: {
  //       title: '注册页面',
  //       icon: 'guide'
  //     }
  //   }]
  // },

  {
    path: '/modifyPwd',
    component: Layout,
    redirect: '/modifyPwd',
    children: [{
      path: 'modifyPwd',
      name: 'ModifyPwd',
      component: () => import('@/views/modifyPwd/index'),
      meta: {
        title: '修改密码',
        icon: 'lock'
      }
    }]
  },

  {
    path: '/zhuantai',
    component: Layout,
    redirect: '/zhuantai',
    children: [{
      path: 'zhuantai',
      name: 'Zhuantai',
      component: () => import('@/views/zhuantai/index'),
      meta: {
        title: '用户状态',
        icon: 'people'
      }
    }]
  },
  {
    path: '/tuijian',
    component: Layout,
    redirect: '/tuijian',
    children: [{
      path: 'tuijian',
      name: 'Tuijian',
      component: () => import('@/views/tuijian/index'),
      meta: {
        title: '商品推荐',
        icon: 'qq'
      }
    }]
  },

  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]


export const asyncRoutes = [{
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/shouye',
    children: [{
      path: 'shouye',
      name: 'Shouye',
      component: () => import('@/views/shouye/index'),
      meta: {
        title: '首页',
        icon: 'icon'
      }
    }]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: '订单管理',
      icon: 'nested'
    },
    children: [{
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: {
          title: '订单列表',
          icon: 'list'
        }
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: {
          title: '导出订单',
          icon: 'excel'
        }
      }
    ]
  },


  // 商城展示页面

  {
    path: '/zhanshiye',
    component: Layout,
    redirect: '/zhanshiye',
    children: [{
      path: 'zhanshiye',
      name: 'Zhanshiye',
      component: () => import('@/views/zhanshiye/index'),
      meta: {
        title: '商城展示首页',
        icon: 'star'
      }
    }]
  },

  {
    path: '/gouwuche',
    component: Layout,
    redirect: '/gouwuche',
    children: [{
      path: 'gouwuche',
      name: 'Gouwuche',
      component: () => import('@/views/gouwuche/index'),
      meta: {
        title: '购物车',
        icon: 'shopping'
      }
    }]
  },

  // {
  //   path: '/register',
  //   component: Layout,
  //   redirect: '/register',
  //   children: [{
  //     path: 'register',
  //     name: 'Register',
  //     component: () => import('@/views/register/index'),
  //     meta: {
  //       title: '注册页面',
  //       icon: 'guide'
  //     }
  //   }]
  // },

  {
    path: '/modifyPwd',
    component: Layout,
    redirect: '/modifyPwd',
    children: [{
      path: 'modifyPwd',
      name: 'ModifyPwd',
      component: () => import('@/views/modifyPwd/index'),
      meta: {
        title: '修改密码',
        icon: 'lock'
      }
    }]
  },

  {
    path: '/zhuantai',
    component: Layout,
    redirect: '/zhuantai',
    children: [{
      path: 'zhuantai',
      name: 'Zhuantai',
      component: () => import('@/views/zhuantai/index'),
      meta: {
        title: '用户状态',
        icon: 'people'
      }
    }]
  },
  {
    path: '/tuijian',
    component: Layout,
    redirect: '/tuijian',
    children: [{
      path: 'tuijian',
      name: 'Tuijian',
      component: () => import('@/views/tuijian/index'),
      meta: {
        title: '商品推荐',
        icon: 'qq'
      }
    }]
  },

  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]





const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
