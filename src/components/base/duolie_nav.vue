<template>
  <div>
    <nav class="btn_nav">
      <a 
        href="javascript:;"
        :style="widthDu(len,item.col)"
        v-for="(item,key) in arr.nav_top"
      >
        <span>{{item.name}}</span>
        <span>{{item.cont}}</span>
      </a>
    </nav>
    <nav class="nav_bot">
      <a href="javascript:;" v-for="(m,key) in arr.nav_bot" :class="{'on':showLi(key)}"><span>{{m.name}}</span></a>
    </nav>
  </div>
</template>
<!-- 头部 导航栏-->
<script>
export default {
  name: 'header_top',
  props: {
    arr: {
      type:Object,
      default:function(){}
    },
    len: {
      type:String,
      default:''
    }
  },
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
      if(ind%2==0){
        return false
      }
      else{
        return true
      }
    },
    colorText : function(ind){    
      return "color:"+ind
    },
    widthDu :function(len,cols) {
      return 'width:'+(100/3)+'%;color:'+cols
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.btn_nav{
  width:100%;
  a{
    float:left;
    height:10rem;
    display:-webkit-box;
    -webkit-box-align:center;
    -webkit-box-pack:center;
    -webkit-box-orient:vertical;
    span{
      display:block;
      margin:0.4rem 0;
      &:first-child{
        font-size:2.4rem;
      }
      &:last-child{
        font-size:1.2rem;
      }
    }
  }
}
.nav_bot{
  width:100%;
  a{
    float:left;
    width:50%;
    height:4rem;
    border-top:1px solid #eee;
    border-bottom:1px solid #eee;
    display: -webkit-box;
    -webkit-box-align:center;
    -webkit-box-pack:center;
    &.on{
      span{
        margin-right:-1px;
        border-left:1px solid #ccc;
      }
    }
    span{
        display:block;
        width:100%;
        text-align: center;
        font-size: 1.2rem;
        color:green;
    }
  }
}
</style>
