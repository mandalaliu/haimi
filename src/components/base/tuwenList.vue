<template>
  <li>
    <dl class="tuwen_wenzi" v-if="type==1">
      <dt 
        :style='backUrl(url)'
        v-if="type==1 && photo!=''">
        <div></div>
      </dt>
      <dd>
          <h3>{{title}}</h3>
          <p>{{text}}</p>
      </dd>
    </dl>
    <dl class="tupian" v-if="type==3" >
      <dt :style='backUrl(url)'></dt>
      <dd>
        <p></p>
        <p></p>
      </dd>
    </dl>
  </li>
</template>

<script>

export default {
  name: 'hello',
  props: {
    type: {
      type:Number,
      default:2
    },
    photo: {
      type:String,
      default:''
    },
    title: {
      type:String,
      default:''
    },
    text: {
      type:String,
      default:''
    },
    url: {
      type:String,
      default:''
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
    backUrl (url) {
     return 'backgroundImage:url('+url+')'
    },
    showLi (ind) {
      if(ind==1){
        return true
      }
      else{
        return false
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
li{
  margin-bottom:2rem;
  &:first-child{
    margin-top:2rem;
  }
  .tuwen_wenzi{
    dt{
      width: 25.6%;
      margin-left: 25px;
      float:right;
      div{
        padding-top:100%;
      }
    }
    dd{
      h3{
        text-align: justify;
        font-size: 17px;
        font-weight: 500;
        line-height: 1.41;
        color: #494949;
        margin-bottom: 6px;
      }
      p{
        overflow: hidden;
        text-align: justify;
        color: #aaa;
        font-size: 12px;
        line-height: 1.5;
        display: -webkit-box;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
      }
    }
  }
  .tupian{
    display: -webkit-box;
    height:14rem;
    dt{
      -webkit-box-flex: 3.2;
      margin-right: 4px;
      background: green;
      div{
        padding-top: 100%;
      }
    }
    dd{
      -webkit-box-flex: 1;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      box-sizing: border-box;
      p{
        -webkit-box-flex:1;
        background: red;
        display: -webkit-box;
        margin:0.1rem 0;
        img{
          display: block;
          width: 100%;
        }
        &:last-child{
          top:7rem;
        }
      }
    }
  }
}

</style>
