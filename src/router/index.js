import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import TriviaGame from '@/components/TriviaGame'
import resultsPage from '@/components/resultsPage'


export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/game',
      name: 'game',
      component: TriviaGame
    },
    {
      path: '/result',
      name: 'result',
      component: resultsPage
    }
  ]
})
