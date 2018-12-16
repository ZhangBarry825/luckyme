<template>
  <div class="page">
    <div class="top">
      <transition name="fade">
        <div class="article-title" v-show="displayTitle" transition="fade">{{article.title}}</div>
      </transition>
    </div>
    <div class="content">
      <div class="title">{{article.title}}</div>
      <div class="info">
        <div class="time">
          {{article.update_time}}
        </div>
        <div class="view">
          阅读 {{article.looked}}
        </div>
        <div class="word-num">
          字数 -
        </div>
        <div class="comment">
          评论 <a id="changyan_count_unit" style="text-decoration: none;color: #666">-</a>
        </div>
        <div class="collection">
          <div v-if="isLike" @click="unlikeArticle" class="like-logo" :style="'background-image:url('+likeLogo+')'"></div>
          <div v-if="!isLike" @click="likeArticle" class="like-logo" :style="'background-image:url('+unlikeLogo+')'"></div>
          <a >喜欢 {{article.liked}}</a>
        </div>
      </div>
      <div class="line"></div>
      <div class="detail">
        <div class="content" v-html="article.content"></div>
      </div>
    </div>
    <div class="comment-list">
      <div class="comment-content">
        <div class="title">评论列表</div>
        <div id="SOHUCS" :sid="id"></div>
      </div>
    </div>
    <div class="bottom">
      <div class="list">
        <div class="button">
          <div class="left">相关文章</div>
          <div class="right">
            <a @click="goIndex">返回首页</a>
            <a @click="preArticle">上一篇</a>
            <a @click="nextArticle">下一篇</a>
          </div>
        </div>
        <div class="item" v-for="item in articleList">
          <div class="item-detail">
            <div class="title" @click="goDetail(item)">{{item.title}}</div>
            <div class="description">
              {{item.description}}
            </div>
          </div>
          <div v-if="!item.cover" @click="goDetail(item)" class="pic" :style="'background-image: url('+exampleImg+')'"></div>
          <div class="pic" @click="goDetail(item)" :style="'background-image: url('+GLOBALDATA.serverUrl+item.cover+')'"></div>
        </div>

      </div>
    </div>
    <GoTop></GoTop>
  </div>
</template>

<script>
  import GoTop from '../../components/GoTop'
  import {dataGet} from "../../../plugins/axiosFn";
  import {timeFormat, toTop} from "../../../plugins/Methods";
  export default {
    name   : "Article",
    data() {
      return {
        exampleImg  : require('../../assets/example.png'),
        displayTitle: false,
        id:this.$route.query.id,
        article:{},
        articleList:[],
        likeLogo:require('../../assets/liked.png'),
        unlikeLogo:require('../../assets/unliked.png'),
        isLike:false
      };
    },
    components:{
      GoTop
    },
    methods: {
      likeArticle(){
        dataGet('/api/home/article/likearticle', {
          id:this.id
        }, (data, all) => {
          if(data.code===200){
            this.isLike=true
            this.article.liked+=1
          }
          console.log(data)
        });
      },
      unlikeArticle(){
        dataGet('/api/home/article/unlikearticle', {
          id:this.id
        }, (data, all) => {
          if(data.code===200){
            this.isLike=false
            this.article.liked-=1
          }
        });
      },
      goIndex(){
        let routeData = this.$router.resolve({
          path: '/',
        });
        window.open(routeData.href, '_blank');
      },
      dis() {
        this.displayTitle = !this.displayTitle;
      },
      handleScroll(e){
        if(e.path[1].scrollY<88){
          this.displayTitle=false
        }else {
          this.displayTitle=true
        }
      },
      loadArticle(){
        dataGet('/api/home/article/detailarticle', {
          id:this.id
        }, (data, all) => {
          console.log(data.data)
          data.data.update_time=timeFormat(data.data.update_time)
          this.article=data.data
          document.title='文章 | '+this.article.title
        });
      },
      loadList(){
        dataGet('/api/home/article/listarticle', {
          page_num: 1,
          page_size: 5
        }, (data, all) => {
          if(data.data.articles){
            for(let i=0;i<data.data.articles.length;i++){
              data.data.articles[i].update_time=timeFormat(data.data.articles[i].update_time)
            }
            this.articleList=this.articleList.concat(data.data.articles)
            console.log(this.articleList,89)
          }
        });
      },
      goDetail(row){
        let params={id: row.id}
        let routeData = this.$router.resolve({
          path: '/article',
          query: params,
        });
        window.open(routeData.href, '_blank');
      },
      preArticle(){
        dataGet('/api/home/article/prearticle', {
          id:this.id
        }, (data, all) => {
          this.goDetail(data.data)
        });
      },
      nextArticle(){
        dataGet('/api/home/article/nextarticle', {
          id:this.id
        }, (data, all) => {
          this.goDetail(data.data)
        });
      }
    },
    mounted() {
      window.addEventListener('scroll',this.handleScroll)
      this.loadArticle()
      this.loadList()
    }
  };
