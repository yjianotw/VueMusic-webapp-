<template>
  <div class="song-list">
    <div class="songlist-cover">
      <div class="background-cover">
        <img :src="listInfo.coverImgUrl" class="image">
      </div>
      <div class="songlist-info">
        <div class="cover-container">
          <img :src="listInfo.coverImgUrl" class="cover">
          <span class="playcount" v-if="!isFavorite">
            <i class="icon iconfont icon-headseterji"></i>
            {{formatPlayCount(listInfo.playCount)}}
          </span>
        </div>
        <div class="info">
          <p class="name">{{listInfo.name}}</p>
          <p class="owner">
            <img :src="listInfo.avatar" class="avatar">
            <span>{{listInfo.userName}}</span>
          </p>
        </div>
      </div>
      <div class="tag">
        标签：
        <span v-for="(tag,index) in listInfo.tags" :key="index">{{tag}}&emsp;</span>
      </div>
    </div>
    <div class="songlist-detail">
      <div class="row">
        <div class="index">
          <i class="icon iconfont icon-bofang"></i>
        </div>
        <div class="playall">
          <div @click="playList(0)">
            <span>播放全部</span>
            <span class="total">(共{{listInfo.total}}首)</span>
          </div>
          <div
            class="mark"
            v-show="!isMarked&&!isFavorite"
            @click="addMarked"
          >＋收藏({{formatPlayCount(listInfo.markedCount)}})</div>
          <div class="marked" v-show="isMarked&&!isFavorite" @click="removeMarked">已收藏</div>
        </div>
      </div>
      <div class="row" v-for="(song,index) in listSongs" :key="index">
        <div class="index">{{index+1}}</div>
        <div class="info">
          <div class="songinfo" @click="playList(index)">
            <p class="name">{{song.name}}</p>
            <p class="singer">
              <span v-for="(singer,index) in song.artists" :key="index">
                <span v-if="index>0">/</span>
                {{singer.name}}
              </span> -
              <span>{{song.album.name}}</span>
            </p>
          </div>
          <div class="icon-menu">
            <span :style="song.mvid==0?'opacity:0':''" @click="playMV(song.mvid)">
              <i class="icon iconfont icon-bofang2"></i>
            </span>
            <span @click="getsongInfo(song)">
              <i class="icon iconfont icon-gengduo1"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
    <mask-layer v-show="showMenuList" @closeList="closeList"></mask-layer>
    <menu-layer v-show="showMenuList" :song="checkedSong" :commentCount="commentCount"></menu-layer>
  </div>
</template>

