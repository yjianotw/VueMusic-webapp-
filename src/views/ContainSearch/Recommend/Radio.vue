<template>
  <div class="radio-page">
    <center-round :menus="menus"></center-round>
  </div>
</template>

<script>
import CenterRound from "@/components/recommend/center-round";
export default {
  data() {
    return {
      menus: [
        { icon: "icon iconfont icon-fenlei", name: "电台分类" },
        { icon: "icon iconfont icon-paixingbang1", name: "电台排行" },
        { icon: "icon iconfont icon-DJ", name: "DI.FM" },
        { icon: "icon iconfont icon-icecream", name: "小冰电台" }
      ]
    };
  },
  components: {
    "center-round": CenterRound
  }
};
</script>

