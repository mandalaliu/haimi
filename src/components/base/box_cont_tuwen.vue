<template>
  <div class='content swiper-container'>
    <ul  class="swiper-wrapper" >
      <li  class="swiper-slide" v-for="m in tuwen_tu">
        <a href="javascript:;">
          <dl>
            <dt><img :src="m.Picture" alt=""></dt>
            <dd><h3></h3></dd>
          </dl>
        </a>
      </li>
    </ul>
    <div class="swiper-pagination"></div>
  </div>
</template>

<!-- 主体部分-->
<script>
export default {
  name: 'box_cont_tuwen',
  props: {
    tuwen_tu : {
      type:Array,
      default:function(){
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
    var swiper = new Swiper(".swiper-container", {
      pagination: '.swiper-pagination',
        paginationClickable: true,
        observer:true,
        observeParents:true,
        bserveParents:true,
        spaceBetween:0,
        centeredSlides: true,
        autoplay: 2500,
        autoplayDisableOnInteraction: false
    });
  },
  methods: {
   
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang='scss' scoped>
ul{         
  li{
    &>a{
      display:block;
      color:#000;
      dl{
        width:100%;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-box-pack:center;
        dt{
          width:100%;
          background:#eee;
          img{
            display:block;
            width:100%;
          }
        }
        dd{
          text-align:center;
          h4{
            line-height:3rem;
            font-size:1.5rem;
            height:3rem;
            word-break:break-all;
            display:-webkit-box;
            -webkit-line-clamp:1;
            -webkit-box-orient:vertical;
            overflow:hidden;
          }
          p{
            width:100%;
            display:-webkit-box;
            -webkit-box-pack:center;
            span{
              display:block;

              &:first-child{
                display:-webkit-box;
                i{
                  display:block;
                  width:1rem;
                  height:1rem;
                }
              }
              &:last-child{
                color:#bfbfbf;
                margin-left:1rem;
              }
            }
          }
        }
      }
    }
    
  }
}
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
