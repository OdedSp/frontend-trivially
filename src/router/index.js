import Router from 'vue-router'
import HomePage from '@/components/HomePage'


export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    }
  ]
})