</script>

<style scoped lang="less">

  .module-cmt-list{
    display: none;
  }
  .cont-msg-gw{
    display: none;
  }
  .page {
    color: black;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    .fade-enter-active, .fade-leave-active {
      transition: opacity .8s
    }
    .fade-enter, .fade-leave-active {
      opacity: 0
    }

    .top {
      position: fixed;
      width: 100%;
      height: 50px;
      background-color: #fefefe;
      z-index: 5;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      .article-title {
        color: #666;
        font-weight: 500;
        font-size: 14px;
      }
    }
    .top::before {
      content: " ";
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      height: 1px;
      border-top: 1px solid #e5e5e5;
      color: #e5e5e5;
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
      z-index: 2;
    }
    .content {
      margin-top: 100px;
      width: 700px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      /*align-items: center;*/
      .title {
        color: #333;
        font-size: 30px;
        font-weight: 600;
        width: 100%;
      }
      .info {
        margin-top: 20px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        width: 100%;
        color: #666;
        font-size: 13px;
        .time, .view, .word-num, .comment, .collection {
          margin-right: 20px;
        }
        .collection{
          .like-logo{
            width: 18px;
            height: 18px;
            background-repeat: no-repeat;
            background-size: cover;
            float: left;
            cursor: pointer;
          }
          a{
            margin-left: 3px;
            float: left;
          }
        }
      }
      .line {
        width: 100px;
      }
      .line:before {
        content: '';
        height: 1px;
        width: 100px;
        background: #eee;
        display: block;
        margin: 30px auto 30px;
      }
      .detail {
        width: 100%;
        padding: 20px 0;
        .content{
          margin-bottom: 30px;
          font-size: 14px;
          line-height: 2;
          color: #333;
        }
      }
    }
    .comment-list {
      padding-bottom: 50px;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      .comment-content {
        width: 700px;
        .title {
          color: #333;
          font-size: 18px;
        }
      }

    }
    .bottom {
      width: 100%;
      background-color: #fafafa;
      padding-bottom: 50px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      .list {
        width: 700px;
        .button {
          margin-top: 20px;
          width: 100%;
          border-bottom: 1px solid gainsboro;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          .left {
            color: #333;
            font-size: 13px;
            font-style: normal;
          }
          .right {
            color: #666;
            font-size: 14px;
            a {
              margin-left: 14px;
              text-decoration: none;
              color: #666;
              cursor: pointer;
            }
          }
        }
        .item {
          padding: 25px 0 32px;
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          position: relative;
          .item-detail {
            max-width: 500px;
            .title {
              font-size: 24px;
              color: #333;
              line-height: 1.3;
              cursor: pointer;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
            }
            .description {
              margin-top: 10px;
              font-size: 14px;
              color: #666;
              line-height: 1.8;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 3;
              overflow: hidden;
            }
          }
          .pic {
            width: 190px;
            height: 110px;
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center center;
            cursor: pointer;
          }
        }
        .item:after {
          content: " ";
          position: absolute;
          left: 0;
          bottom: 0;
          right: 0;
          height: 1px;
          border-top: 1px solid #e5e5e5;
          color: #e5e5e5;
          -webkit-transform-origin: 0 0;
          transform-origin: 0 0;
          -webkit-transform: scaleY(0.5);
          transform: scaleY(0.5);
          z-index: 2;
        }
      }
    }
  }

</style>

