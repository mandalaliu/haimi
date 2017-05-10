<template>
  <div class="wrap">
    <!-- 一张大图  -->
    <nav class="tu_one" >
      <a href="javascript:;" v-for="m in arr">
        <dl>
          <dt :style="back(m.Picture)"></dt>
          <dd>
            <h4>{{m.SlideName}}</h4>
            <p>{{m.Description}}</p>
          </dd>
        </dl>
      </a>
    </nav>
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
  created () {
    this.$nextTick(function (){
      /*nav 数据请求 */
      this.getData()
    })
  },
  methods: {
    getData () {
      let that=this
      this.$http.jsonp('http://m.haimi.com/api/ad-module/get?Alias=yanxuan-brand-list&platform=WAP',{
        jsonp:"_callback"
      }).then(function(data){
          //赋值给alllist数组,
          console.log(data)
          this.arr=data.body.data[0].Records
      })
    },
    back (url) {
      return 'background:url('+url+');background-size:cover;background-position:center center'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.wrap{
  .tu_one{
    a{
      float: left;
      width:33.33333%;
      padding-bottom:1rem;
      dl{
        width:100%;
        dt{
          width:100%;
          height:10.6rem;
        }
        dd{
          text-align: center;
          h4{
            line-height: 2.2rem;
            color:#333;
          }
          p{
            line-height: 1.6rem;
            color:#999;
          }
        }
      }
    }
  }
}

</style>
