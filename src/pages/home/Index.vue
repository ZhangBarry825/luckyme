<template>
  <div class="page">
    <Player style="position: fixed"></Player>
    <div class="scene" id="scene">
      <div class="back-img" id="back-img" data-depth="0.1" :style="'background-image: url('+backImg+')'">
        <div class="img1" data-depth="0.2">
          <img style="width: 100%"  src="../../assets/plane.png">
        </div>
        <div class="img2" data-depth="0.1">
          <img style="width: 100%" src="../../assets/cloud1.png">
          <div class="me me5" :style="'background-image: url('+meList.list5+')'"></div>
        </div>
        <div class="img3" data-depth="0.1">
          <img style="width: 100%" src="../../assets/cloud2.png">
          <div class="me me3" :style="'background-image: url('+meList.list3+')'"></div>
        </div>
        <div class="img4" data-depth="0.3">
          <img style="width: 100%"  src="../../assets/cloud2.png">
          <div class="me me1" :style="'background-image: url('+meList.list1+')'"></div>
        </div>
        <div class="img5" data-depth="0.3">
          <img style="width: 100%"  src="../../assets/cloud2.png">
          <div class="me me6" :style="'background-image: url('+meList.list6+')'"></div>
        </div>
        <!--<div class="img6" data-depth="0.05">-->
          <!--<img style="width: 100%"  src="../../assets/boat.png">-->
        <!--</div>-->
      </div>
    </div>
    <div class="content">
      <div class="line"></div>
      <img class="img_tree" data-depth="0.2" src="../../assets/tree.png">

      <div v-for="(item, index) in articleList" style="z-index: 3">
        <div class="item-right" v-if="index%2==0">
          <div v-if="!item.cover" class="pic" @click="goDetail(item)"
               :style="'background-image: url('+exampleImg+')'"></div>
          <div v-if="item.cover" class="pic" @click="goDetail(item)"
               :style="'background-image: url('+GLOBALDATA.serverUrl+item.cover+')'"></div>
          <div class="detail">
            <div class="time">{{item.update_time}}</div>
            <div class="title" @click="goDetail(item)">{{item.title}}</div>
            <div class="description">
              {{item.description}}
            </div>
            <div class="bottom">
              <div class="comment">
                <img src="../../assets/message.png">
                <a>50</a>
              </div>
              <div class="view">
                <img src="../../assets/eye.png">
                <a>{{item.looked}}</a>
              </div>
              <div class="collection">
                <img src="../../assets/collection.png">
                <a>{{item.liked}}</a>
              </div>
            </div>
          </div>
        </div>
        <div class="item-left" v-if="index%2==1">
          <div class="detail">
            <div class="time">{{item.update_time}}</div>
            <div class="title" @click="goDetail(item)">{{item.title}}</div>
            <div class="description">
              {{item.description}}
            </div>
            <div class="bottom">
              <div class="comment">
                <img src="../../assets/message.png">
                <a>50</a>
              </div>
              <div class="view">
                <img src="../../assets/eye.png">
                <a>{{item.looked}}</a>
              </div>
              <div class="collection">
                <img src="../../assets/collection.png">
                <a>{{item.liked}}</a>
              </div>
            </div>
          </div>
          <div v-if="!item.cover" @click="goDetail(item)" class="pic"
               :style="'background-image: url('+exampleImg+')'"></div>
          <div class="pic" @click="goDetail(item)"
               :style="'background-image: url('+GLOBALDATA.serverUrl+item.cover+')'"></div>
        </div>
      </div>

      <div class="more" @click="loadMore">
        <a v-if="!loading && !noMore">加载更多</a>
        <a v-if="!loading && noMore">已全部加载</a>
        <i v-if="loading" class="fa fa-spinner fa-spin fa-2x fa-fw" aria-hidden="true"></i>
      </div>
    </div>
    <GoTop></GoTop>
  </div>

</template>

