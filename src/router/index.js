import { createRouter, createWebHistory } from 'vue-router'

// import ContactView from '@/components/ContactView.vue';
// import ProjectView from '@/components/ProjectView.vue';
// import TaskView from '@/components/TaskView.vue';
// import UserView from '@/components/UserView.vue';


// For LazyLoading : change static import to dynamic
const HomeView = () => import('@/components/HomeView.vue');
const UserView = () => import('@/components/UserView.vue');
const ProjectView = () => import('@/components/ProjectView.vue');
const TaskView = () => import('@/components/TaskView.vue');


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectView
      
    },{
      path: '/users',
      name: 'users',
      component: UserView
    },{
      path: '/tasks',
      name: 'tasks',
      component: TaskView
    },
  ]
})

export default router
