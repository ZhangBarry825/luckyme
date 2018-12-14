<template>
    <div class="content">

      <audio  id="player" autoplay @ended="ended">
        <source :src="musicMp3" type="audio/mp3" id="mp3">
        <source :src="musicOgg" type="audio/ogg" id="ogg">
        您的浏览器不支持 audio 元素。
      </audio>
      <div class="logo">
        <i class="fa fa-play" @click="start" v-if="isPause"></i>
        <i class="fa fa-pause" @click="stop" v-if="!isPause"></i>
        <i class="fa fa-step-forward" @click="ended"></i>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Player",
      data(){
          return{
            musicMp3:'',
            musicOgg:'',
            musicList:[
              {
                musicMp3:require('../assets/mp3/girl.mp3'),
                musicOgg:require('../assets/mp3/girl.ogg'),
              },
              {
                musicMp3:require('../assets/mp3/PlanetFall.mp3'),
                musicOgg:require('../assets/mp3/PlanetFall.ogg'),
              },
            ],
            nowMusic:1,
            isPause:false
          }
      },
      methods:{
        start(){
          let player=document.getElementById('player')
          player.play()
          this.isPause=player.paused
        },
        stop(){
          let player=document.getElementById('player')
          player.pause()
          this.isPause=player.paused
        },
        load(){
          let player=document.getElementById('player')
          player.load()
        },
        ended(){
          if(this.nowMusic<this.musicList.length){
            this.nowMusic+=1
            this.musicMp3 = this.musicList[this.nowMusic-1].musicMp3
            this.musicOgg  = this.musicList[this.nowMusic-1].musicOgg
          }else {
            this.nowMusic=1
            this.musicMp3 = this.musicList[this.nowMusic-1].musicMp3
            this.musicOgg  = this.musicList[this.nowMusic-1].musicOgg
          }
          this.load()
          this.isPause=false
        },
      },
      mounted(){
          this.musicMp3=this.musicList[0].musicMp3
          this.musicOgg=this.musicList[0].musicOgg
      }
    }
</script>

<style scoped lang="less">

</style>