<script>
  import Parallax from 'parallax-js';
  import Player from '@/components/Player';
  import {dataGet} from "../../../plugins/axiosFn";
  import {timeFormat} from "../../../plugins/Methods";
  import GoTop from '../../components/GoTop'

  export default {
    name: "Home",
    data() {
      return {
        backImg: require('../../assets/sky.jpg'),
        exampleImg: require('../../assets/example.png'),
        screenWidth: document.documentElement.clientWidth,
        screenHeight: document.documentElement.clientHeight,
        loading: false,
        noMore: false,
        pageNum: 1,
        pageSize: 3,
        allNum: 0,
        articleList: [],
        meList:{
          list1:require('../../assets/me/1.jpg'),
          list2:require('../../assets/me/2.jpg'),
          list3:require('../../assets/me/3.jpg'),
          list4:require('../../assets/me/4.jpg'),
          list5:require('../../assets/me/5.jpg'),
          list6:require('../../assets/me/6.jpg'),
        }
      };
    },
    components: {
      Player,
      GoTop
    },
    methods: {
      loadMore() {
        this.loading = true
        setTimeout(() => {
          dataGet('/api/home/article/listarticle', {
            page_num: this.pageNum + 1,
            page_size: this.pageSize
          }, (data, all) => {
            if (data.data.articles) {
              for (let i = 0; i < data.data.articles.length; i++) {
                data.data.articles[i].update_time = timeFormat(data.data.articles[i].update_time)
              }
              this.articleList = this.articleList.concat(data.data.articles)
              this.pageNum = this.pageNum + 1
              this.allNum += data.data.total
            } else {
              this.noMore = true
            }
            this.loading = false
          });
        }, 500)
      },
      firstLoad() {
        this.loading = true
        setTimeout(() => {
          dataGet('/api/home/article/listarticle', {
            page_num: 1,
            page_size: this.pageSize
          }, (data, all) => {
            if (data.data.articles) {
              for (let i = 0; i < data.data.articles.length; i++) {
                data.data.articles[i].update_time = timeFormat(data.data.articles[i].update_time)
              }
              this.articleList = this.articleList.concat(data.data.articles)
              this.allNum += data.data.total
            } else {
              this.noMore = true
            }
            this.loading = false
          });
        }, 500)
      },
      goDetail(row) {
        console.log(row, 'go')

        let params = {id: row.id}
        let routeData = this.$router.resolve({
          path: '/article',
          query: params,
        });
        window.open(routeData.href, '_blank');
      }
    },
    mounted() {
      $('.scene').height(this.screenHeight);
      $('.scene').width(this.screenWidth);

      $(window).resize(function () {          //当浏览器大小变化时
        // alert($(window).height());          //浏览器时下窗口可视区域高度
        // alert($(document).height());        //浏览器时下窗口文档的高度
        // alert($(document.body).height());   //浏览器时下窗口文档body的高度
        // alert($(document.body).outerHeight(true)); //浏览器时下窗口文档body的总高度 包括border padding margin
        // console.log('浏览器时下窗口可视区域高度:'+$(window).height())
        $('.scene').height($(window).height());
        $('.scene').width($(window).width());
      });

      let scene = document.getElementById('scene');
      let parallaxInstance0 = new Parallax(scene, {
        relativeInput: true
      });
      let back = document.getElementById('back-img');
      let parallaxInstance2 = new Parallax(back, {
        relativeInput: true
      });
      this.firstLoad()
    }
  };
</script>

