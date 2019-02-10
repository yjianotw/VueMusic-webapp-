<template>
  <div>
    <i class="icon iconfont icon-fanhui" @click="backPrev"></i>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  methods: {
    backPrev() {
      this.$router.go(-1);
      if (this.$route.query.from === "player") {
        this.showPlayer(true);
      }
    },
    ...mapMutations({
      showPlayer: "SHOW_PLAYER"
    })
  }
};
</script>

