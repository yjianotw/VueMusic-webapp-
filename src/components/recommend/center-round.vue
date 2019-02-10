<template>
  <div class="center-round">
    <div class="menu" v-for="(menu,index) in menus" :key="index" @click="handleMenuClick(menu)">
      <div class="menu-inner">
        <i :class="menu.icon"></i>
        <span v-if="menu.name==='每日推荐'" class="current-date">{{currentDate}}</span>
      </div>
      <p class="menu-name">{{menu.name}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    menus: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  computed: {
    currentDate() {
      return new Date().getDate();
    }
  },
  methods: {
    handleMenuClick(menu) {
      if (menu.name === "排行榜") {
        this.$router.push("rank");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/mixin.scss";
@import "@/scss/variable.scss";
.center-round {
  @include flex-center;
  padding: 40px 5% 16px 5%;
  @include split-line(#d9d9d9);
  .menu {
    .menu-inner {
      position: relative;
      width: 50px;
      height: 50px;
      color: #fff;
      border-radius: 50%;
      background: #fc4e45;
      i {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: 1.5rem;
      }
      .current-date {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -30%);
        font-size: 0.7rem;
      }
    }
    .menu-name {
      margin-top: 8px;
      font-size: 0.77rem;
      text-align: center;
    }
  }
}
</style>


