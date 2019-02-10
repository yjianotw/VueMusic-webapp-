<template>
  <div class="title-header">
    <back-icon v-if="isBackIcon"></back-icon>
    <i class="icon iconfont icon-CN_NetEasemusic" v-if="!isBackIcon"></i>
    <span>
      {{headTitle}}
      <span v-if="headTitle==='评论'">({{comment}})</span>
    </span>
    <playing-icon></playing-icon>
  </div>
</template>

<script>
import BackIcon from "@/components/icon/back-icon";
import PlayingIcon from "@/components/icon/playing-icon";
export default {
  props: {
    headTitle: {
      type: String,
      default: ""
    },
    comment: {
      type: Number,
      default: 0
    }
  },
  components: {
    "back-icon": BackIcon,
    "playing-icon": PlayingIcon
  },
  computed: {
    isBackIcon() {
      if (this.$route.name === "video" || this.$route.name === "mylist") {
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/mixin.scss";
@import "@/scss/variable.scss";
.title-header {
  @include header-style;
  color: #fff;
  .iconfont {
    font-size: 1.25rem;
  }
}
</style>
