<template>
  <div id="app">
    <router-view/>
    <the-player></the-player>
  </div>
</template>

<script>
import Player from "@/components/player/Player";
export default {
  components: {
    "the-player": Player
  },
  created() {
    this.storeTolocalStorage();
  },
  methods: {
    /**
     * 在根页面被创建时调用，将vuex中的状态和数据存到localStorage中
     * 刷新页面时，再将localStorage中的状态和数据赋给vuex，解决刷新后数据丢失的问题
     */
    storeTolocalStorage() {
      let that = this;
      localStorage.getItem("vueMusicStore") &&
        that.$store.replaceState(
          Object.assign(
            that.$store.state,
            JSON.parse(localStorage.getItem("vueMusicStore"))
          )
        );
      window.addEventListener("beforeunload", () => {
        that.$store.commit("CURRENT_NAV", 0);
        that.$store.commit("SHOW_PLAYER", false);
        that.$store.commit("IS_PLAYING", false);
        that.$store.commit("KEY_WORDS", "");
        localStorage.setItem(
          "vueMusicStore",
          JSON.stringify(that.$store.state)
        );
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/normalize.scss";
@import "@/scss/custom.scss";
#app {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
