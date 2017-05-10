<template>
  <nav>
    <a href="javascript:;" v-for="m in nav_tu"  active-class="on" exact :key="m.SlideID" ><img :src="m.Picture" alt=""><span>{{m.SlideName}}</span></a>
  </nav>
</template>

<!-- 主体部分-->
<script>
export default {
  name: 'box_cont_tuwen',
  props: {
    nav_tu : {
      type:Array,
      default:function(){
        return
      }
    }/*,
    len:{
      type:Number,
      default:""
    } */ 
  },
  methods : {
    
  },
  components: {
  },
  data () {
    return {
    }
  },
  mounted () {

  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang='scss' scoped>
nav{
  width: 100%;
  display:-webkit-box;
  -webkit-box-align:center;
  -webkit-box-pack:center;
  position: relative;
  bottom:0;
  z-index: 10;
  background: #fff;
  margin-bottom:1rem;
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
    span,img{
      display: block;
      margin:0.4rem 0;
    }
    span{
      font-size: 1.2rem;
    }
    img{
      width:100%;
    }
  }
}
</style>
