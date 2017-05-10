<template>
  <div class="wrap">
    <div v-if="len>=1" class="gouwukong">
      <header class="header">
        <img src="" alt="">
        <span>购物车居然是空的</span>
        <a href="/">去首页逛逛</a>
      </header>
      <main class="main">
        <h3>大家都在买的宝贝</h3>
        <!-- 纵向 图文混排  -->
        <tuwen-navtu :tuwen_arrtu2="arr" ></tuwen-navtu>
      </main>
    </div>

    <div v-else class="guowu">
      <div>
        <header class="header">
          <input 
            type    =  "checkbox" 
            class   =  "check" 
            v-model =  "shang_gou"
            ref     =  "shang"
            @click="shangClick($event)"
          >
          <i class="logo" :class="(quan_gou | shang_gou)?'logo1':'logo'"></i>
          <span>{{arr.MallName}}</span>
        </header>
        <main class="gou_main">
          <ul>
            <li v-for=" (m,key) in arr">
              <aside>
                <input 
                  type    = "checkbox" 
                  class   = "check"
                  ref     = "lei"
                  :value="m"
                  v-model="toggle"
                  @change="currClick(key,$event)"
                  >
                <i class="logo" :class="(quan_gou || shang_gou)?'logo1':'logo'" ref= "lei_back"></i>
              </aside>
              <dl >
                <dt :style="{backgroundImage:'url('+m.picUrl+')'}"></dt>
                <dd><!-- m.Subject |  -->
                    <h3>
                      <span>{{m.Title}}</span>
                      <span ref="shan" @click="shan($event,m.SkuID)">删除</span>
                    </h3>
                    <h4 v-for="(item,key) in JSON.parse(m.AttrInfo)">{{key}}{{item}}</h4>
                    <p>
                      <span>￥ {{m.Price}}</span>
                      <span> x {{m.SoldNum}}</span>
                    </p>
                </dd>
              </dl>
            </li>
          </ul>
        </main>
        <footer class="footer">
          <aside>
            <input 
              type  =  "checkbox" 
              class =  "check" 
              v-model= "quan_gou"
              @click="quanClick($event)"
            >
            <i :class="quan_gou?'logo1':'logo'"></i>
            <span>全选</span>
          </aside>
          <aside>
            <aside><span>合计：￥ {{heji}}</span><span>以优惠 0 元</span></aside>
            <aside><button>结算</button></aside>
          </aside>
        </footer>
      </div>
    </div>
    <footer-nav v-bind:footer_nav="footer_nav"></footer-nav>
  </div>
</template>

<script>
/*图文混排  纵列nav标题  */
import tuwenNavtu from '../base/tuwen_navtu'
import {alertbox} from '../../lib/alert' //注意路径
/*nav 页脚*/
import footerNav from '../base/Footer'
import { mapState } from 'vuex'

