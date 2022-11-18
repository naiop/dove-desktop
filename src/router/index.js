import Vue from 'vue'
import Router from 'vue-router'
import AppGrid from '@/components/AppGrid'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'AppGrid',
      component: AppGrid
    }
  ]
})
