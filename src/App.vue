<template>
  <div id="app" class="wrap">
    <transition name="fade">
      <keep-alive>
        <router-view class="box" v-bind:footer_nav="footerNavs"></router-view>
      </keep-alive>
    </transition>
    <div class="loading-box" v-show="loadingShow"> 
      <div class="loading-css3"> 
        <div class="loader">Loading...</div>
        <div>正在加载</div> 
      </div> 
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  name: 'app',
  components: {
  },
  data () {
    return {
      footerNavs: [
        {'name':'首页',"html_ye":"/","icons":"fa fa-home"},
        {'name':'分类',"html_ye":"/Movie","icons":"fa fa-reorder"},
        {'name':'购物车',"html_ye":"/Books","icons":"fa fa-shopping-cart"},
        {'name':'我的',"html_ye":"/Group","icons":"fa fa-user"}
      ],
      cartLis : this.$store.state.commodityArr
    }
  },
  methods : {
    getMsg () {
      return "av";
    }
  },
  computed : {
    loadingShow () {
     // console.log(this.$store.state.loadingShow)
      return this.$store.state.loadingShow
    }
  },
  mounted () {

  }

}
</script>
<style lang="scss">
@import 'public/css/reset.css';
@import 'lib/swiper/dist/css/swiper.min.css';
@import 'lib/icon/css/font-awesome.min.css';
html,body,.wrap {
  width:100%;
  font-size:10px;
  margin:0;
  position: relative;
  overflow:hidden;
  overflow-y:scroll;
}
a{
	text-decoration: none;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}

.swiper-pagination{
  span{
  }
  .swiper-pagination-bullet{
    background:red;
    border-radius:inherit;
    height:0.2rem;
    margin:0 1rem;
  }
  .swiper-pagination-bullet-active{
    -webkit-animation:suofang 1s   forwards ;
  } 
}

@-webkit-keyframes suofang{
  0%{
    transform: scaleX(1);
    transform-origin:left center;
  }
  100%{
    transform: scaleX(2);

    transform-origin:left center;
  }
}
.tuwen{
  width:100%;
  display:-webkit-box;
  -webkit-box-orient:vertical;
  padding-left:1.8rem;
  box-sizing:border-box;}
.loading-box{position:fixed;z-index:1000;bottom:0;left:0;width:100%;height:100%;background:transparent}.loading-css3{position:fixed;top:50%;left:50%;margin-top:-2rem;margin-left:-1.1rem;padding:.3rem;text-align:center;background:rgba(0,0,0,.65);border-radius:.15rem;z-index:1001;color:#fff;min-width:2.1rem;max-width:5rem}.loading-box .loader{-webkit-animation:loading 1.1s infinite linear;animation:loading 1.1s infinite linear;text-indent:-9999em;border-top:.3em solid hsla(0,0%,100%,.2);border-right:.3em solid hsla(0,0%,100%,.2);border-bottom:.3em solid hsla(0,0%,100%,.2);border-left:.3em solid #fff}.loading-box .loader,.loading-box .loader:after{width:2.5em;height:2.5em;margin:0 auto .125rem;border-radius:50%}@-webkit-keyframes loading{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes loading{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}
.ind_back{
  position:fixed;
  width:100%;
  height:100%;
  background:rgba(0,0,0,0.6);
  top:0;
  left:0;
  z-index:1000;
}
.indA_box{  
  position:fixed;
  width:60%;
  background:#fff;
  border-radius:10px;
  padding:6px 10px;
  max-width: 300px;
  z-index:2000;
  min-height: 12rem;
}
.indA_box1{ 
  position:fixed;
  width:60%;
  border-radius:10px;
  max-width: 300px;
  z-index:2000;
  text-align:center;
  min-height: 12rem;
}

.indA_title{
  height:40px;
  text-align: center;
  font-size:16px;
  font-weight: bold;
  line-height: 40px;
  border-bottom: 1px solid #ccc;
}
.indA_cont{
  padding: 18px 10px 60px 10px;
  text-align: center;
  height:50px;
}
.indA_footer{
  position: absolute;
  bottom:0;
  width:100%;
  height: 40px;
  text-align: center;
  left:0px;

}
.indA_footer button{
  height:30px;
  margin-top:5px;
  display: inline-block;
  border:none;
  border-radius: 6px;
  background:#ccc;

}
.indA_footer .minBtn{
  width:30%;
  margin:0 10px;
}
.indA_footer .maxBtn{
  width:50%;
  margin:0 10px;
}
</style>
