<template>
  <div class="top-content">
    <div class="goTop" @click="toTop"></div>
    <div class="top" id="top" @click="toTop">
      <img class="fa top-img" data-depth="0.1" src="../assets/top.png">
    </div>
  </div>
</template>

<script>
  import Parallax from 'parallax-js';
  export default {
    name: "GoTop",
    mounted() {
      let top = document.getElementById('top');
      let parallaxInstance1 = new Parallax(top, {
        relativeInput: true
      });
    },
    methods:{
      toTop() {
        (function smoothscroll() {
          var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
          if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - (currentScroll / 20));
          }
        })();
      },
    }
  }
</script>

<style scoped lang="less">
  .top-content{
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
  }

</style>