<script>
import MaskLayer from "@/components/mask-layer/mask-layer";
import MenuLayer from "@/components/mask-layer/menu-layer";
import { mapGetters, mapMutations } from "vuex";
import { ListDetail } from "@/api/songlist";
import { filterSongInfo } from "@/utils/utils";
import { songComment } from "@/api/song";
export default {
  data() {
    return {
      listInfo: {},
      listSongs: [],
      showMenuList: false,
      checkedSong: { album: {}, artists: [], id: -1, mv: 0, name: "无" },
      commentCount: 0
    };
  },
  components: {
    "mask-layer": MaskLayer,
    "menu-layer": MenuLayer
  },
  computed: {
    isFavorite() {
      return this.listInfo.id === "favorite";
    },
    isMarked() {
      return this.markedList.map(item => item.id).includes(this.listInfo.id);
    },
    ...mapGetters({
      favoriteList: "favoriteList",
      markedList: "markedList"
    })
  },
  created() {
    this.getListDetail();
  },
  methods: {
    async getListDetail() {
      const listId = this.$route.query.id;
      if (listId === "favorite") {
        this.listInfo = {
          coverImgUrl: this.favoriteList[0].album.imgUrl,
          name: "我喜欢的音乐",
          id: "favorite",
          playCount: -1,
          markedCount: -1,
          tags: ["我喜欢"],
          avatar:
            "http://p1.music.126.net/QWMV-Ru_6149AKe0mCBXKg==/1420569024374784.jpg",
          userName: "本地用户"
        };
        this.listSongs = this.favoriteList;
      } else {
        let res = await ListDetail({ id: listId });
        let info = res.playlist;
        this.listInfo = {
          coverImgUrl: info.coverImgUrl,
          name: info.name,
          id: info.id,
          playCount: info.playCount,
          markedCount: info.subscribedCount,
          tags: info.tags,
          avatar: info.creator.avatarUrl,
          userName: info.creator.nickname,
          total: info.tracks.length
        };
        this.listSongs = info.tracks.map(item => {
          return filterSongInfo(item);
        });
      }
    },
    playList(index) {
      this.changePlayList(this.listSongs);
      this.changeSongIndex(index);
      this.showPlayer(true);
    },
    playMV() {},
    async getsongInfo(song) {
      this.showMenuList = true;
      this.checkedSong = song;
      let res = await songComment({ id: song.id, limit: 1 });
      this.commentCount = res.total;
    },
    closeList() {
      this.showMenuList = false;
    },
    formatPlayCount(count) {
      if (count > 100000) {
        return `${Math.floor(count / 10000)}万`;
      } else if (count === -1) {
        return "*";
      } else {
        return Math.round(count);
      }
    },
    addMarked() {
      this.add_marked(this.listInfo);
    },
    removeMarked() {
      let i = this.markedList.map(item => item.id).indexOf(this.listInfo.id);
      this.remove_marked(i);
    },
    ...mapMutations({
      changePlayList: "PLAY_LIST",
      changeSongIndex: "CURRENTSONG_INDEX",
      showPlayer: "SHOW_PLAYER",
      changeIsPlaying: "IS_PLAYING",
      add_marked: "ADD_MARKED",
      remove_marked: "REMOVE_MARKED"
    })
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/mixin.scss";
@import "@/scss/variable.scss";
.song-list {
  .songlist-cover {
    position: fixed;
    top: 45px;
    height: 190px;
    left: 0;
    right: 0;
    background-color: #343536;
    .background-cover {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: -1;
      filter: blur(30px);
      overflow: hidden;
      .image {
        position: relative;
        right: 30%;
        width: 160%;
        height: 160px;
        filter: opacity(60%);
      }
    }
    .songlist-info {
      margin-top: 25px;
      padding: 0 5%;
      height: 110px;
      @include flex-center;
      .cover-container {
        position: relative;
        .cover {
          width: 110px;
          height: 110px;
          border-radius: 3px;
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
      }
      .info {
        position: relative;
        width: 60%;
        height: 110px;
        color: #fff;
        .name {
          position: absolute;
          top: 20px;
          font-size: 1.2rem;
        }
        .owner {
          position: absolute;
          bottom: 20px;
          font-size: 0.9rem;
          color: #d0d0d0;
          display: flex;
          align-items: center;
          .avatar {
            width: 1.2rem;
            height: 1.2rem;
            border-radius: 50%;
            margin-right: 6px;
          }
        }
      }
    }
    .tag {
      margin: 3% 5%;
      font-size: 0.9rem;
      color: #f6f6f6;
    }
  }
  .songlist-detail {
    position: relative;
    top: 180px;
    bottom: 55px;
    padding: 0 2% 55px 2%;
    border-radius: 10px 10px 0 0;
    background-color: #fff;
    .row {
      @include flex-center;
      .index {
        width: 10%;
        color: #969696;
        text-align: center;
        .icon {
          font-size: 1.5rem;
        }
      }
      .playall {
        // padding: 4% 0;
        height: 44px;
        width: 90%;
        overflow: hidden;
        @include flex-center;
        @include split-line(#d9d9d9);
        .total {
          color: #969696;
        }
        .mark,
        .marked {
          position: relative;
          top: -1px;
          padding: 0 5%;
          height: 42px;
          line-height: 42px;
          font-size: 0.9rem;
        }
        .mark {
          color: #f6f6f6;
          background: #ec6861;
        }
        .marked {
          color: gray;
          background: #d0d0d0;
        }
      }
      .info {
        padding: 3% 0;
        width: 90%;
        overflow: hidden;
        @include flex-center;
        @include split-line(#d9d9d9);
        .songinfo {
          width: 80%;
          .singer {
            margin-top: 5px;
            font-size: 0.77rem;
            color: #969696;
          }
        }
        .icon-menu {
          padding-right: 2%;
          width: 18%;
          @include flex-center;
          .icon {
            font-size: 1.2rem;
            color: #969696;
          }
        }
      }
    }
  }
}
</style>


