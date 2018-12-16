<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="aaa">
      <div class="bbb">less is included</div>
    </div>
  </div>
</template>

<script>

  import {dataGet} from '../../plugins/axiosFn.js';
  import { Message } from 'element-ui';
  export default {

    name: 'HelloWorld',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      };
    },
    mounted() {
      dataGet('/api/home/article/lists', {
          type: '赴加生子福利',
          page_num:1,
          page_size:2
      },(data, all)=>{
          //console.log(data)
      });
      Message({message: '欢迎！', type: 'success'});
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .hello{
    width: 100%;
    .aaa{
      display: flex;
      flex-direction: row;
      justify-content: center;
      .bbb{
        width: 100px;
        height: 100px;
        background-color: gainsboro;
      }
    }
  }

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
