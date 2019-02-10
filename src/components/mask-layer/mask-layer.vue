<template>
  <div class="play-list" @click="closeMask"></div>
</template>

<script>
export default {
  methods: {
    closeMask() {
      this.$emit("closeList");
    }
  }
};
</script>


<style lang="scss" scoped>
.play-list {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 15;
  background: rgba(0, 0, 0, 0.5);
}
</style>