<template>
  <transition name="bottom">
    <div class="play-list">
      <div class="title">
        <span>播放列表</span>
        <i class="icon iconfont icon-shanchu" @click="clearList"></i>
      </div>
      <div class="song-list">
        <p v-for="(song,index) in playList" :key="index" class="song">
          <span :class="{'current-song':isCurrentSong(song)}" @click="changeSong(index)">
            <i class="icon iconfont icon-yinliang" v-show="isCurrentSong(song)"></i>
            {{song.name}}
            <small
              v-for="(singer,index) in song.artists"
              :key="index"
              class="singer"
            >
              <span v-if="index>0">/</span>
              <span v-if="index==0">-</span>
              {{singer.name}}
            </small>
          </span>
          <i class="icon iconfont icon-quxiao"></i>
        </p>
      </div>
      <div class="close-container">
        <span class="close" @click="closeList">关闭</span>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  computed: {
    isCurrentSong() {
      return song => song.id == this.playList[this.currentIndex].id;
    },
    ...mapGetters({
      playList: "playList",
      currentIndex: "currentSongIndex"
    })
  },
  methods: {
    clearList() {
      this.clearPlayList([]);
      this.changeIndex(-1);
    },
    closeList() {
      this.$emit("closeList");
    },
    changeSong(i) {
      this.changeIndex(i);
    },
    ...mapMutations({
      clearPlayList: "PLAY_LIST",
      changeIndex: "CURRENTSONG_INDEX"
    })
  }
};
</script>


<style lang="scss" scoped>
@import "@/scss/mixin.scss";
@import "@/scss/variable.scss";
@include fade-b2t;
.play-list {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 20;
  height: 75%;
  border-radius: 15px 15px 0 0;
  background-color: #1d1d1d;
  opacity: 0.95;
  filter: sepia(10%);
  .title {
    padding: 4% 5%;
    @include flex-center;
    @include split-line($lineDark);
    .icon {
      font-size: 1.2rem;
    }
  }
  .song-list {
    margin-left: 3%;
    height: 77%;
    @include split-line($lineDark);
    overflow-y: scroll;
    .song {
      @include flex-center;
      @include split-line($lineDark);
      padding: 3% 5% 3% 0;
      .current-song {
        color: #ddbbbb;
      }
      .singer {
        color: darkgray;
      }
      .icon-quxiao {
        font-size: 1.1rem;
      }
    }
  }
  .close-container {
    position: relative;
    .close {
      position: absolute;
      left: 50%;
      transform: translate(-50%, 77%);
    }
  }
}
</style>
