<template>
  <div class="wrap">
    <header class="header">
      <nav class="header_nav">
        <a href="javascript:;" :class="key=='0'?'on':''" v-for="(m,key) in arrs" @click="fn(key)">{{m.name}}</a>
      </nav>
    </header>
    <main class="main">
      <component v-bind:is="currentView" >      
      </component>
    </main>
    <footer-nav v-bind:footer_nav="footer_nav"></footer-nav>
  </div>
</template>

<script>
 /*主体 内容*/
import brand from './pase/brand'
import fenlei from './pase/fenlei'
/*nav 页脚*/
import footerNav from '../base/Footer'
import { mapState } from 'vuex'

export default {
  name: 'hello',
  props:['footer_nav'],
  components: {
    footerNav,
    fenlei,
    brand
  },
  data () {
    return {
      arrs:[
        {'name':"分类"},
        {'name':"品牌"}
      ],
      currentView: 'fenlei'
    }
  },
  mounted () {
    
  },
  methods: { 
    fn (key) {
      var nav = document.querySelector(".header_nav"),
          lis = nav.querySelectorAll("a")
         // console.log(lis)
          for(var i=0;i<lis.length;i++){
            lis[i].className=''
          }
          lis[key].className='on'

      if(key==0){
        this.currentView=fenlei
      }
      else{
        this.currentView=brand
      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.header{
  position: relative;
  .header_nav{
    height:4.4rem;
    width:100%;
    display: -webkit-box;
    -webkit-box-pack:center;
    -webkit-box-align:center;
    &:after{
        content:'';
        height:1px;
        background:#eee;
        width:1000%;
        position:absolute;
        bottom:0;
        left:0;
      }
    a{
      display: block;
      color:#000;
      line-height: 3rem;
      margin:0 2rem;
      font-size: 1.2rem;
      border-bottom: transparent 1px solid;
      &.on{
      border-bottom:1px solid #000;
      }
    }
  }
}

</style>
