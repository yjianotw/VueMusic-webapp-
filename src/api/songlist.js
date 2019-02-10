import Fetch from '@/utils/fetch'

// 获取歌单详情
export const ListDetail = data => Fetch('/playlist/detail', data)