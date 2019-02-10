import Fetch from '@/utils/fetch'

// 获取歌曲url
export const getSongUrl = data => Fetch('/song/url', data)

// 获取歌曲详情
export const songInfo = data => Fetch('/song/detail', data)

// 获取歌曲Url
export const songUrl = data => Fetch('/song/url', data)

// 获取歌曲评论
export const songComment = data => Fetch('/comment/music', data)

// 获取歌词
export const songLyric = data => Fetch('/lyric', data)