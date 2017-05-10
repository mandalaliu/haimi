<template>
  <div>
    <div class="top_nav">
      <header class="header">
        <aside class="logo"></aside>
        <aside class="h_cen">
            <!-- 头部 导航 -->
            <slot></slot>
        </aside>
        <aside class="h_btn" ></aside>
      </header>
    </div>
    <div class="back_nav" v-if="async">
        <header class="header">
          <aside class="logo log1"><a href="javascript:;" @click="showSeach($event)" >关闭</a></aside>
          <aside class="h_cen h_cen1">
            <input type="text">
          </aside>
      </header>
      <div class="main">
        <duolie-nav :arr="names" :len="names.length"></duolie-nav>
      </div>
    </div>
  </div>
</template>
<!-- 头部 导航栏-->
<script>
/*头部*/
import duolieNav from './duolie_nav'

export default {
  name: 'header_top',
  props: {
    names:{
      type:Object,
      default:function(){

      }
    }
  },
  components: {
    duolieNav,
   headerTop,
   headerNav
  },
  data () {
    return {
      async:false
    }
  },
  mounted () {

  },
  methods: {
    showLi : function(ind){
      if(ind>3){
        return false
      }
      else{
        return true
      }
    },
    colorText : function(ind){    
      return "color:"+ind
    },
     showSeach: function(){
      this.async=!this.async
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.top_nav{
  position: fixed;
  width:100%;
  top:0;
  background:#fff;
  z-index:11;
}
.header {
  height:4.6rem;
  display:-webkit-box;
  padding:0 1.8rem;
  box-sizing:border-box;
  position:relative;
  &:after{
    content:'';
    height:1px;
    background:#eee;
    width:1000%;
    position:absolute;
    bottom:0;
    left:0;
  }
  aside {
    &.logo{
        width:5rem;
        display:-webkit-box;
        -webkit-box-orient:center;
        -webkit-box-align:center;
        a{
          font-size:1.8rem;
          color:green;
        }
        img{
          display:block;
          width:100%;
        }
    }
    &.h_cen {
      -webkit-box-flex:1;
      margin-left:6.2rem;
      input{
        display: block;
        width:100%;
        background: #eee;
        border:none;
        border-radius: 0.2rem;
        height:4rem;
        outline: none;
      }
    }
    &.h_cen1{
      display:-webkit-box;
      margin-left: 0;
      -webkit-box-align:center;
    }
    &.h_btn{
        width:2.8rem;
        display:-webkit-box;
        -webkit-box-orient:center;
        -webkit-box-align:center;
        img{
          display:block;
          width:100%;
        }
      }
  }
}
.back_nav{
  position: fixed;
  top:0;
  left:0;
  right:0;
  bottom:0;
  background:#fff;
  z-index: 101;
}
</style>
