<template>
  <div class="no-search">
    <title-header :headTitle="headTitle"></title-header>
    <div id="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import TitleHeader from "@/components/header/title-header";
import { handleScroll } from "@/utils/utils";
export default {
  data() {
    return {
      titles: {
        video: "视频",
        mylist: "我的音乐",
        singerclassify: "歌手分类",
        songlist: "歌单",
        rank: '排行榜'
      }
    };
  },
  components: {
    "title-header": TitleHeader
  },
  computed: {
    headTitle() {
      for (var key in this.titles) {
        if (this.$route.name === key) {
          return this.titles[key];
        }
      }
    }
  },
  mounted() {
    handleScroll("container");
  }
};
</script>

<style lang="scss" scoped>
#container {
  position: absolute;
  top: 45px;
  bottom: 0;
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>

