<template>
  <div class="progress-bar" ref="progressBar" @click="handleClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div
        class="progress-btn-wrapper"
        ref="progressBtn"
        @touchstart.prevent="touchStart"
        @touchmove.prevent="touchMove"
        @touchend="touchEnd"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      btnWidth: 0,
      touchObj: {
        inited: false
      }
    };
  },
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  mounted() {
    this.btnWidth = document.getElementsByClassName(
      "progress-btn"
    )[0].clientWidth;
  },
  methods: {
    touchStart(e) {
      this.touchObj.inited = true; //设置touch事件已初始化
      this.touchObj.startX = e.touches[0].pageX; //记录开始滑动的点击位置
      this.touchObj.left = this.$refs.progress.clientWidth; //记录开始滑动时进度条已走过的长度
    },
    touchMove(e) {
      if (!this.touchObj.inited) {
        //若touch事件未初始化，则不执行
        return;
      }
      const moveX = e.touches[0].pageX - this.touchObj.startX; //记录滑动的距离
      const offsetWidth = Math.min(
        //记录偏移值：一般为滑动后进度条的位置
        Math.max(0, this.touchObj.left + moveX),
        this.$refs.progressBar.clientWidth - this.btnWidth
      );
      this.setOffset(offsetWidth); //设置偏移值
    },
    touchEnd(e) {
      this.touchObj.inited = false; //滑动结束，设置touch事件未初始化
      this.triggerPercentChange(); //向父组件传递当前百分比
    },
    //处理直接点击进度条的事件
    handleClick(e) {
      //若点击到了进度条按钮，则不执行
      if (e.target.className === "progress-btn") {
        return;
      }
      this.setOffset(e.offsetX); //设置偏移值
      this.triggerPercentChange();
    },
    //改变进度条已走过的长度
    setOffset(w) {
      this.$refs.progress.style.width = `${w}px`;
      this.$refs.progressBtn.style.transform = `translate3d(${w}px,0,0)`;
    },
    //百分比变化
    triggerPercentChange() {
      const barWidth = this.$refs.progressBar.clientWidth - this.btnWidth;
      const percent = Math.min(1, this.$refs.progress.clientWidth / barWidth);
      this.$emit("percentChange", percent);
    }
  },
  watch: {
    //响应父组件传来的百分比变化
    percent(val, oldVal) {
      if (val > 0 && !this.touchObj.inited) {
        const barWidth = this.$refs.progressBar.clientWidth - this.btnWidth;
        const offsetWidth = barWidth * val;
        this.setOffset(offsetWidth);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/variable.scss";
.progress-bar {
  .bar-inner {
    position: relative;
    height: 0.15rem;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 20px;
    .progress {
      position: absolute;
      height: 100%;
      background: $theme;
    }
    .progress-btn-wrapper {
      position: absolute;
      left: -0.25rem;
      top: -0.4rem;
      .progress-btn {
        position: relative;
        box-sizing: border-box;
        width: 15px;
        height: 15px;
        border: 0.1rem solid $theme;
        border-radius: 50%;
        background: #d0d0d0;
      }
    }
  }
}
</style>
