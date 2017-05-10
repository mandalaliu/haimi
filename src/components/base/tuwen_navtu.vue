<template>
  <div>
    <section class="nav_datu" v-for="m in tuwen_arrtu1" v-if="tuwen_arrtu1"><router-link :to="{path:'Particulars',query:{id:item.ProductID}}" v-for="(item,key) in m.Records" :key="key" >
      <img :src="item.Picture" ></router-link>
    </section>

    <section  v-for="m in tuwen_arrtu" class="nav_tu">
      <!-- 有标题 显示 -->
      <h3 class="title" v-if="m.Title">{{m.Title}}</h3>
      <div  class="cont_tu"><router-link :to="{path:'Particulars',query:{id:item.ProductID}}" v-for="(item,key) in m.Products" :key="key">
        <dl  :class="cls(key)">
          <dt :style="back(item.Pictures)" ></dt>
          <dd>
            <h4>{{item.Subject}}</h4>
            <p>￥ {{item.FinalPrice}}</p>
          </dd>
        </dl></router-link>
      </div>
    </section>

    <section v-if="tuwen_arrtu2"  class="nav_tu">
      <div  class="cont_tu"><router-link :to="{path:'Particulars',query:{id:m.ProductID}}" v-for="(m,key) in tuwen_arrtu2" :key="key">
        <dl  :class="cls(key)">
          <dt :style="back(m.Pictures)" href="/Particulars"></dt>
          <dd>
            <h4>{{m.Subject}}</h4>
            <p>￥ {{m.FinalPrice}}</p>
            <p>{{m.FinalPrice}}</p>
          </dd>
        </dl></router-link>
      </div>
    </section>

    <section v-if="tuwen_arrtu3"  class="nav_tu">
      <div  class="cont_tu"><router-link :to="{path:'Particulars',query:{id:m.ProductID}}" v-for="(m,key) in tuwen_arrtu3" :key="key">
        <dl  :class="cls(key)">
          <dt :style="back(m.Pictures)" href="/Particulars"></dt>
          <dd>
            <h4>{{m.Subject}}</h4>
            <p>￥ {{m.FinalPrice}}</p>
          </dd>
        </dl></router-link>
      </div>
    </section>
  </div>
</template>

<!-- 主体部分-->
<script>

export default {
  name: 'box_top',
  props: {
    tuwen_arrtu : {
      type:Array,
      default:function(){

      }
    },
    tuwen_arrtu1 : {
      type:Array,
      default:function(){

      }
    },
    tuwen_arrtu2 : {
      type:Array,
      default:function(){
      }
    },
    tuwen_arrtu3 : {
      type:Array,
      default:function(){
      }
    },
    tuwen_arrtu4 : {
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
  },
  methods: {
    cls (key) {
      if(key%2==0){
        return 'lef'
      }
      else{
        return 'rig'
      }
    },
    back (url) {
      return 'backgroundImage:url('+url+');background-size: cover;background-position: center center;'
    }

  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.nav_tu{
  clear: both;
  .title{
    height:3.8rem;
    font-size:1.5rem;
    line-height:3.8rem;
    font-weight:bold;
    text-align:center;
    position:relative;
    margin-bottom:0.6rem;
    background:#f1efef;
    &:after{
      content:'';
      height:1px;
      background:#eee;
      width:1000%;
      position:absolute;
      bottom:0;
      left:0;
    }
  }
  
  .cont_tu{
    background:#eee;
    dl{
      width: 48%;
      margin-bottom:0.6rem;
      background: #fff;
      &.lef{
        float: left;
      }
      &.rig{
        float: right;
      }
      dt{
        width:100%;
        height:18rem;
      }
      dd{
        width:100%;
        h4{
          line-height:3rem;
          overflow:hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 1.3rem;
          padding-left: 1.4rem;
          color:#333;
        }
        p{
          font-size: 1.3rem;
          padding-left: 1.4rem;
          color:#999;
        }
      }
      
    }
  }

}
.nav_datu{
  img{
    display: block;
    width:100%;
  }
}

</style>
