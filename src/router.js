import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      redirect: '/containsearch',
      children: [
        {
          path: '/containsearch',
          name: 'containsearch',
          component: () => import('./views/ContainSearch/ContainSearch.vue'),
          redirect: '/recommend',
          children: [
            {
              path: '/recommend',
              name: 'recommend',
              component: () => import('./views/ContainSearch/Recommend/Recommend.vue'),
              redirect: '/personal',
              children: [
                {
                  path: '/personal',
                  name: 'personal',
                  component: () => import('./views/ContainSearch/Recommend/Personal.vue')
                },
                {
                  path: '/radio',
                  name: 'radio',
                  component: () => import('./views/ContainSearch/Recommend/Radio.vue')
                },
              ]
            },
            {
              path: '/search',
              name: 'search',
              component: () => import('./views/ContainSearch/Search.vue')
            },
            {
              path: '/searchresult',
              name: 'searchresult',
              component: () => import('./views/ContainSearch/SearchResult/SearchResult.vue'),
              redirect: '/songresult',
              children: [
                {
                  path: '/songresult',
                  name: 'songresult',
                  component: () => import('./views/ContainSearch/SearchResult/SongResult.vue')
                },
                {
                  path: '/videoresult',
                  name: 'videoresult',
                  component: () => import('./views/ContainSearch/SearchResult/VideoResult.vue')
                },
                {
                  path: '/singerresult',
                  name: 'singerresult',
                  component: () => import('./views/ContainSearch/SearchResult/SingerResult.vue')
                },
                {
                  path: '/albumresult',
                  name: 'albumresult',
                  component: () => import('./views/ContainSearch/SearchResult/AlbumResult.vue')
                },
                {
                  path: '/listresult',
                  name: 'listresult',
                  component: () => import('./views/ContainSearch/SearchResult/ListResult.vue')
                },
              ]
            },
          ]
        },
        {
          path: '/nosearch',
          name: 'nosearch',
          component: () => import('./views/NoSearch/NoSearch.vue'),
          children: [
            {
              path: '/video',
              name: 'video',
              component: () => import('./views/NoSearch/Video.vue')
            },
            {
              path: '/mylist',
              name: 'mylist',
              component: () => import('./views/NoSearch/Mylist.vue')
            },
            {
              path: '/singerclassify',
              name: 'singerclassify',
              component: () => import('./views/NoSearch/SingerClassify.vue')
            },
            {
              path: '/songlist',
              name: 'songlist',
              component: () => import('./views/NoSearch/SongList.vue')
            },
            {
              path: '/rank',
              name: 'rank',
              component: () => import('./views/NoSearch/Rank.vue')
            }
          ]
        }
      ]
    },
    {
      path: '/comment',
      name: 'comment',
      component: () => import('./views/Comment.vue')
    }
  ]
})