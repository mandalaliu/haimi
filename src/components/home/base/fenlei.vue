<template>
  <div class="wrap">
    <!-- 纵向 图文混排  -->
    <tuwen-navtu :tuwen_arrtu="arr" :tuwen_arrtu1="arr1"></tuwen-navtu>
  </div>
</template>

<script>
/*图文混排  纵列nav标题  */
import tuwenNavtu from '../../base/tuwen_navtu'

export default {
  data () {
    return {
      arr: [],
      arr1: []
    }
  },
  components : {
    tuwenNavtu
  },
  props:{
    nav_Id:{
      type:String,
      default:''
    }
  },
  created () {
    this.$nextTick(function (){
      /*nav 数据请求 */
      this.getData()
      this.getData1()
    })
  },
  watch : {
    nav_Id () {
      this.$nextTick(function (){
        /*nav 数据请求 */
        this.getData()
        this.getData1()
      })
    }
  },
  methods: {
    getData () {
      let that=this
      this.$http.jsonp('http://m.haimi.com/api/nav/advert-team-products?NavID='+this.nav_Id+'&page=1&pageSize=100',{
          Params:{
            platform:"WAP"
        },
        jsonp:"_callback"
      }).then(function(data){
          //赋值给alllist数组,
         // console.log(data)
          this.arr=data.body.data
      })
    },
    getData1 () {
      let that=this
      this.$http.jsonp('http://m.haimi.com/api/ad-module/get?Alias=index_'+this.nav_Id+'&platform=WAP',{
          Params:{
            platform:"WAP"
        },
        jsonp:"_callback"
      }).then(function(data){
          //赋值给alllist数组,
        //  console.log(data)
          this.arr1=data.body.data
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
