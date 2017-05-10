<template>
  <div class="wrap">
    <main class="xiang_main">  
      <div v-if="arr.Promises">
          <!-- 轮播图 图文混排  -->
        <dl class="xiang_lunbo">
          <dt>
            <box-cont :tuwen_tu="banner"></box-cont>
          </dt>
          <dd>
            <h3>{{arr.Subject}}</h3>
            <p><span>￥ {{arr.FinalPrice}}</span><span>月销 {{arr.MonthSalesNum}} 件</span></p>
          </dd>
        </dl>

        <p class="youfei">邮费 {{arr.Postage}} 元</p>
        <p  class="shouhou"><span v-for="m in arr.Promises" style="background-image:url(../../static/images/dui.png)">{{m}}</span></p>
        <p @click="showBack()" v-if="fenleiLength" >请选择 ： 颜色分类，尺寸大小</p>

        <section>
          <ul class="pinlun">
            <li v-for="m in arr.TopReviews">
              <h3>
                <aside>
                  <img :src="m.Buyer.Avatar" alt="">
                  <span>{{m.Buyer.NickName}}</span>
                </aside>
                <aside><time>{{m.CreateTime}}</time></aside>
              </h3>
              <p>{{m.BuyerNote}}</p>
              <p><img :src="m.BuyerPictures" alt=""></p>
            </li>
          </ul>
        </section>

        <section class="jieshao" v-html="arr.Descriptioin">
        </section>
        <section class="tuijian" >
          <!-- 纵向 图文混排  -->
          <h3>图文推荐</h3>
          <tuwen-navtu :tuwen_arrtu3="arr.Recommend"></tuwen-navtu>
        </section>
      </div>

      <div v-if="arr.activityDetail" class="faxian">
        <h3><img :src="arr.activityDetail.Banner" alt=""></h3>
        <ul v-for="m in arr1" class="ul">
          <li v-for="item in m.Records">
            <img :src="item.Picture" alt="">
          </li>
        </ul>
        <section class="tuijian" >
          <!-- 纵向 图文混排  -->
          <tuwen-navtu :tuwen_arrtu="arr.Specials"></tuwen-navtu>
        </section>
      </div>
    </main>
   <footer class="xiang_footer">
    <nav>
      <a href="/" class="on"><i class="fa fa-home"></i></a>
      <a href="/Group" class="on"><i class="fa fa-star-o"></i></a>
      <a href="/Books" class="on"><i class="fa fa-shopping-cart"></i></a>
      <a href="javascript:;"><button @click="showBack()">加入购物车</button></a>
      <a href="javascript:;"><button @click="showBack()">立即购买</button></a>
    </nav>
   </footer>
   <div class="xinag_back" v-show="async" @click="showBack()">
   </div>
   <div class="xinag_text" v-show="jianAsync">
    <div>
      <p>{{textAlert}}</p>
    </div>
  </div>

  <!-- 背景遮层 选择商品样式-->
   <div class="back1"  v-show="async" >
      <div class="box">
        <header class="header">
          <dl>
            <dt :style='{backgroundImage:"url("+this.picUrl+")"}'>
            </dt>
            <dd>
              <h4>￥{{danjia}}</h4>
              <p>（库存{{kucun}}件）</p>
              <p v-if="arrLength | fenleiLength">{{text}}{{text1}}{{text2}}</p>
            </dd>
          </dl>
        </header>
        <main class="back_main">
          <section class="lei" v-if="arrLength">
            <h3>型号分类</h3>
            <nav class="feinav">
              <a href="javascript:;" v-for="(m,key) in arr.SkuPictures"
               @click="picQie(m,key)">{{m.ValueName}}</a>
            </nav>
          </section>

          <section class="lei" v-if="fenleiLength">
           <div v-for="(m,ind) in arr.AttrInfoArray" class="fenlei_nav">
              <h3>{{m.AttrName}}</h3>
              <nav  class="feinav" v-if="ind==0">
                <a href="javascript:;"  v-for="(m,key) in arr.SkuPictures" ref="fenlei"
                 @click="picQie(m,key,$event)">{{m.ValueName}}</a>
              </nav>

              <nav  class="feinav1" v-if="ind!=0">
                <a 
                  href="javascript:;" 
                  v-for="(item,key) in m.AttrValues.split(',')"  
                  :key="key"
                  @click="picQie1(item,key,$event)"
                  ref="chicun"
                  >{{item}}</a>
              </nav>
           </div>
          </section>

          <section class="shu">
            <aside>
              <span>购买数量</span>
            </aside>
            <aside >
              <button @click="jian">-</button>
              <input type="number" v-model="num">
              <button @click="jia">+</button>
            </aside>
          </section>
        </main>
        <footer class="footer">
          <button @click="queDing">确定</button>
        </footer>
      </div>
   </div>
  </div>
