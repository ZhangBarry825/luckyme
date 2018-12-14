import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    isPause:false
  },
  mutations:{
    playMusic:state => state.isPause=true,
    pauseMusic:state => state.isPause=false,
  }
})
