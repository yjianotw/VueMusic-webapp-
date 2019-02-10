<template>
  <div class="song-result">
    <div v-for="(song,index) in results" :key="index" class="song-container">
      <div class="song-info" @click="playSong(song)">
        <p
          class="song-name"
          v-html="song.name.replace(regexp,`<span style='color: #286db5'>${containWords(song.name)}</span>`)"
        >{{song.name}}</p>
        <p class="song-singer">
          <span
            v-for="(singer,index) in song.artists"
            :key="index"
            v-html="singer.name.replace(regexp,`
            <span style='color: #286db5'>
              ${containWords(singer.name)}
              <span v-if=${index>0} style='color:gray'>/</span>
            </span>
            `)"
          ></span> -
          <span
            v-html="song.name.replace(regexp,`<span style='color: #286db5'>${containWords(song.name)}</span>`)"
          >{{song.name}}</span>
        </p>
        <p
          class="song-alias"
          v-if="song.alias.length>0"
          v-html="song.alias[0].replace(regexp,`<span style='color: #286db5'>${containWords(song.alias[0])}</span>`)"
        >{{song.alias[0]}}</p>
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
    <mask-layer v-show="showMenuList" @closeList="closeList"></mask-layer>
    <menu-layer v-show="showMenuList" :song="checkedSong" :commentCount="commentCount"></menu-layer>
  </div>
</template>

<script>
import MaskLayer from "@/components/mask-layer/mask-layer";
import MenuLayer from "@/components/mask-layer/menu-layer";
import { SearchResult } from "@/api/search";
import { songInfo, songUrl, songComment } from "@/api/song";
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      results: [],
      regexp: null,
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
    ...mapGetters({
      keyWords: "keyWords",
      playList: "playList"
    })
  },
  created() {
    this.regexp = new RegExp(this.keyWords, "gi");
    this.songResults();
  },
  methods: {
    async songResults() {
      if (this.keyWords) {
        let res = await SearchResult({ keywords: this.keyWords, type: 1 });
        this.results = res.result.songs;
      }
    },
    containWords(str) {
      let index = str.toUpperCase().indexOf(this.keyWords.toUpperCase());
      if (index != -1) {
        return str.substr(index, this.keyWords.length);
      }
    },
    playSong(song) {
      this.showPlayer(true);
      this.insertSong(song.id);
    },
    playMV(mvid) {},
    closeList() {
      this.showMenuList = false;
    },
    async getsongInfo(song) {
      this.showMenuList = true;
      this.checkedSong = {
        album: {
          id: song.album.id,
          name: song.album.name,
          imgUrl: song.album.picId
        },
        artists: song.artists.map(item => {
          return {
            id: item.id,
            name: item.name
          };
        }),
        id: song.id,
        mv: song.mvid,
        name: song.name,
        duration: song.duration
      };
      let res = await songComment({ id: song.id, limit: 1 });
      this.commentCount = res.total;
    },
    ...mapMutations({
      showPlayer: "SHOW_PLAYER",
      addPlaylist: "PLAY_LIST"
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
.song-result {
  .song-container {
    position: relative;
    padding: 12px 12px 0 12px;
    @include flex-center;
    @include split-line($lineLight);
    .song-info {
      width: 80%;
      .song-name {
        margin-bottom: 10px;
      }
      .song-singer {
        margin-bottom: 10px;
        font-size: 0.77rem;
        color: gray;
      }
      .song-alias {
        margin-bottom: 10px;
        font-size: 0.77rem;
        color: gray;
      }
    }
    .icon-menu {
      width: 20%;
      @include flex-center;
      .icon-bofang2,
      .icon-gengduo1 {
        font-size: 1.3rem;
        color: #c7c6c6 !important;
      }
      .icon-gengduo1 {
        margin-right: 3px;
      }
    }
  }
}
</style>