<style scoped lang="less">
  .page {
    overflow-x: hidden;
    text-align: center;
    width: 100%;
    height: 100%;
    min-width: 1200px;
    background-color: gainsboro;
    .top {
      z-index: 3;
      position: fixed;
      right: 70px;
      bottom: 50px;
      cursor: pointer;
      .top-img {
        height: 100px;
      }
    }
    .goTop {
      z-index: 100;
      position: fixed;
      height: 100px;
      width: 100px;
      right: 50px;
      bottom: 45px;
      cursor: pointer;
    }
    .scene {
      width: 100%;
      height: 100%;
      min-width: 1200px;
      overflow: hidden;

      .back-img {
        padding: 5%;
        box-sizing: border-box;
        margin-top: -5%;
        margin-left: -5%;
        width: 120%;
        height: 120%;
        background-size: auto 100%;
        background-position: center;
        background-repeat: repeat;
        .me{
          margin: 0 auto;
          width: 40%;
          height: 80px;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          /*opacity: 1;*/
          border-radius: 20%;
          z-index: 555;
          position: relative;
        }
        .me:hover{
          opacity: 1;
        }
        .me1{
          width: 40%;
          height: 100px;
          margin-top: -200px;
        }
        .me3{
          width: 30%;
          height: 80px;
          margin-top: -170px;
        }
        .me5{
          width: 25%;
          height: 80px;
          margin-top: -140px;
        }
        .me6{
          width: 60%;
          height: 100px;
          margin-top: -250px;
        }
      }
      .img1 {
        width: 100px;
        height: 100px;
        margin-left: 15%;
        margin-top: 10%;
        z-index: 1;
      }
      .img2 {
        width: 320px;
        height: auto;
        margin-left: 12%;
        margin-top: 28%;
        z-index: 1;
      }
      .img3 {
        width: 250px;
        height: auto;
        margin-left: 50%;
        margin-top: 15%;
      }
      .img4 {
        width: 300px;
        height: auto;
        margin-left: 30%;
        margin-top: 5%;
      }
      .img5 {
        width: 400px;
        height: auto;
        margin-left: 60%;
        margin-top: 20%;
      }
      .img6 {
        width: 300px;
        height: auto;
        margin-left: 53%;
        margin-top: 36.5%;
      }
    }
    .content {
      width: 100%;
      min-width: 1200px;
      background-color: antiquewhite;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      .line {
        z-index: 0;
        width: 0;
        height: 100%;
        border-right: 1px solid gainsboro;
        position: absolute;
      }
      .img_tree {
        height: 300px;
        position: relative;
        top: -200px;
        left: 500px;
      }
      .item-right {
        margin: 100px 100px;
        z-index: 1;
        width: 1200px;
        height: 400px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        .pic {
          width: 60%;
          height: 100%;
          background-color: lightblue;
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center center;
          cursor: pointer;
        }
        .detail {
          width: 40%;
          height: 90%;
          background-color: antiquewhite;
          border: 1px solid gainsboro;
          padding: 50px;
          box-sizing: border-box;
          .time {
            width: 100%;
            text-align: left;
            color: gray;
            font-size: 15px;
          }
          .title {
            width: 100%;
            text-align: left;
            font-size: 22px;
            margin: 10px 0;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
          .title:hover {
            text-decoration: underline;
            cursor: pointer;
          }
          .description {
            width: 100%;
            height: 100px;
            text-align: left;
            font-size: 15px;
            line-height: 1.6;
            color: #616161;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 4;
            overflow: hidden;
          }
          .bottom {
            margin-top: 20px;
            width: 100%;
            height: 55px;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            img {
              width: 18px;
              margin-right: 5px;
            }
            .comment, .view, .collection {
              margin-right: 30px;
              color: grey;
              display: flex;
              align-items: center;
              a {
                overflow: hidden;
              }
            }
          }
        }
      }
      .item-left {
        margin: 100px 100px;
        z-index: 1;
        width: 1200px;
        height: 400px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        .pic {
          width: 60%;
          height: 100%;
          background-color: lightblue;
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center center;
          cursor: pointer;
        }
        .detail {
          width: 40%;
          height: 90%;
          background-color: antiquewhite;
          border: 1px solid gainsboro;
          border-right: 0;
          padding: 50px;
          box-sizing: border-box;
          .time {
            width: 100%;
            text-align: left;
            color: gray;
            font-size: 15px;
          }
          .title {
            width: 100%;
            text-align: left;
            font-size: 22px;
            margin: 10px 0;

            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;

          }
          .title:hover {
            text-decoration: underline;
            cursor: pointer;
          }
          .description {
            width: 100%;
            height: 100px;
            text-align: left;
            font-size: 15px;
            line-height: 1.6;
            color: #616161;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 4;
            overflow: hidden;

          }
          .bottom {
            margin-top: 20px;
            width: 100%;
            height: 55px;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            img {
              width: 18px;
              margin-right: 5px;
            }
            .comment, .view, .collection {
              margin-right: 30px;
              color: grey;
              display: flex;
              align-items: center;
              a {
                overflow: hidden;
              }
            }
          }
        }
      }
      .more {
        margin: 50px 50px;
        z-index: 1;
        width: 200px;
        height: 50px;
        border: 1px solid gainsboro;
        background-color: antiquewhite;
        font-size: 15px;
        color: grey;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-self: center;
        cursor: pointer;
        i {
          margin: 0 auto;
        }
      }
    }
  }
</style>
