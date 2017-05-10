<template>
  <div class="wrap">
    <header class="header">
      <h3>请输入手机号码雁阵马直接登录</h3>
    </header>
    <main class="main">
      <form action="javascript:;" id="form">
        <p>
          <span >手机号：</span>
          <input type="text" name="mobile" ref="text">
        </p>
        <p>
          <span>验证码：</span>
          <input type="text" ref="yan">
          <span @click="verification" class="span">{{textName}}</span>
        </p>
        <p><button class="button" id="button" type="submit">登录</button></p>
      </form>
    </main>
  </div>
</template>

<script>
import {alertbox} from '../../lib/alert' //注意路径
import {formbox} from '../../lib/form' //注意路径
import Vue from 'vue'
export default {
  name: 'hello',
  props:['footer_nav'],
  components: {
  },
  data () {
    return {
      num:30,
      textName:'发送验证码'
    }
  },
  mounted () {

    this.$nextTick(function (){
    })

    var that=this

    formbox('#form',{},function(){

      var text=that.$refs.text.value;
      var yan=that.$refs.yan.value;

       that.$http.jsonp('http://m.haimi.com/api/member/quick-login?username='+text+'&code:='+yan+'&platform=WAP',{
          jsonp:"_callback"
        }).then(function(data){
            console.log(data)

        })
    })
  },
  methods: {
    verification () {
      var reg=/^1[3|4|5|7|8][0-9]{9}$/g
      var text=this.$refs.text.value;
      var yan=this.$refs.yan.value;
      var that=this
        if(reg.test(text)){

          this.$refs.text.style.color="#eee"

         /*var timer= setInterval(function(){
            if(that.num==0){
              that.num=30
              clearInterval(timer)
              that.textName='发送验证码'
            }

            that.num--
              that.textName='重新获取（'+that.num+'）'

            },1000)
*/
          this.$http.jsonp('http://m.haimi.com/api/member/send-quick-login-code?mobile='+text+'&platform=WAP',{
            jsonp:"_callback"
          }).then(function(data){
              console.log(data)
              if(data.body!=1)return false

          })

          
        }
    }
  },
  computed: {
  }
}




</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.wrap{
  .header{
    height: 4.4rem;
    border-bottom: 1px solid #e5e5e5;
    width:100%;
    background: #fff9f3;
    h3{
      color: #991f33;
      line-height: 4.4rem;
      text-align: center;
    }
  }
  .main{
    form{
      width:100%;
      display: -webkit-box;
      -webkit-box-orient:vertical;
      padding: 0 1.4rem;
      box-sizing:border-box;
      p{
        width:100%;
        display: -webkit-box;
        border-bottom:1px solid #eee;
        height:4.4rem;
        -webkit-box-align:center;
        margin-bottom: 1.4rem;
        span,input,button{
          display: block;
        }
        span{
          width:4rem;
        }
        button{
          width: 6.4rem
        }
        input{
          -webkit-box-flex:1;
          height:100%;
          border:none;
          outline: none;
          &.color{
            &::-webkit-input-placeholder { 
              color: red; 
            } 
            &::-moz-placeholder { 
              color: red; 
            } 
            &::-moz-placeholder {
              color: red; 
            } 
            &::-ms-input-placeholder { 
              color: red; 
            }
          } 
        }
        &:nth-child(2){
          .span{
            font-size: 1rem;
            color: #991f33;
            display: block;
            width:10rem;
            height:100%;
            line-height: 4.4rem;
            text-align: center;
          }
        };

        &:last-child{
          border-bottom:none;
          button{
            width:100%;
            height:4.4rem;
            border:none;
            background: #991f33;
            color:#fff;
          }
        }
      }
    }
  }
}
</style>