</template>
<script>
/*图文混排，swiper滑动*/
import boxCont from '../base/Box_cont_tuwen1'
/*图文混排  纵列nav标题  */
import tuwenNavtu from '../base/tuwen_navtu'

export default {
  name: 'hello',
  props:['footer_nav'],
  components: {
    boxCont,
    tuwenNavtu
  },
  data () {
    return {
      id:'',
      arr:[],
      arr1:[],
      banner:[],
      async:false,
      num:1,
      picUrl:'',
      arrLength:false,
      fenleiLength:false,
      text:'请选择：规格',
      text2:'',
      text1:'',
      jianAsync:false,
      textAlert:"至少购买一件",
      id:'',
      ind:0,
      danjia:0,
      kucun:0,
      title:''
    }
  },
  created () {
    this.id=this.$route.query.id
    this.getData()
  },
  watch : {
    '$route.query.id' () {
      this.id=this.$route.query.id
      this.getData()
    }
  },
  methods: {
    getData (){
      if(!this.id) return false
      let that=this
      this.$http.jsonp('http://m.haimi.com/api/product/detail-cdn?ProductID='+this.id+'&platform=WAP',{
        jsonp:"_callback"
      }).then(function(data){

        if(data.body.flag!=-1){
         this.banner=JSON.parse(data.body.data.ProductPictures)
          this.arr=data.body.data;
          this.arrNull(data.body.data.SkuPictures,data.body.data.AttrInfoArray)  
        }
        else{
          this.$http.jsonp('http://m.haimi.com/api/promotion/activity-products-cdn?ActivityID=1081&pageSize=20&platform=WAP&deviceID=',{
            jsonp:"_callback"
          }).then(function(data){
            this.arr=data.data.data
              //console.log(this.arr)
          })

          this.$http.jsonp('http://m.haimi.com/api/ad-module/get?AdModuleID=143&platform=WAP',{
            jsonp:"_callback"
          }).then(function(data){
            this.arr1=data.data.data
             // console.log(this.arr1)
          })
        }
      })
      
    },
    /*  默认弹出的数据  */
    showBack () {
     console.log(this.arr.TopReviews)
      this.danjia = this.arr.FinalPrice
      this.kucun = this.arr.Stock
     this.picUrl=this.arr.TopReviews[0].ProductPicture?this.arr.TopReviews[0].ProductPicture:this.arr.Pictures
      this.async=!this.async 
      
    },
    jia () {
     this.num++
    },
    /*  减个数 */
    jian () {
      if(this.num<=1){
        this.jianAsync=true
        this.setTimeoutAsync()
        return false
      }
      else{
        this.num--
      }
    },
    /* 延迟 执行 */
    setTimeoutAsync () {
      var that=this
      setTimeout(function(){
          that.jianAsync=false
          that.textAlert='至少购买一件'
      },1500)
    },
    /*  切换样式 */
    picQie (url,key,e) {
      this.ind=key
      this.danjia = this.arr.SkuInfo[key].Price
      this.kucun = this.arr.SkuInfo[key].Stock
      this.picUrl=this.picUrl==this.arr.TopReviews[0].ProductPicture?url.Picture:this.arr.TopReviews[0].ProductPicture
      this.text1=this.text1!=url.ValueName?url.ValueName:''
       /*  添加改变clas类名 */
      this.clsName(this.$refs.fenlei,e)

      this.title=this.arr.Subject
    },
    /*  切换样式2 */
    picQie1 (text,key,e) {     
      this.text2=this.text2!= text ? text:''
      /*  添加改变clas类名 */
      this.clsName(this.$refs.chicun,e)
    },
    /*  添加改变clas类名 */
    clsName (cls,e) {
      cls.forEach(function(item,i){
        if(e.target==item) return
        item.className=''
      })    
       e.target.className=e.target.className?'':'on'

       this.text=this.text2!='' || this.text1!='' ?'已选择 ： ':'请选择：规格'
    },
    /* 确定购买 */
    queDing () {

      if(this.arr.SkuInfo.length>=1){

        this.arr.SkuInfo[this.ind]['SoldNum']=this.num
        this.arr.SkuInfo[this.ind]['Title']=this.title
        this.arr.SkuInfo[this.ind]['picUrl']=this.picUrl
        var obj = this.arr.SkuInfo[this.ind]

      }
      else{
        var obj={
          SoldNum:this.num,
          Title:this.arr.Subject,
          picUrl:this.picUrl,
          Price:this.danjia
        }
      }
      
      this.$store.commit('addCartList',obj)

      /*this.$http.jsonp('http://www.haimi.com/api/cart/add?ProductID:4374844&Num:1&SkuID:5322&Hm_Source:215.0.0&platform:WAP',{
            jsonp:"_callback"
          }).then(function(data){
           
              console.log(data)
          })*/

      this.jianAsync=true
      this.textAlert='添加购物车成功'
      // 背景 
      this.async=false
      this.setTimeoutAsync()
    },
    /*   判断数据  是否有尺寸 */
    arrNull (arr,arr1) {
      if(arr.length>=1){
        this.fenleiLength= true
      }
      else if(arr.length>=1 && arr1.length==0){
        this.arrLength= true
      }
      else{
        this.arrLength= false
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" >
.wrap{
  .faxian{
    &>h3{
      img{
        display:block;
        width: 100%;
      }
    }
    &>.ul{
      li{
        img{
          display:block;
          width:100%;
        }
      }
    }
  }
  .xiang_main{
    margin-bottom:5rem;
    background: #eee;
    &>div{
      background: #eee;
      &>p{
        background: #fff;
        height:4rem;
        line-height: 4rem;
        padding-left: 1rem;
        margin-bottom:0.6rem;
      }
    }
    .jieshao{
      background: #fff;
      &>p{
        padding:0 1.4rem;
        line-height: 1.4rem;
        img{
          display:block;
          width:100%;
        }
        span{
          line-height: 2rem
        }
      }
    }
    &>p{
      margin-bottom:1rem;

    }
  }
  .xiang_lunbo{
    border-bottom:1px solid #eee;
    background: #fff;
    dd{
      padding:0 1rem;
      h3{
        line-height: 2rem;
        font-size: 1.4rem
      }
      p{
        display:-webkit-box;
        -webkit-box-pack:justify;
        -webkit-box-align:center;
        height: 4rem;
        span{
          display: block;
          &:first-child{
            color: #991f33;
            font-size:1.4rem;
          };
          &:last-child{
            color:#999;
          };
        }
      }
    }
  }
  .youfei{
    padding:0 1.5rem;
    color:#999;
    line-height: 3rem;
    font-size:1.2rem;
    border-bottom:1px solid #eee;
  }
  .shouhou{
    display:-webkit-box;
    width:100%;
    height:4rem;
    background: #fff;
    -webkit-box-align:center;
    span{
      display: block;
      padding-left: 2rem;
      margin-left: 2rem;
      background-size:1.2rem;
      background-position: left center;
      background-repeat:no-repeat;
    }
  }
  
  .xiang_footer{
    position:fixed;
    height:4.4rem;
    bottom:0;
    width:100%;
    z-index:100;
    background:#fff;
    nav{
      width: 100%;
      height:4.4rem;
      display: -webkit-box;
      -webkit-box-align:center;
      border-top:1px solid #eee;
      a{
        display: block;
        width:4rem;
        height:3rem;
        font-size: 2rem;
        color:#999;
        display:-webkit-box;
        -webkit-box-align:center;
        -webkit-box-pack:center;
        &.on{
          border-right:1px solid #eee;
        }
        i{
          display: block;
        }
        button{
          border:none;
          background: none;
          font-size: 1.2rem;
          outline: none;
        }
        &:nth-child(4){
          -webkit-box-flex:1;
        };
        &:last-child{
          -webkit-box-flex:1;
          position: relative;
          button{
            color:#fff;
            position: absolute;
            height:4.4rem;
            width:100%;
            top:-0.5rem;
            background:#801a2a;
          }
        };
      }
    }
  }
  .tuijian{
    h3{
      text-align: center;
      border:1px solid #eee;
      line-height: 4rem;
      img{
        width:100%;
      }
    }
  }
  .xinag_back{
    background:rgba(0,0,0,0.3);
    position: fixed;
    left:0;
    right:0;
    bottom:0;
    top:0;
    z-index:100;  
  }
  .back1{
      width:100%;
      position:fixed;
      bottom:0;
      z-index:104;
      .box{
        background: #fff;
        .header{
          dl{
            width:100%;
            display: -webkit-box;
            padding:1rem 1.6rem 1.5rem;
            border-bottom:1px solid #eee;
            dt{
              width:5rem;
              margin-right:1.4rem;
              height:5rem;
             background-size:cover;
             background-position: center center;
            }
            dd{
              -webkit-box-flex:1;
              h4{
                color: #991f33;
                font-size: 1.6rem;
              }
              p{
                line-height: 2rem;
                &:first-child{
                  color:#eee;
                };
                &:last-child{
                  color:#666;
                };
              }
            }
          }
        }
        .back_main{
          section{
            aside{
              padding: 1rem 1rem;
            }
            &.shu{
              display: -webkit-box;
              -webkit-box-pack:justify;
              -webkit-box-align:center;
              clear: both;
              aside{
                &:last-child{
                  display: -webkit-box;
                  button,input{
                    display: block;
                    outline: none;
                    background:none;
                    border:1px solid #999;
                    height:3rem;
                  }
                  input{
                    width:7rem;
                    text-align: center;
                  }
                  button{
                    width:3rem;
                    font-size:1.6rem;
                  }
                }
              }
            }

            &.lei{
              padding:0 1rem;
              .fenlei_nav{
                clear: both;
                padding-top:1rem;
                &:first-child{
                  h3{
                    border-top:0;
                  }
                };
              }
              h3{
                padding-left:1.5rem;
                font-size:1.6rem;
                line-height: 2.4rem;
                border-top:1px solid #eee;
                padding-top:1rem;
              }
              nav{
                width:100%;
                padding:1rem 0;
                a{
                  float: left;
                  padding:0.8rem 1rem;
                  border:1px solid #999;
                  color:#000;
                  margin:0.6rem 0.6rem;
                  &.on{
                    color:#991f33;
                    border:1px solid #991f33;
                  }
                }
              }
            }
          }
        }



        .footer{
          height:4.4rem;
          button{
            display: block;
            border:none;
            background:  #991f33;
            outline: none;
            color:#fff;
            width:100%;
            height:100%;
          }
        }
      }
    }
  .pinlun{
      background: #fff;
    li{
      padding:1.4rem 1.5rem;
      border-bottom:1px solid #eee;
      h3{
        width:100%;
        display:-webkit-box;
        -webkit-box-pack:justify;
        -webkit-box-align:center;
        aside{
          img{
            width:4rem;
          }
        }
      }
      p{
        line-height: 2.2rem;
        img{
          display: block;
          width:4rem;
        }
      }
    }
  }
  .xinag_text{
    position: fixed;
    left:0;
    right:0;
    bottom:0;
    top:0;
    z-index: 220;
    &>div{
      height:100%;
      width:100%;
      display: -webkit-box;
      -webkit-box-align:center;
      -webkit-box-pack:center;
      &>p{
        margin-bottom:30%;
        background:rgba(0,0,0,0.7);
        color:#fff;
        padding:1.5rem 2.4rem;
        border-radius: 0.8rem;
        font-size: 1.4rem;
        position: relative;
      }
    }
  }
}
</style>
