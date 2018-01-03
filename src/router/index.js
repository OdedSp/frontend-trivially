import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import TriviaGame from '@/components/TriviaGame'
import GameEndPage from '@/components/GameEndPage'


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
      path: '/gamedone',
      name: 'gamedone',
      component: GameEndPage
    }
  ]
})
