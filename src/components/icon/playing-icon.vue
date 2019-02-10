<template>
  <div>
    <img src="@/assets/not-playing.jpg" class="not-playing" @click="toPlayer" v-show="!isPlaying">
    <img src="@/assets/playing.svg" class="is-playing" @click="toPlayer" v-show="isPlaying">
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  computed: {
    ...mapGetters({
      isPlaying: "isPlaying"
    })
  },
  methods: {
    toPlayer() {
      this.showplayer(true);
    },
    ...mapMutations({
      showplayer: "SHOW_PLAYER"
    })
  }
};
</script>

<style lang="scss" scoped>
.not-playing {
  height: 1.2rem;
}
.is-playing {
  height: 1.6rem;
  position: relative;
  top: 2px;
}
</style>
