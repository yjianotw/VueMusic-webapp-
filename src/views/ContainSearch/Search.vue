<template>
  <div class="search-page">
    <!-- 搜索关键字为空时显示歌手、热搜、搜索记录等 -->
    <div v-show="!keyWords">
      <div class="hot-singer" @click="$router.push('singerclassify')">
        <strong>
          按歌手搜索
          <i class="icon iconfont icon-qianjin"></i>
        </strong>
        <span class="singer-avatar">
          <img
            v-for="(img,index) in imgs"
            :key="index"
            :src="img.img1v1Url"
            class="avatar"
            :style="`right:${index*5}px`"
          >
        </span>
      </div>
      <div class="hot-search">
        <h4>热门搜索</h4>
        <ul class="hot-wrapper">
          <li
            v-for="(hot,index) in hots"
            :key="index"
            class="hot"
            @click="toSearchResult(hot.first)"
          >
            <span>{{hot.first}}</span>
            <i
              class="icon iconfont icon-hot"
              style="color:#d83f36;font-size:0.9rem"
              v-if="index===0"
            ></i>
          </li>
        </ul>
      </div>
      <div class="search-history">
        <h4>
          搜索历史
          <i class="icon iconfont icon-shanchu" @click="clearHistory"></i>
        </h4>
        <ul class="history-wrapper">
          <li
            v-for="(history,index) in historys"
            :key="index"
            class="history"
            @click="toSearchResult(history)"
          >{{history}}</li>
        </ul>
      </div>
    </div>
    <!-- 搜索关键字不为空时，显示搜索建议 -->
    <div v-show="keyWords">
      <div class="search-keywords" @click="toSearchResult(keyWords)">
        <span>搜索 “{{keyWords}}”</span>
      </div>
      <div
        v-for="(suggest,index) in suggests"
        :key="index"
        class="suggest-container"
        @click="toSearchResult(suggest.name)"
      >
        <i class="icon iconfont icon-Search"></i>
        <span class="suggest-name">{{suggest.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { top3Singer, hotSearch, searchSuggest } from "@/api/search";
import { setHistory } from "@/utils/utils";
export default {
  data() {
    return {
      imgs: [],
      hots: [],
      historys: localStorage.getItem("searchHistory")
        ? JSON.parse(localStorage.getItem("searchHistory"))
        : [],
      suggests: [],
      timer: null
    };
  },
  computed: {
    ...mapGetters({
      keyWords: "keyWords"
    })
  },
  created() {
    this.getSingerAvatar();
    this.getHotsearch();
  },
  methods: {
    async getSingerAvatar() {
      let res = await top3Singer({ offset: 0, limit: 3 });
      this.imgs = res.artists;
    },
    async getHotsearch() {
      let res = await hotSearch();
      this.hots = res.result.hots;
    },
    toSearchResult(keywords) {
      this.changeKeywords(keywords);
      this.$router.push("searchresult");
      setHistory(keywords);
    },
    clearHistory() {
      this.historys = [];
      localStorage.setItem("searchHistory", "");
    },
    ...mapMutations({
      changeKeywords: "KEY_WORDS"
    })
  },
  watch: {
    keyWords: {
      handler: function(val) {
        if (val) {
          // 防抖函数，减少不必要的http请求
          if (this.timer) {
            clearTimeout(this.timer);
          }
          this.timer = setTimeout(async () => {
            let res = await searchSuggest({ keywords: val });
            this.suggests = res.result.songs;
          }, 300);
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/mixin.scss";
@import "@/scss/variable.scss";
.search-page {
  .hot-singer,
  .hot-search,
  .search-history {
    padding: 10px 0 10px 10px;
    @include split-line($lineLight);
  }
  .hot-singer {
    padding: 10px 0 10px 10px;
    @include flex-center;
    .singer-avatar {
      .avatar {
        position: relative;
        width: 28px;
        height: 28px;
        border: 1px solid #fff;
        border-radius: 50%;
      }
    }
  }
  .hot-search,
  .search-history {
    .hot-wrapper,
    .history-wrapper {
      display: flex;
      flex-wrap: wrap;
      margin: 0 5px;
      .hot,
      .history {
        margin: 0 10px 10px 0;
        padding: 8px 15px;
        font-size: 0.85rem;
        color: #303030;
        border-radius: 20px;
        background: #f0f0f0;
      }
    }
    h4 {
      position: relative;
      .icon-shanchu {
        position: absolute;
        top: -5px;
        right: 20px;
        font-size: 1.3rem;
        color: #d0d0d0;
      }
    }
  }
  .search-keywords {
    position: relative;
    padding-left: 2%;
    height: 50px;
    line-height: 50px;
    color: $keywords;
    @include split-line($lineLight);
  }
  .suggest-container {
    height: 44px;
    line-height: 44px;
    .icon-Search {
      padding: 0 2%;
      color: darkgray;
    }
    .suggest-name {
      position: relative;
      display: inline-block;
      width: 90%;
      @include split-line($lineLight);
    }
  }
}
</style>
