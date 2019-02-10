<template>
  <div class="mylist-page">
    <div class="favorite">
      <div class="title">
        <i class="icon iconfont icon-music2yinle"></i>
        我喜欢
      </div>
      <div class="favorite-list" @click="toFavoriteDetail">
        <div class="cover-image">
          <img :src="imgUrl" class="image">
          <i class="icon iconfont icon-xihuan-xianxing"></i>
        </div>
        <div class="short-info">
          <p class="list-name">我喜欢的音乐</p>
          <p class="list-owner">共{{favoriteList.length}}首</p>
        </div>
      </div>
    </div>
    <div class="marked">
      <div class="title">
        <i class="icon iconfont icon-music2yinle"></i>
        我收藏的歌单
      </div>
      <div
        class="marked-list"
        v-for="(list,index) in markedList"
        :key="index"
        @click="toSongList(list.id)"
      >
        <div class="cover-image">
          <img :src="list.coverImgUrl" class="image">
        </div>
        <div class="short-info">
          <p class="list-name">{{list.name}}</p>
          <p class="list-owner">共{{list.total}}首，by&nbsp;{{list.userName}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    imgUrl() {
      if (this.favoriteList.length > 0) {
        return this.favoriteList[0].album.imgUrl;
      } else {
        return "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2300058128,1452528259&fm=26&gp=0.jpg";
      }
    },
    ...mapGetters({
      favoriteList: "favoriteList",
      markedList: "markedList"
    })
  },
  methods: {
    toFavoriteDetail() {
      if (this.favoriteList.length > 0) {
        this.$router.push({
          name: "songlist",
          query: { id: "favorite" }
        });
      }
    },
    toSongList(id) {
      this.$router.push({
        name: "songlist",
        query: { id: id }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/mixin.scss";
@import "@/scss/variable.scss";
.favorite,
.marked {
  .title {
    padding: 2%;
    font-size: 0.77rem;
    color: #444;
    background: #edeff0;
    .icon {
      font-size: 0.77rem;
    }
  }
  .favorite-list,
  .marked-list {
    padding: 1% 2%;
    display: flex;
    align-items: center;
    .cover-image {
      position: relative;
      width: 70px;
      height: 70px;
      border-radius: 3px;
      background: rgba(0, 0, 0, 0.8);
      .image {
        width: 100%;
        height: 100%;
        opacity: 0.5;
      }
      .icon {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        color: #f6f6f6;
        font-size: 3rem;
      }
    }
    .short-info {
      padding: 0 3%;
      .list-owner {
        margin-top: 5px;
        font-size: 0.8rem;
        color: #7d7d7e;
      }
    }
  }
}
</style>

