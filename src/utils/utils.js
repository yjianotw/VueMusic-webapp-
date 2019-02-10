/**
 * 添加搜索记录至localStorage
 * @param {String} keywords 搜索关键字
 */
export function setHistory(keywords) {
    let historys = localStorage.getItem("searchHistory")
        ? JSON.parse(localStorage.getItem("searchHistory"))
        : [];
    // 判断是否重复搜索，若是则不添加记录
    if (historys.includes(keywords)) {
        return;
    } else {
        if (historys.length < 10) {
            historys.unshift(keywords); // 头部添加
        } else {
            historys.pop(); // 尾部删除
            historys.unshift(keywords); // 头部添加
        }
        localStorage.setItem("searchHistory", JSON.stringify(historys));
    }
}

/**
 * 筛选歌曲信息
 */
export function filterSongInfo(song) {
    return {
        album: {
            id: song.al.id,
            name: song.al.name,
            imgUrl: song.al.picUrl
        },
        artists: song.ar.map(item => {
            return {
                id: item.id,
                name: item.name
            }
        }),
        id: song.id,
        mv: song.mv,
        name: song.name,
        duration: song.dt
    }
}

/**
 * 格式化歌曲视频等duration
 */
export function formatDuration(dt) {
    let m = parseInt(dt / 60), s = parseInt(dt % 60);
    m = m < 10 ? '0' + m : '' + m;
    s = s < 10 ? '0' + s : '' + s;
    return m + ':' + s;
}

/**
 * 格式化歌词
 */
export function formatLyric(lyric) {
    let lyrics = lyric.split('\n'), lyricArr = [];
    for (const line of lyrics) {
        let t = line.substring(line.indexOf('[') + 1, line.indexOf(']'));
        lyricArr.push({
            time: +((t.split(':')[0] * 60 + (+t.split(':')[1])).toFixed(3)),
            text: line.substring(line.indexOf(']') + 1, line.length)
        })
    }
    return lyricArr.filter(item => !isNaN(item.time) && item.text)
}

/**
 * 格式化年月日时间
 */
export function formatYMD(time) {
    let date = new Date(time);
    let y = date.getFullYear(), m = date.getMonth() + 1, d = date.getDate();
    return `${y}年${m}月${d}日`
}

/**
 * 滚动事件监听，到底部时的处理
 */
export function handleScroll(id) {
    let container = document.getElementById(id);
    //若滑动到底部，则让底部和导航栏不重叠
    container.addEventListener("scroll", function (e) {
        if (
            container.scrollHeight - container.scrollTop <
            container.clientHeight + 100
        ) {
            container.style.bottom = "60px";
        } else {
            container.style.bottom = "0";
        }
    });
}