export default {
  name: 'hello',
  props:['footer_nav'],
  components: {
    footerNav,
    tuwenNavtu
  },
  data () {
    return {
      arr: [],
      len:0,
      quan_gou : false,
      shang_gou: false,
      heji     : 0    ,
      async    : true ,
      toggle   : []   ,
      kongArr  : []
    }

  },
  mounted () {
    this.$nextTick(function (){
      /*nav 数据请求 */
      this.getData()   
    })
  },
  methods: {
    getData (){
      let that=this;
      this.$http.jsonp('http://m.haimi.com/api/cart/info?clearInvalidProducts=Y&platform=WAP',{
        jsonp:"_callback"
      }).then(function(data){

          //赋值给alllist数组,
         
         /*this.arr=data.body.extra.Suggest.length>=1?data.body.extra.Suggest:data.data.data[0];*/

        if(data.body.extra.Suggest.length>=1 ){
          this.kongArr = data.body.extra.Suggest
          this.arr=data.body.extra.Suggest.length>=1?data.body.extra.Suggest:this.$store.state.commodityArr;

          this.len=data.body.extra.Suggest.length
        }
        else{
          this.arr=this.$store.state.commodityArr
        }
          
      })

      //console.log(this.$store.state.commodityArr)
    },
    /*  删除选项 */
    shan (eve,CartIDs) {    
      var that=this;
      alertbox()
      .Alerts("确定要删除吗？",
        {
          btns:["取消",'确定'],
          yes : function(){

            alertbox().cancelBox()

           /* alertbox().succeedBox("三秒钟后，将要跳转页面，进行支付操作",{
                title:"跳转支付宝"
            },function(data){
              if(data=="true"){
                setTimeout(function(){
                    alertbox().cancelBox()               
                 location.href="controller/tijiao/tijiao.html"
                },2000)
              }
            })*/
          },
          no : function(){
            alertbox().cancelBox()

            alertbox().cancelAlert("您确定不够买，这么便宜的商品吗",{
              title:"没钱的渣渣",
              btns:["确定",'取消'],
              yes : function(){
                /*取消遮层*/
                alertbox().cancelBox()

                that.$store.commit('removeCartList',CartIDs)
                var len=that.$store.state.commodityArr.length

                if(len==0){
                  console.log(that.kongArr.length)
                    that.arr=that.kongArr

                    that.len=that.kongArr.length
                }


              /*that.$http.jsonp('http://www.haimi.com/api/cart/delete?CartID='+CartIDs+'&platform=WAP',{
                jsonp:"_callback"
              }).then(function(data){

                  //赋值给alllist数组,
                 console.log(CartIDs)
                 
                  console.log(data)
              })*/



                  /*console.log(that.$refs.shan)
                 var main=eve.target.parentNode.parentNode.parentNode.parentNode
                 var fu=eve.target.parentNode.parentNode.parentNode

                 main.removeChild(fu)*/
              },
              no : function(){
                alertbox().cancelBox()
              }
            })
          }

      })
    },
    /**/

    /* 判断选中那件商品 */
    currClick (ind,e) {
      var leis=this.$refs.lei,
          that=this;
          console.log(this.toggle)
          // leis.forEach(function(val,i){
          //    if(i==ind && e.target.checked){
          //     that.$refs.lei_back[i].className="logo1"
          //     that.heji+=that.arr.Products[i].Price*that.arr.Products[i].Quantity
          //    }
          //    else if(i==ind && !e.target.checked){
          //      that.$refs.lei_back[i].className="logo";
          //      that.heji-=that.arr.Products[i].Price*that.arr.Products[i].Quantity
          //    }
          // })
    },
    /* 判断选中商家全部商品 */
    shangClick (e) {
      var leis    =  this.$refs.lei,
          shangs    =  this.$refs.shang,
          that=this;
           if(that.async){
            that.shang_gou=true;
            that.async=!that.async;
            shangs.checked=true;
              leis.forEach(function(val,i){
                  if(leis[i].checked!=true){
                    leis[i].checked=true;
                    that.heji+=that.arr.Products[i].Price*that.arr.Products[i].Quantity
                  }
              })
           }
           else{
            that.shang_gou=false;
            that.async=!that.async;
            shangs.checked=false;

            leis.forEach(function(val,i){    
                leis[i].checked=false;
                that.heji-=that.arr.Products[i].Price*that.arr.Products[i].Quantity
              })
           }
          
    },
    quanClick (e) {
      var leis    =  this.$refs.lei,
          shangs    =  this.$refs.shang,
          that=this;
          console.log(this.toggle)
      if(e.target.checked){
          // leis.forEach(function(val,i){
          //   if(leis[i].checked!=true){
          //     leis[i].checked=true;
          //     that.heji+=that.arr.Products[i].Price*that.arr.Products[i].Quantity
          //   }
          // })
      }
      else{

        // leis.forEach(function(val,i){    
        //   leis[i].checked=false;
        //   that.heji-=that.arr.Products[i].Price*that.arr.Products[i].Quantity
        // })
      }
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.wrap{
  .gouwukong{
    .header{
    display: -webkit-box;
    -webkit-box-orient:vertical;
    -webkit-box-align:center;
    -webkit-box-pack:center;
    background: #eee;
    padding:10rem 0 6rem;
    img,a,span{
      display: block;
    }
    a{
      border:1px solid #000;
      padding:0.6rem 1.4rem;
      color:#000;
    }
    span{
      line-height: 4.2rem;
      color:#666;
    }
  }
  .main{
    &>h3{
      height:4rem;
      line-height: 4rem;
      text-align: center;
      border-bottom:1px solid #eee;
    }
  }
  }
}
.guowu{
  position:fixed;
  height:100%;
  width:100%;
  .logo{
    display: block;
    background:url(../../../static/images/xun.png) no-repeat center center;
    background-size: cover ;
    height:2.4rem;
    width:2.4rem;
    margin-right:1.5rem;
  }
  .logo1{
    display: block;
    background:url(../../../static/images/dui.png) no-repeat center center;
    background-size: cover ;
    height:2.4rem;
    width:2.4rem;
    margin-right:1.5rem;
  }
  .check{
    position: absolute;
    height:100%;
    width:2.4rem;
    opacity: 0.2;
    top:0;
  }

  &>div{
    position:relative;
    height:100%;
    width:100%;
    .header{
      display:-webkit-box;
      padding:0 1.5rem;
      box-sizing: border-box;
      -webkit-box-align:center;
      border-bottom:1px solid #eee;
      height:4.4rem;
      position: relative;
      i,span{
        display: block;
        color:#333;
      }
    }
    .gou_main{  
      overflow-y: scroll;
      padding-bottom: 10rem;
      ul{
        
        li{
          display: -webkit-box;
          width:100%;
          padding:1.5rem 1.5rem;
          box-sizing: border-box;
          margin-bottom:1.5rem;
          border-bottom:1px solid #eee;
          -webkit-box-align:center;
          aside{
            position: relative;
            display: -webkit-box;
            -webkit-box-align:center;
          }
          dl{
            -webkit-box-flex:1;
            display: -webkit-box;
            box-sizing: border-box;
            dt{
              width:5rem;
              height:5rem;
              border:1px solid #eee;
              margin-right:1.5rem;
              background-size:cover;
              background-position: center center;
            }
            dd{
              -webkit-box-flex:1;
              display: -webkit-box;
              -webkit-box-orient:vertical;
              -webkit-box-pack:justify;
              height:5rem;
              h3{
                display: -webkit-box;

                span{
                  display:block;
                  &:first-child{
                    width:80%;
                    overflow:hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                  }

                  &:last-child{
                    color:#999;
                    margin-left:1.4rem;
                  };
                }
              }
              h4{
                color:#999;
              }

              p{
                display: -webkit-box;
                -webkit-box-pack:justify;
                width:100%;
                span{
                  display: block;
                  &:last-child{

                color:#999;
                  };
                }
              }
            }
          }
        }
      }
    }

    .footer{
      position: absolute;
      background: #fff;
      bottom:5rem;
      width:100%;
      display: -webkit-box;
      -webkit-box-pack:justify;
      border-top:1px solid #eee;
      height:4.4rem;
      aside{
        display: -webkit-box;
        -webkit-box-align:center;
        i,span{
          display: block;
        }

        &:first-child{
          padding:0 1.5rem;
          box-sizing: border-box;
        };

        &:last-child{
          height:100%;
          aside{
            height:100%;
            display: -webkit-box;
            -webkit-box-orient:vertical;
            button,span{
              display: block;
            }
            button{
              border:none;
              width:6.5rem;
              height:100%;
              color:#fff;
              background:#991f33;
            }
            &:first-child{
              padding:0.4rem;
              span{
                line-height: 2rem;
                &:first-child{
                  color:#991f33;
                  font-size:1.4rem;
                };

                &:last-child{
                  color:#999;
                };
              }
            };
          }
          
        };
      }
    }
  }

  
}

</style>
