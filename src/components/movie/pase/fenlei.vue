<template>
  <div class="wrap">
    <!-- 一张大图  -->
    <section class="tu_one" v-for="m in arr" v-if="m.Channel['Type']=='Col1ImageOnly'">
      <img :src="item.Picture" v-for="item in m.Records" :key="item.SlideID">
    </section>
    <!-- nav 导航分类  -->
    <section class="nav_text" v-else-if="m.Channel['Type']=='ColNWithTitleAndBorder'">
      <nav>
        <a href="javascript:;" v-for="item in m.Records" :key="m.SlideID">{{item.SlideName}}</a>
      </nav>
    </section>
  </div>
</template>

<script>

export default {
  data () {
    return {
      arr: []
    }
  },
  components : {
  },
  props:{
    nav_Id:{
      type:String,
      default:''
    }
  },
  mounted () {
    this.$nextTick(function (){
      /*nav 数据请求 */
      this.getData()
    })
  },
  methods: {
    getData () {
      let that=this
      this.$http.jsonp('http://m.haimi.com/api/ad-module/get?Alias=yanxuan-cat-list&platform=WAP',{
        jsonp:"_callback"
      }).then(function(data){
          //赋值给alllist数组,
         // console.log(data)
          this.arr=data.body.data
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.wrap{
  margin-bottom:5rem;
  .tu_one{
    img{
      display: block;
      width:100%;
    }
  }
  .nav_text{
    nav{
      padding:1rem 0.5rem;
      a{
        float: left;
        margin:0.5rem 0.5rem;
        border:1px solid #eee;
        border-radius:0.4rem;
        padding:0.6rem 1.2rem;
        font-size: 1.2rem;
        color:#000;
      }
    }
  }
}

</style>
