<template>
  <div class="footer">
    <!-- 底部导航栏菜单 -->
    <div
      v-for="(nav,index) in navs"
      :key="index"
      class="nav-menu"
      :class="{'current':currentNav===index}"
      @click="changeNav(index)"
    >
      <i :class="nav.icon"></i>
      <p>{{nav.name}}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      navs: [
        { name: "发现", icon: "icon iconfont icon-Music", path: "personal" },
        { name: "视频", icon: "icon iconfont icon-shipin", path: "video" },
        { name: "我的", icon: "icon iconfont icon-music2yinle", path: "mylist" }
      ]
    };
  },
  computed: {
    ...mapGetters({
      currentNav: "currentNav"
    })
  },
  methods: {
    changeNav(i) {
      this.changeKeywords("");
      this.changeCurrentNav(i);
      this.$router.push(this.navs[i].path);
    },
    ...mapMutations({
      changeCurrentNav: "CURRENT_NAV",
      changeKeywords: "KEY_WORDS"
    })
  }
};
</script>


<style lang="scss" scoped>
@import "@/scss/mixin.scss";
@import "@/scss/variable.scss";
.footer {
  position: fixed;
  bottom: 0;
  z-index: 5;
  @include flex-center;
  width: 100%;
  height: 55px;
  opacity: 0.97;
  background: $footer-background;
  .nav-menu {
    position: relative;
    top: 2px;
    width: 50%;
    height: 48px;
    color: $footer-normal;
    font-size: 12px;
    text-align: center;
    p {
      margin-top: 5px;
    }
  }
  .current {
    color: $theme !important;
  }
}
.iconfont {
  font-size: 25px;
}
</style>

