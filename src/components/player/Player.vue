<template>
  <transition name="fade">
    <div class="player-page" v-show="isShow">
      <audio
        :src="`https://music.163.com/song/media/outer/url?id=${currentSong.id}.mp3`"
        id="audio"
        :autoplay="isPlaying"
        :loop="playMode=='loop'||playList.length==1"
      ></audio>
      <!-- 背景 -->
      <div class="player-background">
        <img :src="currentSong.album.imgUrl" class="player-bgimg">
      </div>
      <!-- 顶部 -->
      <div class="player-header">
        <i class="icon iconfont icon-fanhui" @click="closePlayer"></i>
        <div style="width:80%">
          <p class="song">{{currentSong.name}}</p>
          <p class="singer">
            <span v-for="(singer,index) in currentSong.artists" :key="index">
              <span v-if="index>0">/</span>
              {{singer.name}}
            </span>
            <i class="icon iconfont icon-qianjin"></i>
          </p>
        </div>
        <i class="icon iconfont icon-iconfontfenxiang2"></i>
      </div>
      <!-- 黑胶唱片 -->
      <div class="black-cd" :style="isShowLyric?'opacity:0':''" @click="showLyric">
        <img src="@/assets/cd-head.png" class="cd-head" :class="{'cd-head-pause':!isPlaying}">
        <div class="img-rotate" :class="{'img-paused':!isPlaying}">
          <div class="inner-border">
            <div class="album-image-container">
              <img :src="currentSong.album.imgUrl" class="album-image" id="albumImg">
            </div>
          </div>
        </div>
      </div>
      <!-- 歌词 -->
      <div
        class="lyric-container"
        :style="isShowLyric?'':'opacity:0'"
        id="lyric"
        @click="showLyric"
      >
        <p
          v-for="(line,index) in originLyric"
          :key="index"
          class="lyric-line"
          :class="{'current-line':currentLine===index}"
        >{{line.text}}</p>
      </div>
      <!-- 底部 -->
      <div class="player-footer">
        <div class="like-comment">
          <i class="icon iconfont icon-xihuan-xianxing" v-show="!isFavorite" @click="addToFavorite"></i>
          <i class="icon iconfont icon-xihuan" v-show="isFavorite" @click="cancleFavorite"></i>
          <i class="icon iconfont icon-yuanfucengpinglun" @click="readComment"></i>
          <span class="comment">{{comment}}</span>
          <i class="icon iconfont icon-gengduo2" @click="showMenuList=true"></i>
        </div>
        <div class="progress-container">
          <span class="start-time">{{formatTime(currentPlayTime)}}</span>
          <progress-bar class="progress-bar" :percent="percent" @percentChange="changePercent"></progress-bar>
          <span class="end-time">{{formatTime(totalSongTime)}}</span>
        </div>
        <div class="mode-menu">
          <i
            class="icon iconfont icon-xunhuanbofang"
            :style="songIconSize(1.5)"
            v-show="playMode=='list'"
            @click="changeMode('list')"
          ></i>
          <i
            class="icon iconfont icon-danquxunhuan"
            :style="songIconSize(1.5)"
            v-show="playMode=='loop'"
            @click="changeMode('loop')"
          ></i>
          <i
            class="icon iconfont icon-suijibofang"
            :style="songIconSize(1.5)"
            v-show="playMode=='random'"
            @click="changeMode('random')"
          ></i>
          <i
            class="icon iconfont icon-shangyiqu101"
            :style="songIconSize(2)"
            @click="changeSong('prev')"
          ></i>
          <i
            class="icon iconfont icon-zanting"
            :style="songIconSize(3.5)"
            v-show="isPlaying"
            @click="changePlaying"
          ></i>
          <i
            class="icon iconfont icon-bofang"
            :style="songIconSize(3.5)"
            v-show="!isPlaying"
            @click="changePlaying"
          ></i>
          <i
            class="icon iconfont icon-xiayiqu101"
            :style="songIconSize(2)"
            @click="changeSong('next')"
          ></i>
          <i
            class="icon iconfont icon-bofangliebiao"
            :style="songIconSize(1.5)"
            @click="showPlayList=true"
          ></i>
        </div>
      </div>
      <transition name="layer">
        <div class="msg-layer" v-show="showMode">{{showMode}}</div>
      </transition>
      <mask-layer v-show="showPlayList||showMenuList" @closeList="closeList"></mask-layer>
      <menu-layer v-show="showMenuList" :song="currentSong" :commentCount="commentCount"></menu-layer>
      <play-list v-show="showPlayList" @closeList="closeList"></play-list>
    </div>
  </transition>
