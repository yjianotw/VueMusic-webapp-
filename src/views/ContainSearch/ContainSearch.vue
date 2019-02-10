<template>
  <div class="contain-search">
    <search-header></search-header>
    <div id="main">
      <router-view/>
    </div>
  </div>
</template>

<script>
import SearchHeader from "@/components/header/search-header";
import { handleScroll } from "@/utils/utils";
export default {
  components: {
    "search-header": SearchHeader
  },
  mounted() {
    handleScroll("main");
  }
};
</script>
<style lang="scss" scoped>
#main {
  position: absolute;
  top: 45px;
  bottom: 0;
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>

