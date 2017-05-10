<template>
  <a href="javascript:;" class="a"  :class="borderOn(len)" @click="fn(ind,len)">{{name}}</a>
</template>
<!-- 头部 导航栏-->
<script>
export default {
  name: 'header_top',
  props: {
    name : {
      type:String,
      default:""
    },
    ind : {
      type:String,
      default:""
    },
    len : {
      type:Number,
      default:""
    }
  },
  methods : {
    borderOn (ind) {
      if(ind==0){
        return 'on'
      }
    },
    fn (id,ind) {
      var lis = document.querySelectorAll(".a");
      for(var i=0;i<lis.length;i++){
        lis[i].className="a"
      }
     lis[ind].className="on a"  
      if(ind>=1){
        this.$emit("getPages",id);
      }
      else{
        this.$emit("getPages",null)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.a{
  display:block;
  width:4rem;
  text-align: center;
  line-height: 4.4rem;
  border-bottom:0.4rem solid transparent;
  margin:0 1rem;
  color:#000;
  &.on{
    border-bottom:0.4rem solid #000;
  }
}

</style>
