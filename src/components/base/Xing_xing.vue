<template>
    <span><i v-for="n in 5" :class="{'on':asyncCls(n,xing_json)}"></i></span>
</template>

<!-- 主体部分-->
<script>

export default {
  name: 'xingxing',
  props: ["xing_json"],
  components: {
  },
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
    asyncCls : function(ind,n){ 
      if(n>=ind){
        return true
      }
      else{
        return false
      }
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang='scss' scoped>
i{
  display:block;
  width:1rem;
  height:1rem;
  background:url(../../public/images/star1.png) no-repeat;
  background-size:cover;
  &.on{
    background:url(../../public/images/star2.png) no-repeat;
    background-size:cover;
  }
}
</style>
