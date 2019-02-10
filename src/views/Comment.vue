<template>
  <transition name="fade">
    <div class="comment-page">
      <title-header headTitle="评论" :comment="comments.total"></title-header>
      <div class="main-container">
        <div class="song">
          <div class="song-img">
            <img :src="song.album.imgUrl" class="image">
            <i class="icon iconfont icon-bofang"></i>
          </div>
          <div class="song-info">
            <p class="song-name">{{song.name}}</p>
            <p class="song-singer">
              <span v-for="(singer,index) in song.artists" :key="index">
                <span v-if="index>0">/</span>
                {{singer.name}}
              </span>
            </p>
          </div>
        </div>
        <div class="hot-comment">
          <div class="title">精彩评论</div>
          <div class="comment-container">
            <div
              class="comment-wrapper"
              v-for="(hotcomment,index) in comments.hotComments"
              :key="index"
            >
              <div class="comment-left">
                <img v-lazy="hotcomment.user.avatarUrl" class="avatar">
              </div>
              <div class="comment-right">
                <div class="userlike">
                  <span>
                    <p class="user-name">{{hotcomment.user.nickname}}</p>
                    <p class="comment-time">{{commentTime(hotcomment.time)}}</p>
                  </span>
                  <span class="like">
                    {{hotcomment.likedCount}}
                    <i class="icon iconfont icon-iconfontzhizuobiaozhun44"></i>
                  </span>
                </div>
                <div class="comment-text">{{hotcomment.content}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="normal-comment">
          <div class="title">最新评论</div>
          <div class="comment-container">
            <div class="comment-wrapper" v-for="(comment,index) in comments.comments" :key="index">
              <div class="comment-left">
                <img v-lazy="comment.user.avatarUrl" class="avatar">
              </div>
              <div class="comment-right">
                <div class="userlike">
                  <span>
                    <p class="user-name">{{comment.user.nickname}}</p>
                    <p class="comment-time">{{commentTime(comment.time)}}</p>
                  </span>
                  <span class="like">
                    {{comment.likedCount}}
                    <i class="icon iconfont icon-iconfontzhizuobiaozhun44"></i>
                  </span>
                </div>
                <div class="comment-text">{{comment.content}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import TitleHead from "@/components/header/title-header";
import { songComment } from "@/api/song";
import { formatYMD } from "@/utils/utils";
export default {
  data() {
    return {
      song: this.$route.query.song,
      comments: {}
    };
  },
  components: {
    "title-header": TitleHead
  },
  created() {
    this.getComment();
  },
  methods: {
    async getComment() {
      let res = await songComment({ id: this.song.id });
      this.comments = res;
    },
    commentTime(time) {
      return formatYMD(time);
    }
  }
};
</script>


<style lang="scss" scoped>
@import "@/scss/mixin.scss";
@import "@/scss/variable.scss";
@include fade-lr;
.comment-page {
  height: 100%;
  .main-container {
    position: absolute;
    top: 45px;
    bottom: 0;
    width: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    .song {
      @include flex-center;
      height: 90px;
      margin: 2% 3%;
      .song-img {
        position: relative;
        width: 90px;
        height: 90px;
        .image {
          width: 100%;
          height: 100%;
          border-radius: 4px;
        }
        .icon-bofang {
          position: absolute;
          bottom: 0;
          right: 2px;
          font-size: 1.5rem;
          color: $theme;
        }
      }
      .song-info {
        position: relative;
        width: 70%;
        height: 90px;
        .song-name {
          position: absolute;
          top: 22px;
        }
        .song-singer {
          position: absolute;
          bottom: 22px;
          font-size: 0.77rem;
          color: #286db5;
          @include textoverflow;
        }
      }
    }
    .hot-comment,
    .normal-comment {
      .title {
        padding: 2%;
        font-size: 0.77rem;
        color: #444;
        background: #edeff0;
      }
      .comment-container {
        padding-top: 3%;
        .comment-wrapper {
          padding: 0 3% 3% 3%;
          display: flex;
          .comment-left {
            .avatar {
              height: 36px;
              border-radius: 50%;
            }
          }
          .comment-right {
            padding-left: 2%;
            width: 100%;
            @include split-line(#dbdbdb);
            .userlike {
              margin-bottom: 10px;
              display: flex;
              justify-content: space-between;
              .user-name {
                margin-bottom: 3px;
                font-size: 0.85rem;
                color: #7d7d7e;
              }
              .comment-time {
                font-size: 0.6rem;
                color: #bdbebf;
              }
              .like {
                color: #7d7d7e;
                font-size: 0.75rem;
                .iconfont {
                  position: relative;
                  top: 1px;
                  font-size: 1.2rem;
                }
              }
            }
            .comment-text {
              padding-bottom: 10px;
              line-height: 22px;
              font-size: 0.85rem;
              color: #444;
            }
          }
        }
      }
    }
  }
}
</style>

