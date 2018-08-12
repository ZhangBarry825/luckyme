<template>
  <div class="page">
    <div class="scene" id="scene">
      <div class="back-img" id="back-img" data-depth="0.1" :style="'background-image: url('+backImg+')'">
        <img class="img1" data-depth="0.2" src="../../assets/plane.png">
      </div>
    </div>
    <div class="content">
      <div class="line"></div>
      <img class="img_tree" data-depth="0.2" src="../../assets/tree.png">
      <div class="item-right">
        <div class="pic" :style="'background-image: url('+exampleImg+')'"></div>
        <div class="detail">
          <div class="time">三月 31，2018</div>
          <div class="title">终有弱水替沧海，再把相思寄巫山</div>
          <div class="description">
            孤独伴随着夜晚沮丧的泪水。
            换一个思维过这开心的生活。
          </div>
          <div class="bottom">
            <div class="comment">
              <img src="../../assets/message.png">
              <a>50</a>
            </div>
            <div class="view">
              <img src="../../assets/eye.png">
              <a>50000</a>
            </div>
            <div class="collection">
              <img src="../../assets/collection.png">
              <a>50</a>
            </div>
          </div>
        </div>
      </div>
      <div class="item-left">
        <div class="detail">
          <div class="time">三月 31，2018</div>
          <div class="title">终有弱水替沧海，再把相思寄巫山</div>
          <div class="description">
            孤独伴随着夜晚沮丧的泪水。
            换一个思维过这开心的生活。
          </div>
          <div class="bottom">
            <div class="comment">
              <img src="../../assets/message.png">
              <a>50</a>
            </div>
            <div class="view">
              <img src="../../assets/eye.png">
              <a>50000</a>
            </div>
            <div class="collection">
              <img src="../../assets/collection.png">
              <a>50</a>
            </div>
          </div>
        </div>
        <div class="pic" :style="'background-image: url('+exampleImg+')'"></div>
      </div>
      <div class="more">
        加载更多
      </div>
    </div>
    <div class="top" id="top" @click="toTop">
      <!--<img class="top-img" data-depth="0.1"  src="../../assets/top.png">-->
    </div>
  </div>

</template>

<script>
  import Parallax from 'parallax-js';

  export default {
    name   : "Home",
    data() {
      return {
        backImg     : require('../../assets/sky.jpg'),
        exampleImg  : require('../../assets/example.png'),
        screenWidth : document.documentElement.clientWidth,
        screenHeight: document.documentElement.clientHeight,
      };
    },
    methods: {
      toTop() {
        console.log('hahah');
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }
    },
    mounted() {
      let that = this;
      let scene = document.getElementById('scene');
      let parallaxInstance0 = new Parallax(scene, {
        relativeInput: true
      });

      let top = document.getElementById('top');
      let parallaxInstance1 = new Parallax(top, {
        relativeInput: true
      });

      let back = document.getElementById('back-img');
      let parallaxInstance2 = new Parallax(back, {
        relativeInput: true
      });
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

    }
  };
</script>

<style scoped lang="less">
  .page {
    overflow-x: hidden;
    text-align: center;
    width: 100%;
    height: 100%;
    background-color: gainsboro;
    .top {
      z-index: 3;
      position: fixed;
      right: 50px;
      top: 50px;
      cursor: pointer;
      .top-img {
        height: 100px;
      }
    }
    .scene {
      width: 100%;
      height: 100%;
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
      }
      .img1 {
        width: 100px;
        height: 100px;
        margin-left: 300px;
        margin-top: 200px;
      }
    }
    .content {
      width: 100%;
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
      .more{
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
      }
    }
  }
</style>
