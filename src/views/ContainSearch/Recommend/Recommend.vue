<template>
  <div class="recommend-page">
    <tab-bar :tabs="tabs" :currentIndex="currentIndex" @changeIndex="changeIndex"></tab-bar>
    <div id="children">
      <image-banner></image-banner>
      <router-view/>
    </div>
  </div>
</template>

<script>
import TabBar from "@/components/tab/tab-bar";
import ImageBanner from "@/components/recommend/image-banner";
export default {
  data() {
    return {
      tabs: [
        { name: "个性推荐", path: "personal" },
        { name: "主播电台", path: "radio" }
      ],
      currentIndex: 0
    };
  },
  components: {
    "tab-bar": TabBar,
    "image-banner": ImageBanner
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
.recommend-page {
  #children {
    position: relative;
    top: 36px;
  }
}
</style>



