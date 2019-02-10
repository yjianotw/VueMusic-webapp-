<template>
  <transition name="bottom">
    <div id="menu-layer">
      <div class="title">
        <div>
          <p class="song-name">歌曲 : {{song.name}}</p>
          <p class="singer-name">
            歌手 :
            <span v-for="(singer,index) in song.artists" :key="index">
              <span v-if="index>0">/</span>
              {{singer.name}}
            </span>
          </p>
        </div>
        <i class="icon iconfont icon-CN_NetEasemusic" style="font-size:1.6rem"></i>
      </div>
      <div class="song-menu">
        <!-- 添加到播放列表 -->
        <div class="menu" @click="addToPlayList">
          <div class="icon">
            <i class="icon iconfont icon-addfile" style="font-size:1.4rem"></i>
          </div>
          <div class="text" :class="{'disable-click':isInList}">添加到播放列表</div>
        </div>
        <!-- 相似推荐 -->
        <div class="menu" @click="findSimilar">
          <div class="icon">
            <i class="icon iconfont icon-Music-Note" style="font-size:1.4rem"></i>
          </div>
          <div class="text">相似推荐</div>
        </div>
        <!-- 评论 -->
        <div class="menu">
          <div class="icon">
            <i class="icon iconfont icon-yuanfucengpinglun" style="font-size:1.4rem"></i>
          </div>
          <div class="text">评论({{commentCount}})</div>
        </div>
        <!-- 分享 -->
        <div class="menu">
          <div class="icon">
            <i class="icon iconfont icon-iconfontfenxiang2" style="font-size:1rem"></i>
          </div>
          <div class="text">分享</div>
        </div>
        <!-- 歌手 -->
        <div class="menu">
          <div class="icon">
            <i class="icon iconfont icon-geshou" style="font-size:1.4rem"></i>
          </div>
          <div class="text">
            歌手:
            <span v-for="(singer,index) in song.artists" :key="index">
              <span v-if="index>0">/</span>
              {{singer.name}}
            </span>
          </div>
        </div>
        <!-- 专辑 -->
        <div class="menu">
          <div class="icon">
            <i class="icon iconfont icon-zhuanji" style="font-size:1.2rem"></i>
          </div>
          <div class="text">专辑: {{song.album.name}}</div>
        </div>
        <!-- 查看视频 -->
        <div class="menu">
          <div class="icon">
            <i class="icon iconfont icon-bofang1" style="font-size:1.2rem"></i>
          </div>
          <div class="text" :class="{'disable-click':isNoMV}">查看视频</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  props: {
    song: {
      type: Object,
      default: {}
    },
    commentCount: {
      type: Number,
      default: 0
    }
  },
  computed: {
    isInList() {
      return this.playList.includes(this.song) ? true : false;
    },
    isNoMV() {
      return this.song.mv == 0;
    },
    ...mapGetters({
      playList: "playList"
    })
  },
  mounted() {
    let layer = document.getElementById("menu-layer");
    layer.addEventListener("touchmove", e => {
      e.preventDefault();
    });
  },
  methods: {
    addToPlayList() {
      if (this.isInList) return;
      this.addSong(this.song.id);
    },
    findSimilar() {
      //相似推荐
    },
    ...mapActions({
      addSong: "addSong"
    })
  }
};
</script>


<style lang="scss" scoped>
@import "@/scss/mixin.scss";
@import "@/scss/variable.scss";
@include fade-b2t;
#menu-layer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 20;
  height: 72%;
  border-radius: 15px 15px 0 0;
  background-color: #1d1d1d;
  opacity: 0.95;
  color: #f6f6f6;
  filter: sepia(10%);
  .title {
    padding: 3% 5% 3% 3%;
    @include flex-center;
    @include split-line($lineDark);
    .song-name {
      font-size: 0.9rem;
    }
    .singer-name {
      margin-top: 5px;
      font-size: 0.77rem;
      color: darkgray;
    }
  }
  .song-menu {
    height: 85%;
    overflow-y: scroll;
    .menu {
      @include flex-center;
      .icon {
        width: 10%;
        text-align: center;
      }
      .text {
        padding: 4% 0;
        width: 90%;
        overflow: hidden;
        @include split-line($lineDark);
      }
    }
  }
}
.icon {
  color: #ddbbbb;
}
.disable-click {
  color: gray;
}
</style>

