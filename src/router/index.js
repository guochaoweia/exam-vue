import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/LoginView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/home',
    name: 'home',
    redirect: 'calendar',
    component: () => import('../views/HomeView.vue'),
    children: [
      {
        path: '/topicbank',
        name: 'topicbank',
        component: () => import('../views/topic/TopicbankView.vue')
      },
      {
        path: '/htmlbank',
        name: 'htmlbank',
        component: () => import('../views/topic/HtmlbankView.vue')
      },
      {
        path: '/jsbank',
        name: 'jsbank',
        component: () => import('../views/topic/JsbankView.vue')
      },
      {
        path: '/personaldata',
        name: 'personaldata',
        component: () => import('../views/userInfo/PersonaldataView.vue'),
      },
      {
        path: '/calendar',
        name: 'calendar',
        component: () => import('../views/task/CalendarView.vue'),
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('../views/AboutView.vue'),
      },
      {
        path: '/createtask',
        name: 'createtask',
        component: () => import('../views/task/CreatetaskView.vue'),
      },
      {
        path: '/userinfo',
        name: 'userinfo',
        component: () => import('../views/userInfo/UserInfoView.vue'),
      },
      {
        path: '/tasklist',
        name: 'tasklist',
        component: () => import('../views/task/TasklistView.vue'),
      },
      {
        path: '/rolemanagement',
        name: 'rolemanagement',
        component: () => import('../views/roleMange/RolemanagementView.vue'),
      },
      {
        path: '/newrole',
        name: 'newrole',
        component: () => import('../views/roleMange/NewroleView.vue'),
      },
      {
        path: '/userdetails',
        name: 'userdetails',
        component: () => import('../views/UserdetailsView.vue'),
      },
      {
        path: '/taskdetails',
        name: 'taskdetails',
        component: () => import('../views/task/TaskdetailsView.vue'),
      },
      {
        path: '/rolegroup',
        name: 'rolegroup',
        component: () => import('../views/roleMange/RoleGroupView.vue'),
      },
      {
        path: '/jurisdiction',
        name: 'jurisdiction',
        component: () => import('../views/roleMange/JurisdictionView.vue'),
      },
      {
        path: '/setavatar',
        name: 'SetAvatar',
        component: () => import('../views/userInfo/SetAvatar.vue'),
      },
    ]
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
