import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { songInfo } from '@/api/song'
import { filterSongInfo } from '@/utils/utils'

export default new Vuex.Store({
  state: {
    currentNav: 0,   // 底部导航菜单标志
    showPlayer: false,  //是否在播放器界面
    isPlaying: false,   //是否正在播放
    keyWords: '',   //搜索关键字
    playList: [],   //播放列表
    currentSongIndex: -1,    //当前播放的歌曲的列表索引
    favoriteList: [],   //我喜欢列表
    markedList: [],   //收藏列表
  },
  mutations: {
    CURRENT_NAV: (state, data) => {
      state.currentNav = data
    },
    SHOW_PLAYER: (state, data) => {
      state.showPlayer = data
    },
    IS_PLAYING: (state, data) => {
      state.isPlaying = data
    },
    KEY_WORDS: (state, data) => {
      state.keyWords = data
    },
    PLAY_LIST: (state, data) => {
      state.playList = data
    },
    CURRENTSONG_INDEX: (state, data) => {
      state.currentSongIndex = data
    },
    ADD_FAVORITE: state => {
      state.favoriteList.unshift(state.playList[state.currentSongIndex])
    },
    REMOVE_FAVORITE: state => {
      let i = state.favoriteList.indexOf(state.playList[state.currentSongIndex]);
      state.favoriteList.splice(i, 1)
    },
    ADD_MARKED: (state, data) => {
      state.markedList.unshift(data)
    },
    REMOVE_MARKED: (state, index) => {
      state.markedList.splice(index, 1)
    }
  },
  actions: {
    async insertSong({ commit, state }, id) {
      if (!state.playList.map(i => i.id).includes(id)) {
        const res = await songInfo({ ids: id });
        const info = filterSongInfo(res.songs[0]);
        let playlist = state.playList.slice(), index = state.currentSongIndex;
        playlist.splice(++index, 0, info);
        commit('PLAY_LIST', playlist);
        commit('CURRENTSONG_INDEX', index);
      } else {
        let i = state.playList.map(i => i.id).indexOf(id);
        commit('CURRENTSONG_INDEX', i);
      }
    },
    async addSong({ commit, state }, id) {
      if (!state.playList.map(i => i.id).includes(id)) {
        const res = await songInfo({ ids: id });
        const info = filterSongInfo(res.songs[0]);
        let playlist = state.playList.slice();
        playlist.push(info);
        commit('PLAY_LIST', playlist);
      }
    }
  },
  getters: {
    currentNav: state => state.currentNav,
    showPlayer: state => state.showPlayer,
    isPlaying: state => state.isPlaying,
    keyWords: state => state.keyWords,
    playList: state => state.playList,
    currentSongIndex: state => state.currentSongIndex,
    currentSong: state => state.playList[state.currentSongIndex] || { album: {}, artists: [], id: -1, mv: 0, name: '无' },
    favoriteList: state => state.favoriteList,
    markedList: state => state.markedList
  }
})
