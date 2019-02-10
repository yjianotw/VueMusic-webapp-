<template>
  <div class="tab-bar">
    <span
      v-for="(tab,index) in tabs"
      :key="index"
      @click="changeIndex(index)"
      :style="`width:${tabWidth}%`"
    >{{tab.name}}</span>
    <span class="tab-underline" :style="`left:${underlineLeft}%`"></span>
  </div>
</template>

<script>
export default {
  props: {
    tabs: {
      type: Array,
      default: function() {
        return [];
      }
    },
    currentIndex: {
      type: Number,
      default: 0
    }
  },
  computed: {
    tabWidth() {
      return 100 / this.tabs.length;
    },
    underlineLeft() {
      return (
        (this.currentIndex * 100) / this.tabs.length +
        (100 / this.tabs.length - 10) / 2
      );
    }
  },
  methods: {
    changeIndex(i) {
      this.$emit("changeIndex", i);
    }
  }
};
</script>


<style lang="scss" scoped>
@import "@/scss/mixin.scss";
@import "@/scss/variable.scss";
.tab-bar {
  position: fixed;
  left: 0;
  right: 0;
  z-index: 8;
  height: 36px;
  @include flex-center;
  font-size: 0.95rem;
  color: #fff;
  text-align: center;
  background: $theme;
  .tab-underline {
    position: absolute;
    bottom: 4px;
    width: 2rem;
    border: 1.5px solid #fff;
    border-radius: 10px;
    transition: left 0.3s;
  }
}
</style>
