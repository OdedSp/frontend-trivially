import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import TriviaGame from '@/components/TriviaGame'
import resultsPage from '@/components/resultsPage'
import SignUp from '@/components/SignUp'
import UserProfile from '@/components/UserProfile'


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
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/profile',
      name: 'UserProfile',
      component: UserProfile
    }
  ]
})
