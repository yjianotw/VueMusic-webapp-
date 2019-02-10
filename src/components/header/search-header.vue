<template>
  <div class="search-header">
    <!-- Logo -->
    <i class="icon iconfont icon-CN_NetEasemusic" v-show="showLogo"></i>
    <!-- 输入框 -->
    <span :class="showLogo?'search-container':'search-container input-width'">
      <i class="icon iconfont icon-Search"></i>
      <input
        type="text"
        v-model="searchKeywords"
        ref="search"
        @click="$router.push('search')"
        class="input"
        placeholder="大家都在搜..."
      >
      <i class="icon iconfont icon-delete" @click="clearKeywords"></i>
    </span>
    <!-- 播放中图标组件 -->
    <playing-icon v-show="showLogo"></playing-icon>
    <!-- 取消按钮 -->
    <span class="back-home" @click="cancleSearch" v-show="showLogo?false:true">取消</span>
  </div>
</template>

<script>
import PlayingIcon from "@/components/icon/playing-icon";
import { mapGetters, mapMutations } from "vuex";
import { setHistory } from "@/utils/utils";
export default {
  components: {
    "playing-icon": PlayingIcon
  },
  computed: {
    searchKeywords: {
      get() {
        return this.$store.state.keyWords;
      },
      set(val) {
        this.changeKeywords(val);
      }
    },
    showLogo() {
      return this.$route.name === "personal" || this.$route.name === "radio"
        ? true
        : false;
    }
  },
  mounted() {
    // 监听输入框回车事件，跳转页面
    this.$refs.search.addEventListener("keypress", e => {
      if (this.searchKeywords && e.keyCode === 13) {
        this.$refs.search.blur();
        this.$router.push("searchresult");
        // 添加搜索记录
        setHistory(this.searchKeywords);
      }
    });
  },
  methods: {
    clearKeywords() {
      this.changeKeywords("");
      this.$router.push("search");
    },
    cancleSearch() {
      this.$router.push("personal");
      this.changeKeywords("");
    },
    ...mapMutations({
      changeKeywords: "KEY_WORDS"
    })
  }
};
</script>


<style lang="scss" scoped>
@import "@/scss/mixin.scss";
@import "@/scss/variable.scss";
.search-header {
  @include header-style;
  color: #fff;
  .search-container {
    position: relative;
    @include flex-center;
    padding: 0 2%;
    width: 74%;
    font-size: 0.8rem;
    border-radius: 20px;
    background: $input-background;
    transition: width 0.5s;
    .input {
      padding: 1px 0;
      width: 86%;
      height: 26px;
      color: #fff;
      border: none;
      background: $input-background;
      caret-color: $theme;
      &::-webkit-input-placeholder {
        height: 20px;
        line-height: 20px;
        color: $input-color;
      }
    }
    i {
      font-size: 0.9rem;
      color: $input-color;
    }
  }
  .input-width {
    width: 84%;
  }
  .iconfont {
    font-size: 1.25rem;
    color: #fff;
  }
}
</style>
