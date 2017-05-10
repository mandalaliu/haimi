<template>
  <nav v-if="name.conts" class="nav">
    <a href="javascript:;" v-for="(m,key) in name.conts" :class="[borLef(key),borBot(key,len)]">
      <span>{{m}}</span><i></i>
    </a>
    <a href="javascript:;" v-show="borCol(len)" class="botShow"></a>
  </nav>
</template>

<!-- 主体部分-->
<script>
export default {
  name: 'box_cont_tuwen',
  props: {
    name : {
      type:Object,
      default:function(){
        return
      }
    },
    len:{
      type:Number,
      default:""
    }  
  },
  methods : {
    borCol :function(len){
      if(len%2==0){
        return false 
      }
      else{
        return true
      }
    },
    borLef : function(key){
      if(key%2!=0){
        return "lef"
      } 
    },
    borBot : function(ind,len){
      if(len-ind <=1){
        return "borbot"
      }else if(len%2==0){
        return "borbot"
      }
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
.nav{
  width:100%;
  a{
    float:left;
    width:48%;
    color:#63c578;
    height:4rem;
    line-height:4rem;
    font-size:1.5rem;
    border-top:1px solid #eee;
    display:-webkit-box;
    box-sizing:border-box;
    -webkit-box-pack:justify;
    -webkit-box-align:center;
    span,i{
      display:block;
    }
    i{
      border-right:0.3rem solid #eee;
      border-bottom:0.3rem solid #eee;
      width:1.2rem;
      height:1.2rem;
      overflow:hidden;
      margin-right:1.6rem;
      -webkit-transform:rotate(-45deg);
    }
    &.lef{
      border-left:1px solid #eee;
      span{
        padding-left:1.5rem;
      }
    }

    &.borbot{
      border-bottom:1px solid #eee;
          width: 48%;
    }
    &.botShow{
      border-left:1px solid #eee;
      border-bottom:1px solid #eee; width: 44%;
      span{
        
        display:inline-block;
      }
    }
  }
}
</style>
