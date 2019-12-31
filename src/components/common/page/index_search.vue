<template>
  <van-pull-refresh v-model="pullingDown" @refresh="afterPullDown">
    <div class="_search">
      <div class="top_search" :style="{'padding-top': height+'px'}">
        <div class="search_return">
          <a @click="goBackFn">
            <img src="../../../assets/image/shape@3x.png" alt />
          </a>
        </div>
        <div class="search_input">
          <img src="../../../assets/image/sousuo@2x.png" alt />
          <input
            type="text"
            placeholder="搜索病员"
            v-model="list.keywords"
            v-focus="this.$route.query.focus"
          />
        </div>
        <div class="clinic_buttton" @click="inputNow">
          <button>搜索</button>
        </div>
        <div class="screening" @click="showPopup">
          <span>筛选</span>
          <img src="../../../assets/image/screening.png" alt />
        </div>
        <timeChoose :list="list"></timeChoose>
      </div>
      <clinicAll ref="all" :list="list" :style="{'padding-top': height+'px'}"></clinicAll>
    </div>
  </van-pull-refresh>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
import qs from "qs";
import { Dialog } from "vant";
import timeChoose from "../functionPage/timeChoose.vue";
import clinicAll from "../functionPage/clinicAll.vue";
export default {
  name: "index_search",
  data() {
    return {
      timer: undefined,
      list: {
        keywords: "", //搜索框的关键字value
        allNum: 0,
        clinicId: "",
        clinicAll: []
      },
      Time: {
        look: "",
        noLook: "",
        confirmStart: undefined,
        confirmOver: undefined,
        pushStart: undefined,
        pushOver: undefined,
        postState: undefined
      },
      pullingDown: false
    };
  },
  computed: {
    ...mapGetters(["showTime", "detail", "account"]),
    show: {
      get: function() {
        // console.log(this.$store)
        return this.$store.state.shop.show;
      },
      set: function(newValue) {
        this.$store.state.shop.show = newValue;
      }
    },
    showTime: {
      get: function() {
        // console.log(this.$store)
        return this.$store.state.shop.showTime;
      },
      set: function(newValue) {
        this.$store.state.shop.showTime = newValue;
      }
    }
  },
  components: {
    timeChoose,
    clinicAll
  },
  beforeDestory() {
    debugger;
  },
  destroyed() {
    debugger;
  },
  created() {
    var heightRexg = /^[0-9]*/g;
    var topHeight = this.topHeight.match(heightRexg);
    this.height = parseInt(topHeight.join());
    console.log(this.height);
  },
  beforeRouteLeave(to, from, next) {
    debugger;
    this.scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;

    if (!to.query.time || !from.query.time || to.query.time < from.query.time) {
      debugger;
      if (this.$vnode && this.$vnode.data.keepAlive) {
        if (
          this.$vnode.parent &&
          this.$vnode.parent.componentInstance &&
          this.$vnode.parent.componentInstance.cache
        ) {
          if (this.$vnode.componentOptions) {
            var key =
              this.$vnode.key == null
                ? this.$vnode.componentOptions.Ctor.cid +
                  (this.$vnode.componentOptions.tag
                    ? `::${this.$vnode.componentOptions.tag}`
                    : "")
                : this.$vnode.key;
            var cache = this.$vnode.parent.componentInstance.cache;
            var keys = this.$vnode.parent.componentInstance.keys;
            if (cache[key]) {
              if (keys.length) {
                var index = keys.indexOf(key);
                if (index > -1) {
                  keys.splice(index, 1);
                }
              }
              delete cache[key];
            }
          }
        }
      }
      this.$destroy();
    }
    next();
  },
  //进入该页面时，用之前保存的滚动位置赋值
  beforeRouteEnter(to, from, next) {
     ;
    next(vm => {
      document.documentElement.scrollTop = document.body.scrollTop =
        vm.scrollTop;
    });
  },
  mounted() {
    if (window.plus) {
      //plus.navigator.setStatusBarBackground("#ffffff");
      plus.navigator.setStatusBarStyle("dark");
    }
    this.getdata();
  },
  methods: {
    afterPullDown() {
      //下拉刷新
      setTimeout(() => {
        this.pullingDown = false;
        this.initData();
      }, 500);
    },
    initData() {
      Object.assign(this.$data, this.$options.data());
      this.getNum();
    },
    //显示筛选弹窗
    showPopup() {
      this.show = true;
    },
    //获取数据
    getdata() {},
    //键盘输入值时触发
    inputNow(_keywordsCode) {
      //清除计时器
      if (this.timer) {
        clearTimeout(this.timer);
      }
      if (_keywordsCode) {
        this.timer = setTimeout(() => {
          this.$refs.all.search();
        }, 200);
      } else {
        // 输入框中的内容被删为空时触发，此时会清除之前展示的搜索结果
        this.$refs.all.search();
      }
    },
    goBackFn() {
      this.$router.back(-1);
    },
    ...mapActions([])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
._search {
  position: relative;
  width: 100%;
  /* height: 100%; */
  padding-top: 0.52rem;
  /* background-color: #F5F5F5; */
  background-color: #ffffff;
}
.top_search {
  height: 0.5rem;
  width: 100%;
  background-color: #ffffff;
  position: fixed;
  top: 0;
  /* margin-top: -.62rem; */
  z-index: 999;
}
.search_return {
  height: 0.5rem;
  width: 11.3%;
  float: left;
}
.search_return a {
  height: 0.5rem;
  width: 100%;
}
.search_return a img {
  width: 0.09rem;
  height: 0.16rem;
  margin: 0.17rem 0.18rem;
}
.search_input {
  float: left;
  width: 63%;
  position: relative;
}
.search_input input {
  background-color: #f5f5f5;
  height: 0.335rem;
  line-height: 0.3rem;
  width: 79%;
  margin: 0.082rem 0rem;
  border: none;
  border-radius: 25px;
  padding-left: 0.37rem;
}
.search_input img {
  height: 0.15rem;
  width: 0.15rem;
  z-index: 3;
  position: absolute;
  top: 0.18rem;
  left: 0.15rem;
}
.clinic_buttton {
  float: left;
  margin-top: 0.125rem;
  margin-left: -0.05rem;
}
.clinic_buttton button {
  color: #ffffff;
  background-color: #2b77ef;
  border-radius: 0.15rem;
  border: none;
  height: 0.28rem;
  width: 0.45rem;
  font-size: 0.12rem;
}
.screening {
  float: left;
  width: 12.7%;
  height: 0.5rem;
  line-height: 0.5rem;
  margin-left: 0.05rem;
}
.screening span {
  /* font-weight: bold; */
  margin-left: 0.05rem;
  font-size: 0.12rem;
  padding-top: 0.03rem;
  display: inline-block;
}
.screening img {
  height: 0.13rem;
  width: 0.12rem;
}
.search_content {
  margin: 0 0.12rem;
}
.search_content li {
  height: 1.01rem;
  margin-top: 0.12rem;
  background-color: #ffffff;
  position: relative;
  /* padding:.14rem .15rem; */
}
.search_content li p {
  position: absolute;
  bottom: 0;
  height: 0.5rem;
  width: 93%;
  line-height: 0.5rem;
  margin-left: 0.14rem;
  border-top: 1px solid #e5e5e5;
}
.content_left {
  float: left;
  height: 0.5rem;
  margin-top: 0.14rem;
  margin-left: 0.15rem;
}
.content_right {
  float: right;
  height: 0.5rem;
  margin-right: 0.14rem;
  margin-top: 0.15rem;
}
.content_right img {
  width: 0.11rem;
  height: 0.11rem;
  margin-right: 0.04rem;
}
>>> [data-v-6bfd94e2] .van-pull-refresh {
  overflow: visible !important;
  -webkit-user-select: none;
  user-select: none;
}

#indexLabel {
  width: 85.5%;
  padding: 0.32rem 0.2rem 0.25rem 0.2rem;
  position: relative;
}
.labelLabel {
  height: 0.95rem;
}
.labelLabel:first-child {
  height: 0.95rem;
  border-bottom: 1px dotted rgba(0, 0, 0, 0.4);
}
.labelLabel strong {
  display: block;
}
.rightLine {
  margin-right: 0.25rem;
}
.rightLine:after {
  content: " ";
  position: absolute;
  height: 0.01rem;
  width: 0.15rem;
  bottom: 0;
  top: 50%;
  left: 107%;
  background-color: #999999;
}
.labelLabel button {
  height: 0.3rem;
  width: 1.05rem;
  margin-top: 0.1rem;
  border-radius: 0.15rem;
  border: none;
  background: #eeeeee;
  text-align: center;
  position: relative;
}
.labelLabel:first-child button:last-child {
  margin-left: 0.2rem;
}
.LabelResult {
  position: fixed;
  bottom: 0.25rem;
  right: 0.2rem;
}
.LabelResult button:first-child {
  border: none;
  height: 0.3rem;
  text-align: center;
  width: 0.8rem;
  border-radius: 100px 0px 0px 100px;
  background-color: #1ecac6;
}
.LabelResult button:last-child {
  border: none;
  height: 0.3rem;
  text-align: center;
  width: 0.8rem;
  border-radius: 0px 100px 100px 0px;
  background-color: #ff951b;
}
</style>
