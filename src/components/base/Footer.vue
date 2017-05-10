<template>
  <footer class="footer">
    <nav>
      <router-link href="javascript:;" v-for="m in footer_nav" :to="m.html_ye" active-class="on" exact :key="m.name" ><i :class="m.icons"></i><span>{{m.name}}</span></router-link>
    </nav>
  </footer>
</template>
<!-- 头部 导航栏-->
<script>
export default {
  name: 'header_top',
  props: ['footer_nav'],
  components: {
  },
  data () {
    return {
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.footer{
  width:100%;
  height:4.6rem;
  position: fixed;
  bottom:0;
  z-index: 10;
  background: #fff;
  nav{
    width: 100%;
    height: 4.6rem;
    position:relative;
    display:-webkit-box;
    -webkit-box-align:center;
    -webkit-box-pack:center;
    &:before{
      content:'';
      height:1px;
      background:#eee;
      width:1000%;
      position:absolute;
      top:0;
      left:0;
    }
    a{
      display: block;
      width:0;
      -webkit-box-flex:1;
      display:-webkit-box;
      -webkit-box-align:center;
      -webkit-box-pack:center;
      -webkit-box-orient:vertical;
      color:#000;
      &.on{
        color:red;
      }
      span{
        display: block;
        font-size: 1.2rem;
      }
      i{
        display: block;
        font-size:2rem;
        margin-bottom:0.2rem;
      }
    }
  }
}
</style>
