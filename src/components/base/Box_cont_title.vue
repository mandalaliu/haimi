<template>
  <div>
    <section 
      class="Tuwen_fen" 
      v-for="(m,key) in tuwen_arr"
      v-if="key>=2?true:false"
       :key="key"
      >
      <!-- 有标题 显示 -->
      <h3 class="title" v-if="m.Channel['Name']!=''?true:false">{{m.Channel["Name"]}}</h3>
      
      <!-- 内容只有一张图 -->
      <div class="cont_one" v-for="(item,key) in m.Records" v-if="m.Channel['Type']=='Col1ImageOnly'"  :key="key">
        <router-link :to="{path:'Particulars',query:{id:item.CastID!=''?item.CastID:item.SlideID}}">
          <img :src="item.Picture" class="img">
        </router-link>
        
      </div>

      <!-- 内容  有三张图 -->
      <div class="cont_treen"  v-if="m.Channel['Type']=='Col2LeftTop1LeftBottom1Right1'">
        <aside>
          <router-link v-for="(item,key) in m.Records"  :to="{path:'Particulars',query:{id:item.CastID}}" :key="key">
            <img :src="item.Picture" v-if="key<=1?true:false" class="img">
          </router-link>
        </aside>
        <aside>
        <router-link v-for="(item,key) in m.Records" :key="key"  :to="{path:'Particulars',query:{id:item.CastID}}">
          <img :src="item.Picture" v-if="key==2?true:false" class="img">
        </router-link>
       </aside>
      </div>

      <!-- 内容  有六张图  -->
      <div class="cont_liu" v-if="m.Channel['Type']=='Col2ImageOnly'">
        <router-link v-for="(item,key) in m.Records" :key="key" :to="{path:'Particulars',query:{id:item.CastID}}">
          <img  :src="item.Picture" class="img">
        </router-link>
      </div>
      <!-- 内容  横向 -->
      <nav class="cont_heng" v-if="m.Channel['Type']=='Col3AndHalfWithTitleAndDesc'">
        <router-link :to="{path:'Particulars',query:{id:item.CastID}}" v-for="(item,key) in m.Records" :key="item.CastID">
          <dl>
            <dt><img :src="item.Picture" class="img"></dt>
            <dd>
              <h4>{{item.SlideName}}</h4>
              <p>{{item.Description}}</p>
            </dd>
          </dl>
        </router-link>
      </nav>
      <slot></slot>
    </section>
  </div>
</template>

<!-- 主体部分-->
<script>

export default {
  name: 'box_top',
  props: {
    tuwen_arr : {
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
  created () {
   
  },
  methods: {
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.Tuwen_fen{
  width:100%;
  .title{
    height:3.8rem;
    font-size:1.5rem;
    line-height:3.8rem;
    font-weight:bold;
    text-align:center;
    position:relative;
    background: #fff;
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

  &>div{
    clear: both;
  }
  .cont_one{
    .img{
      display: block;
      width:100%;
    }
  }
  .cont_treen{
    width:100%;
    display: -webkit-box;
    aside{
      
      img{
        display: block;
      }
      &:first-child{
        width:52%;
        display: -webkit-box;
        -webkit-box-orient:vertical;
        img{
          width:100%;
        }
      };
      &:last-child{
        width:48%;
        img{
           width:100%;
        }
      };
    }
  }
  .cont_liu{
    .img{
      float: left;
      width:50%;
    }
  }
  .cont_heng{
    display: -webkit-box;
    overflow-x: scroll;
    &::-webkit-scrollbar{
        width:0;
      }
    a{
      display: block;
      width:9rem;
      background: #fff;
      color:#000;
      &:last-child{
        img{
          margin-top:-1rem;
        }
      }
      dl{
        width:100%;
        display: -webkit-box;
        -webkit-box-orient:vertical;
        margin:0 1rem;
        dt{
          width:100%;
          min-height: 9rem;
          img{
            display: block;
            width: 100%;
          }
        }
        dd{
          text-align: center;
          h4{
            line-height: 2rem;
            font-size:1.2rem;
          }
          p{
            line-height:1.8rem;
            font-size:1rem;
            color:#666;
          }
        }
      }
    }
  }
}

</style>
