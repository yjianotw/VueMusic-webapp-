<template>
  <div class="image-container">
    <transition-group tag="ul" name="slide">
      <li
        v-for="img in imgs"
        :key="img.imageUrl"
        class="image-banner"
        v-show="currentImage===imgs.indexOf(img)"
      >
        <img :src="img.imageUrl" class="image">
      </li>
    </transition-group>
    <div class="bullet">
      <span
        v-for="(item,index) in imgs"
        :key="index"
        :class="{'active':currentImage===index}"
        @click="changeImage(index)"
      ></span>
    </div>
  </div>
</template>

<script>
import { getImages } from "@/api/recommend";
export default {
  data() {
    return {
      imgs: [],
      currentImage: 0,
      timer: null
    };
  },
  created() {
    this.getImgae();
    this.autoPlayBanner();
  },
  methods: {
    async getImgae() {
      let res = await getImages();
      this.imgs = res.banners;
    },
    autoPlayBanner() {
      this.timer = setInterval(() => {
        this.currentImage++;
        if (this.currentImage === this.imgs.length) {
          this.currentImage = 0;
        }
      }, 5000);
    },
    changeImage(index) {
      this.currentImage = index;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/mixin.scss";
@import "@/scss/variable.scss";
.image-container {
  position: relative;
  height: 100px;
  background: $theme;
  .image-banner {
    position: absolute;
    left: 2%;
    top: 5px;
    width: 96%;
    height: 120px;
    .image {
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }
  }
  .bullet {
    position: absolute;
    bottom: -25px;
    z-index: 5;
    width: 100%;
    text-align: center;
    span {
      display: inline-block;
      margin-right: 2%;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: #d0d0d0;
    }
    .active {
      background-color: $theme !important;
    }
  }
}
.slide-enter-active {
  transform: translateX(0);
  transition: all 0.8s;
}
.slide-leave-active {
  transform: translateX(-100%);
  opacity: 0;
  transition: all 0.8s;
}
.slide-enter {
  transform: translateX(100%);
}
.slide-leave {
  transform: translateX(0);
}
</style>


