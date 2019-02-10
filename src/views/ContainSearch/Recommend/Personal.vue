<template>
  <div class="personal">
    <center-round :menus="menus"></center-round>
    <!-- 推荐歌单 -->
    <div class="recommend song-list">
      <h3>
        推荐歌单
        <i class="icon iconfont icon-qianjin"></i>
      </h3>
      <div class="outer">
        <div
          class="inner"
          v-for="(list,index) in songLists"
          :key="index"
          @click="toSongList(list.id)"
        >
          <span class="playcount">
            <i class="icon iconfont icon-headseterji"></i>
            {{formatPlayCount(list.playCount)}}
          </span>
          <img v-lazy="list.picUrl" class="image">
          <span class="text">{{list.name}}</span>
        </div>
      </div>
    </div>
    <!-- 最新音乐 -->
    <div class="recommend new-song">
      <h3>
        最新音乐
        <i class="icon iconfont icon-qianjin"></i>
      </h3>
      <div class="outer">
        <div class="inner" v-for="(list,index) in newSongs" :key="index" @click="playSong(list.id)">
          <img v-lazy="list.song.album.picUrl" class="image">
          <span class="text">{{list.name}}</span>
        </div>
      </div>
    </div>
    <!-- 推荐电台 -->
    <div class="recommend radio">
      <h3>
        推荐电台
        <i class="icon iconfont icon-qianjin"></i>
      </h3>
      <div class="outer">
        <div class="inner" v-for="(list,index) in radios" :key="index">
          <img v-lazy="list.picUrl" class="image">
          <span class="text">{{list.name}}</span>
        </div>
      </div>
    </div>
    <!-- 推荐MV -->
    <div class="mv">
      <h3>
        推荐MV
        <i class="icon iconfont icon-qianjin"></i>
      </h3>
      <div class="outer">
        <div class="inner" v-for="(list,index) in mvs" :key="index">
          <img v-lazy="list.picUrl" class="image">
          <i class="icon iconfont icon-bofang3 play"></i>
          <div class="info">
            <div class="text">《{{list.name}}》- {{list.artistName}}</div>
            <div class="duration">
              <i class="icon iconfont icon-ziyuanldpi"></i>
              {{formatVideoTime(list.duration)}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 独家放送 -->
    <div class="private">
      <h3>
        独家放送
        <i class="icon iconfont icon-qianjin"></i>
      </h3>
      <div class="outer">
        <div class="inner" v-for="(list,index) in privates" :key="index">
          <img v-lazy="list.picUrl" class="image">
          <span class="text">{{list.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CenterRound from "@/components/recommend/center-round";
import {
  SongList,
  NewSongs,
  Radios,
  MVs,
  PrivateContent,
  PersonalFM
} from "@/api/recommend";
import { formatDuration } from "@/utils/utils";
import { mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      menus: [
        { icon: "icon iconfont icon-Radio-", name: "私人FM" },
        { icon: "icon iconfont icon-calendar-o", name: "每日推荐" },
        { icon: "icon iconfont icon-bofangliebiao", name: "歌单" },
        { icon: "icon iconfont icon-paixingbang", name: "排行榜" }
      ],
      songLists: [],
      newSongs: [],
      radios: [],
      mvs: [],
      privates: []
    };
  },
  components: {
    "center-round": CenterRound
  },
  created() {
    this.getSongList();
    this.getNewSongs();
    this.getRadios();
    this.getMvs();
    this.getPrivate();
  },
  methods: {
    async getSongList() {
      let res = await SongList();
      this.songLists = res.result;
    },
    async getNewSongs() {
      let res = await NewSongs();
      this.newSongs = res.result;
    },
    async getRadios() {
      let res = await Radios();
      this.radios = res.result;
    },
    async getMvs() {
      let res = await MVs();
      this.mvs = res.result;
    },
    async getPrivate() {
      let res = await PrivateContent();
      this.privates = res.result;
    },
    formatPlayCount(count) {
      if (count > 100000) {
        return `${Math.floor(count / 10000)}万`;
      } else {
        return Math.round(count);
      }
    },
    formatVideoTime(dt) {
      return formatDuration(Math.round(dt / 1000));
    },
    toSongList(id) {
      this.$router.push({
        name: "songlist",
        query: { id: id }
      });
    },
    playSong(id) {
      this.showPlayer(true);
      this.insertSong(id);
    },
    ...mapMutations({
      showPlayer: "SHOW_PLAYER",
    }),
    ...mapActions({
      insertSong: "insertSong"
    })
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/mixin.scss";
@import "@/scss/variable.scss";
.recommend {
  padding: 0 2%;
  .outer {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .inner {
      position: relative;
      width: 32.5%;
      &::before {
        content: "";
        padding-top: 100%;
        display: block;
      }
      .playcount {
        position: absolute;
        top: 5px;
        right: 5px;
        z-index: 5;
        font-size: 0.7rem;
        color: #f6f6f6;
        .icon {
          font-size: 0.7rem;
        }
      }
      .image {
        position: absolute;
        top: 0;
        width: 100%;
        border-radius: 4px;
      }
      .text {
        display: -webkit-box;
        line-clamp: 2;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        margin: 5px 0 12px 0;
        font-size: 0.8rem;
        color: #444;
        line-height: 1rem;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
.mv,
.private {
  padding: 0 2%;
  .outer {
    .inner {
      position: relative;
      width: 100%;
      margin-bottom: 10px;
      .image {
        width: 100%;
        border-radius: 3px;
      }
      .play {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: 2.2rem;
        color: #ddd9d9;
        opacity: 0.7;
      }
      .info {
        position: absolute;
        bottom: 10px;
        width: 100%;
        @include flex-center;
        color: #f6f6f6;
        .text {
          width: 77%;
        }
        .duration {
          padding-right: 3%;
          width: 20%;
          font-size: 0.7rem;
          text-align: right;
          .icon {
            font-size: 0.7rem;
          }
        }
      }
    }
  }
}
.private {
  .text {
    font-size: 0.9rem;
    color: #444;
  }
}
</style>


