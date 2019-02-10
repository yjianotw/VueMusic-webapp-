import Fetch from '@/utils/fetch'

// 获取首页轮播图片
export const getImages = () => Fetch('/banner')

// 获取推荐歌单
export const SongList = () => Fetch('/personalized', { limit: 6 })

// 获取最新音乐
export const NewSongs = () => Fetch('/personalized/newsong', { limit: 10 })

// 获取推荐电台
export const Radios = () => Fetch('/personalized/djprogram', { limit: 6 })

// 获取推荐MV
export const MVs = () => Fetch('/personalized/mv', { limit: 3 })

// 获取独家放送
export const PrivateContent = () => Fetch('/personalized/privatecontent', { limit: 3 })