</template>

<script>
import ProgressBar from "./progress-bar";
import PlayList from "./play-list";
import MaskLayer from "../mask-layer/mask-layer";
import MenuLayer from "../mask-layer/menu-layer";
import { mapGetters, mapMutations, mapActions } from "vuex";
import { formatDuration, formatLyric } from "@/utils/utils";
import { songComment, songLyric } from "@/api/song";
export default {
  data() {
    return {
      audio: null,
      playMode: "list",
      currentPlayTime: 0,
      isShowLyric: false,
      commentCount: 0,
      originLyric: [],
      transLyric: [],
      lyricEl: null,
      currentLine: 0,
      showPlayList: false,
      showMenuList: false,
      layerEl: null,
      showMode: "",
      layerTimer: null
    };
  },
  components: {
    "progress-bar": ProgressBar,
    "play-list": PlayList,
    "mask-layer": MaskLayer,
    "menu-layer": MenuLayer
  },
  computed: {
    isFavorite() {
      return this.favoriteList.includes(this.currentSong) ? true : false;
    },
    totalSongTime() {
      return Math.round(this.currentSong.duration / 1000) || 0;
    },
    percent() {
      return Math.min(1, this.currentPlayTime / this.totalSongTime);
    },
    scrollLength() {
      if (this.lyricEl) {
        return (this.lyricEl.scrollHeight / this.originLyric.length).toFixed(2);
      }
    },
    comment() {
      return this.commentCount > 9999
        ? "1w+"
        : this.commentCount > 999
        ? "999+"
        : this.commentCount > 0
        ? this.commentCount
        : "";
    },
    ...mapGetters({
      isShow: "showPlayer",
      isPlaying: "isPlaying",
      currentSong: "currentSong",
      currentSongIndex: "currentSongIndex",
      playList: "playList",
      favoriteList: "favoriteList"
    })
  },
  mounted() {
    this.audio = document.getElementById("audio");
    this.listenEvent(this.audio);
    this.lyricEl = document.getElementById("lyric");
  },
  watch: {
    currentSong(val) {
      this.currentPlayTime = 0;
      this.isShowLyric = false;
      if (val.id == -1) {
        this.commentCount = 0;
        this.originLyric = [];
        this.transLyric = [];
        this.changeIsPlaying(false);
      } else {
        this.audio.autoplay=true;
        this.getComment(val.id);
        this.getLyric(val.id);
      }
    },
    currentPlayTime(val) {
      for (let i = 0; i < this.originLyric.length; i++) {
        if (i < this.originLyric.length - 1) {
          if (
            val >= this.originLyric[i].time &&
            val < this.originLyric[i + 1].time
          ) {
            this.currentLine = i;
          }
        } else {
          if (val >= this.originLyric[i].time) {
            this.currentLine = i;
          }
        }
      }
      if (val == 0) {
        this.lyricEl.scrollTo(0, 0);
        this.currentLine = 0;
      }
    },
    currentLine(val) {
      if (val > 4) {
        this.lyricEl.scrollTo(0, (val - 4) * this.scrollLength);
      }
    }
  },
  methods: {
    listenEvent(audio) {
      //监听歌曲开始播放时
      audio.addEventListener("play", e => {
        this.changeIsPlaying(true);
      });
      //监听歌曲暂停时
      audio.addEventListener("pause", e => {
        this.changeIsPlaying(false);
      });
      //监听当前播放时间变化
      audio.addEventListener("timeupdate", e => {
        this.currentPlayTime = e.target.currentTime;
      });
      audio.addEventListener("ended", e => {
        let index = this.currentSongIndex;
        //列表循环
        if (this.playMode === "list") {
          if (this.playList.length > 1) {
            ++index == this.playList.length
              ? this.changeIndex(0)
              : this.changeIndex(index);
          }
        } else if (this.playMode === "random") {
          //随机播放
          let random = Math.floor(Math.random() * this.playList.length);
          if (random == index) {
            audio.currentTime = 0;
            audio.play();
          } else {
            this.changeIndex(random);
          }
        }
      });
    },
    changePercent(val) {
      this.audio.currentTime = this.totalSongTime * val;
    },
    formatTime(dt) {
      return formatDuration(dt);
    },
    closePlayer() {
      this.showplayer(false);
    },
    addToFavorite() {
      this.addFavorite();
      this.showMode = "已添加喜欢";
      if (this.layerTimer) {
        clearTimeout(this.layerTimer);
        this.layerTimer = null;
      }
      this.layerTimer = setTimeout(() => {
        this.showMode = "";
      }, 2000);
    },
    cancleFavorite() {
      this.removeFavorite();
      this.showMode = "";
      this.showMode = "已取消喜欢";
      if (this.layerTimer) {
        clearTimeout(this.layerTimer);
        this.layerTimer = null;
      }
      this.layerTimer = setTimeout(() => {
        this.showMode = "";
      }, 2000);
    },
    readComment() {
      this.$router.push({
        name: "comment",
        query: { song: this.currentSong, from: "player" }
      });
      this.showplayer(false);
    },
    changeMode(mode) {
      this.showMode = "";
      if (mode == "list") {
        this.playMode = "loop";
        this.showMode = "单曲循环";
      } else if (mode == "loop") {
        this.playMode = "random";
        this.showMode = "随机播放";
      } else {
        this.playMode = "list";
        this.showMode = "列表循环";
      }
      if (this.layerTimer) {
        clearTimeout(this.layerTimer);
        this.layerTimer = null;
      }
      this.layerTimer = setTimeout(() => {
        this.showMode = "";
      }, 2000);
    },
    changeSong(lr) {
      let index = this.currentSongIndex;
      lr == "prev" ? index-- : index++;
      if (index == -1) {
        index = this.playList.length - 1;
      }
      if (index == this.playList.length) {
        index = 0;
      }
      this.changeIndex(index);
    },
    changePlaying() {
      if (this.audio.paused) {
        this.audio.play();
      } else {
        this.audio.pause();
      }
    },
    songIconSize(x) {
      return `font-size: ${x}rem;`;
    },
    showLyric() {
      this.isShowLyric = !this.isShowLyric;
    },
    async getComment(id) {
      let res = await songComment({ id: id, limit: 1 });
      this.commentCount = res.total;
    },
    async getLyric(id) {
      let res = await songLyric({ id: id });
      if (res.nolyric == true) {
        this.originLyric = ["纯音乐，请欣赏"];
        this.transLyric = [];
      } else {
        this.originLyric = formatLyric(res.lrc.lyric);
        if (res.tlyric.lyric) {
          this.transLyric = formatLyric(res.tlyric.lyric);
        } else {
          this.transLyric = [];
        }
      }
    },
    closeList() {
      this.showPlayList = false;
      this.showMenuList = false;
    },
    ...mapMutations({
      showplayer: "SHOW_PLAYER",
      addFavorite: "ADD_FAVORITE",
      removeFavorite: "REMOVE_FAVORITE",
      changeIndex: "CURRENTSONG_INDEX",
      changeIsPlaying: "IS_PLAYING"
    })
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/mixin.scss";
@import "@/scss/variable.scss";
@include fade-lr;
.player-page {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  color: #f0f0f0;
  background-color: $player-bg;
  .player-header {
    position: absolute;
    top: 0;
    padding: 0 3%;
    width: 94%;
    height: 55px;
    @include flex-center;
    @include split-line($lineLight);
    .icon {
      font-size: 1.2rem;
      font-weight: bold;
    }
    .song,
    .singer {
      width: 100%;
      text-align: center;
      @include textoverflow;
    }
    .singer {
      position: relative;
      top: 5px;
      font-size: 0.7rem;
      .icon {
        font-size: 0.6rem;
        color: darkgray;
      }
    }
  }
  .player-background {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(25px);
    overflow: hidden;
    .player-bgimg {
      position: relative;
      right: 30%;
      width: 160%;
      height: 100%;
      transform: scaleY(0.95);
      filter: opacity(60%);
    }
  }
  .cd-head {
    position: absolute;
    left: 50%;
    top: -62px;
    margin-left: -10px;
    width: 84px;
    z-index: 15;
    transform: rotate(-5deg);
    transition: all 0.4s linear;
  }
  .cd-head-pause {
    top: -88px;
    margin-left: 10px;
    transform: rotate(-40deg);
  }
  .black-cd,
  .lyric-container {
    position: absolute;
    left: 50%;
    width: 280px;
    transform: translateX(-50%);
    transition: all 0.8s;
    font-size: 0.95rem;
    text-align: center;
  }
  .black-cd {
    top: 110px;
    height: 280px;
    border-radius: 50%;
    background: linear-gradient(#222, #111, #222, #111, #222, #111, #222, #111);
    .img-rotate {
      position: absolute;
      left: 10px;
      top: 10px;
      width: 260px;
      height: 260px;
      border-radius: 50%;
      border: 1px solid #000;
      animation: Rotate 10s linear infinite;
      background: linear-gradient(
        #111,
        #333,
        #111,
        #333,
        #111,
        #333,
        #111,
        #333
      );
      .inner-border {
        position: absolute;
        left: 35px;
        top: 35px;
        height: 40px;
        width: 180px;
        height: 180px;
        border-radius: 50%;
        border: 5px solid #000;
        .album-image-container {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          .album-image {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
      }
    }
    .img-paused {
      animation-play-state: paused;
      -webkit-animation-play-state: paused;
      -moz-animation-play-state: paused;
      -o-animation-play-state: paused;
    }
  }
  .lyric-container {
    top: 80px;
    height: 310px;
    overflow-y: scroll;
    .lyric-line {
      color: #b0b0b0;
      margin-bottom: 15px;
    }
    .current-line {
      color: #fff;
    }
  }
  .player-footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    .like-comment {
      position: relative;
      @include flex-center;
      margin: 0 auto;
      padding-bottom: 2%;
      width: 66%;
      .icon {
        font-size: 1.7rem;
      }
      .icon-xihuan {
        color: $theme;
      }
      .comment {
        position: absolute;
        left: 52%;
        top: -10%;
        transform: scale(0.5);
        -webkit-transform: scale(0.5);
      }
    }
    .progress-container {
      @include flex-center;
      padding: 1% 4%;
      height: 20px;
      color: #d0d0d0;
      font-size: 0.8rem;
      .progress-bar {
        margin: 0 auto;
        width: 72%;
      }
      .start-time,
      .end-time {
        display: inline-block;
        width: 10%;
        font-size: 0.7rem;
        text-align: center;
      }
    }
    .mode-menu {
      @include flex-center;
      padding: 1% 4%;
    }
  }
  .msg-layer {
    position: fixed;
    top: 40%;
    left: 0;
    right: 0;
    z-index: 999;
    display: inline-block;
    margin: 0 auto;
    width: fit-content;
    max-width: 80px;
    padding: 10px 30px;
    background-color: rgba(0, 0, 0, 0.7);
    text-align: center;
    border: none;
    border-radius: 2px;
    font-size: 0.9rem;
    color: #f6f6f6;
    opacity: 1;
  }
}
@keyframes Rotate {
  100% {
    transform: rotate(1turn);
  }
}
.layer-enter-active {
  animation: zoomIn 0.5s;
}
.layer-leave-active {
  animation: zoomOut 0.5s;
}
.layer-enter {
  opacity: 1;
}
.layer-leave {
  opacity: 0;
}
@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }
  50% {
    opacity: 1;
  }
}
@keyframes zoomOut {
  from {
    opacity: 1;
  }
  50% {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }
  to {
    opacity: 0;
  }
}
</style>


