<template>
  <div class="search-result">
    <tab-bar :tabs="tabs" :currentIndex="currentIndex" @changeIndex="changeIndex"></tab-bar>
    <div class="children">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import TabBar from "@/components/tab/tab-bar";
export default {
  data() {
    return {
      tabs: [
        { name: "单曲", path: "songresult" },
        { name: "视频", path: "videoresult" },
        { name: "歌手", path: "singerresult" },
        { name: "专辑", path: "albumresult" },
        { name: "歌单", path: "listresult" }
      ],
      currentIndex: 0
    };
  },
  components: {
    "tab-bar": TabBar
  },
  methods: {
    changeIndex(val) {
      this.currentIndex = val;
      this.$router.push(this.tabs[val].path);
    }
  }
};
</script>

<style lang="scss" scoped>
.search-result {
  .children {
    position: relative;
    top: 36px;
  }
}
</style>

