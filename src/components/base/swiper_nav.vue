<template>
  <div class="cont">
    <nav  class="liswiper" >
      <a href="javascript:;" :style="styleCol(m)" v-if="key+1 <= len/2 " v-for="(m,key) in names" >{{m.name}}</a>
    </nav>
    <nav  class="liswiper">
      <a href="javascript:;" :style="styleCol(m)" v-if="key+1 >  len/2" v-for="(m,key) in names" >{{m.name}}</a>
    </nav>
  </div>
</template>

<!-- 主体部分-->
<script>
export default {
  name: 'box_cont_tuwen',
  props: {
    names : {
      type:Array,
      default:''
    },
    len:{
      type:Number,
      default:""
    }  
  },
  methods : {
    styleCol : function(n){ 
      return 'color:'+n.col+";border-color:"+n.col
    }
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
.cont{
  overflow-x: auto;
  &::-webkit-scrollbar{
      width:0;
    }
  .liswiper{
      white-space: nowrap;
      font-size: 0;
      margin-left: -5px;
        
    a{
        margin: 0 0 0.8rem 0.8rem;
        font-size: 1.4rem;
        display: inline-block;
        border-radius: 0.25rem;
        border: solid 1px;
        vertical-align: middle;
        height:5rem;
        padding:0 1.6rem;
        line-height:5rem;
        &.on{
            width: 100%;
          display: block;
          height: 1px;
          border: 0;
          margin: 0;
        }
    }
  }
}
</style>
