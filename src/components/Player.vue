<template>
    <div class="content-player">
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
                musicMp3:this.GLOBALDATA.serverUrl+'static/music/girl.mp3',
                musicOgg:this.GLOBALDATA.serverUrl+'static/music/girl.ogg',
              },
              {
                musicMp3:this.GLOBALDATA.serverUrl+'static/music/PlanetFall.mp3',
                musicOgg:this.GLOBALDATA.serverUrl+'static/music/PlanetFall.ogg',
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
        // setTimeout(()=>{
        //   this.start()
        // },6000)
      }
    }
</script>

<style scoped lang="less">
  .content-player{
    display: block;
    width: 100%;
    z-index: 5;
  }
.logo{
  i{
    cursor: pointer;
  }
}
</style>
