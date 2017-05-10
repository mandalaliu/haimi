import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home'
import Movie from '@/components/movie/Movie'
import Books from '@/components/books/Books'
import Group from '@/components/group/Group'
import Particulars from '@/components/particulars/particulars'
Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Movie',
      name: 'Movie',
      component: Movie
    },
    {
      path: '/Books',
      name: 'Books',
      component: Books
    },
    {
      path: '/Group',
      name: 'Group',
      component: Group
    },
    {
      path: '/Particulars',
      name: 'Particulars',
      component: Particulars
    }
  ]
})
