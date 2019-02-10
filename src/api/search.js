import Fetch from '@/utils/fetch'

// 获取热门前三位歌手
export const top3Singer = data => Fetch('/top/artists', data)

//获取热门搜索
export const hotSearch = () => Fetch('/search/hot')

//获取搜索建议
export const searchSuggest = data => Fetch('/search/suggest', data)

// 获取搜索结果
export const SearchResult = data => Fetch('/search', data)