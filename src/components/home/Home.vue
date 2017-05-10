<template>
  <div class="wrap">
    <header class="header">
      <aside><input type="text" placeholder="搜索宝贝"><i></i></aside>
      <aside><a href="javascript:;">搜索</a></aside>
    </header>
    <main class="main">
      <div class="main_box">
        <nav class="main_nav" v-Srcolls="xuanting">
          <header-nav v-for="(m,key) in arr" :name="m.Title" :key="m.Title" :ind="m.NavID" @getPages="getPage" :len="key" ></header-nav>
        </nav>
        
        <div class="back"></div>
      </div>
      <component v-bind:is="currentView" :nav_Id="navID">
        
      </component>
    </main>
    <footer-nav v-bind:footer_nav="footer_nav"></footer-nav>
  </div>
</template>

<script>
/*nav 导航栏*/
import headerNav from '../base/Header_nav'
/*主体 内容 */
import tuijian from './base/tuijian'
import fenlei from './base/fenlei'
/*nav 页脚*/
import footerNav from '../base/Footer'
import { mapState } from 'vuex'

export default {
  name: 'hello',
  props:['footer_nav'],
  components: {
    headerNav,
    footerNav,
    tuijian,
    fenlei
  },
  data () {
    return {
      arr: [],
      currentView: 'tuijian',
      navID:''
    }
  },
  created () {
      this.getData()
  },
  methods: {
    getData (){
      let that=this
      this.$http.jsonp('http://m.haimi.com/api/nav/list',{
          Params:{
            platform:"WAP"
        },
        jsonp:"_callback"
      }).then(function(data){
          return this.arr=data.body.data;
      })
    },
    getPage:function(index){
      if(index){
        this.navID=index;
        //console.log(this.navID) 
        return this.currentView = fenlei;
      }
      else{
        return this.currentView = tuijian;
      }
    },
    xuanting () {
      //var navH = document.querySelect(".main_nav")
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.wrap{
  background:#eee;
  .header{
    height: 4.4rem;
    background: #242424;
    border-bottom: 1px solid #e5e5e5;
    width:100%;
    display: -webkit-box;
    -webkit-box-pack:justify;
    aside{
      &:first-child{
        -webkit-box-flex:1;
        display: -webkit-box;
        -webkit-box-pack:center;
        -webkit-box-align:center;
        input{
          display: block;
          width:90%;
          border:none;
          background: #000;
          height:2.4rem;
          padding-left:3.4rem;
          font-size:1rem;
          outline: none;
          color:#fff;
        }

      };
      &:last-child{
        width: 4.6rem;
        text-align: center;
        line-height: 4.4rem;
        a{
          color:#fff;
          font-size:1.4rem;
        }
      };
    }
  }
  .main{
    margin-bottom:4.4rem;
    .main_box{
      position: relative;
      .main_nav{
        width:100%;
        display: -webkit-box;
        overflow-x: scroll;
        height:4.4rem;
        background:#fff;
        position:absolute;
        border-bottom:1px solid #eee;
        &::-webkit-scrollbar{
          width:0;
        }
      }
      .fixedNav{
        position: fixed;
        top:0;
        z-index: 1000;
      }
      .back{
        height:4.4rem;
      }
    }
    
  }
}
</style>
