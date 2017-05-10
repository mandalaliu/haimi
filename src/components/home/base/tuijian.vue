<template>
  <div class="wrap">
    <!-- 轮播图  -->
   	<box-cont :tuwen_tu="bannerArr"></box-cont>
    <!-- 导航栏  -->
   	<tuwen-nav :nav_tu="navArr"></tuwen-nav>
    <!-- 图文混排  -->
   	<tuwen-title :tuwen_arr="tuwenArr"></tuwen-title>
    <!-- 纵向 图文混排  -->
    <tuwen-navtu :tuwen_arrtu="tuwenArrtu"></tuwen-navtu>
  </div>
</template>
<script>

/*图文混排，swiper滑动*/
import boxCont from '../../base/Box_cont_tuwen'
/*图文 导航栏  */
import tuwenNav from '../../base/tuwen_nav'
/*图文混排  标题  */
import tuwenTitle from '../../base/Box_cont_title'

/*图文混排  纵列nav标题  */
import tuwenNavtu from '../../base/tuwen_navtu'
export default {
  data () {
    return {
      navArr: [],
      bannerArr: [],
      tuwenArr: [],
      tuwenArrtu: []
    }
  },
  components : {
  	boxCont,
  	tuwenNav,
  	tuwenTitle,
    tuwenNavtu
  },
  props:{
  	nav_Id:{
  		type:String,
  		default:'2'
  	}
  },
  created () {
    this.$nextTick(function (){
      /*nav 数据请求 */
      this.getData()
      /*navtu 数据请求 */
      this.getData1()
    })
  },
  methods: {
    getData () {
      let that=this
      this.$http.jsonp('http://m.haimi.com/api/ad-module/get?Alias=index_2',{
          Params:{
            platform:"WAP"
        },
        jsonp:"_callback"
      }).then(function(data){
          //赋值给alllist数组,
         
          this.bannerArr=data.body.data[0].Records
         this.navArr   = data.body.data[1].Records
         this.tuwenArr =  data.body.data
         //console.log(data.body.data)
      })
    },

    getData1 () {
      let that=this
      this.$http.jsonp('http://m.haimi.com/api/nav/advert-team-products?NavID=2&page=1&pageSize=100',{
          Params:{
            platform:"WAP"
        },
        jsonp:"_callback"
      }).then(function(data){
          //赋值给alllist数组,
         //console.log(data.body.data)   
        this.tuwenArrtu =  data.body.data
      })
    }
  }
}




</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
