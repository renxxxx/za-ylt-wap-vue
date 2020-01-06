<template>
  <van-pull-refresh v-model="pullingDown" @refresh="afterPullDown">
    <div class="hospital">
      <div class="navWarp" :style="{'padding-top': height+'px'}">
        <div class="navTitle">
          <span>—&nbsp;&nbsp;医院端&nbsp;&nbsp;—</span>
        </div>
        <div class="slider">
          <van-swipe>
            <van-swipe-item v-for="(image, index) in images" :key="index">
              <router-link :to="{name : image.url}">
                <img v-lazy="image.cover" class="silder_img" />
              </router-link>
            </van-swipe-item>
          </van-swipe>
        </div>
      </div>
      <div class="typeList">
        <ul>
          <li>
            <router-link :to="{name : 'hospital_indexSearch',query:{time:new Date().getTime()}}">
              <img src="../../assets/image/qudaomenzhen@2x.png" alt />
              <span>渠道门诊</span>
            </router-link>
          </li>
          <li>
            <router-link
              :to="{name : 'hospital_sourceManagement',query:{time:new Date().getTime()}}"
            >
              <img src="../../assets/image/bingyuanguanli@2x.png" alt />
              <span>病员管理</span>
            </router-link>
          </li>
          <li>
            <router-link :to="{name : 'hospital_collect',query:{time:new Date().getTime()}}">
              <img src="../../assets/image/qixiejicai@2x.png" alt />
              <span>器械集采</span>
            </router-link>
          </li>
          <li @click="noLinkFn">
            <router-link :to="{name : '',query:{time:new Date().getTime()}}">
              <img src="../../assets/image/yunyingzhongxin@2x.png" alt />
              <span>运营中心</span>
            </router-link>
          </li>
          <li @click="noLinkFn">
            <router-link :to="{name : '',query:{time:new Date().getTime()}}">
              <img src="../../assets/image/jiyinjiance@2x.png" alt />
              <span>基因检测</span>
            </router-link>
          </li>
          <li @click="noLinkFn">
            <router-link :to="{name : '',query:{time:new Date().getTime()}}">
              <img src="../../assets/image/yiliaoziyuan@2x.png" alt />
              <span>医疗资源</span>
            </router-link>
          </li>
          <li>
            <router-link :to="{name : 'hospital_activityReleased',query:{time:new Date().getTime()}}">
              <img src="../../assets/image/yiyuanhuodong@2x.png" alt />
              <span>医院活动</span>
            </router-link>
          </li>
          <li @click="noLinkFn">
            <router-link :to="{name : '',query:{time:new Date().getTime()}}">
              <img src="../../assets/image/qita@2x.png" alt />
              <span>其他项目</span>
            </router-link>
          </li>
        </ul>
      </div>

      <div class="article">
        <div class="articleTitle">
          <img src="../../assets/image/Combined Shape@2x.png" alt />
          <h3>运营精选</h3>
        </div>
        <ul :model="article">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @check="onLoad">
            <li v-for="(items,inx) in article" :key="inx">
              <router-link
                :to="{name : 'hospital_caseDetails' ,query : {itemId : items.itemId,data: 1,time:new Date().getTime()}}"
              >
                <div class="article_left">
                  <p>{{items.content}}</p>
                  <div class="article_leftTime">
                    <img src="../../assets/image/time@2x.png" alt />
                    <span>{{moment(items.time).format('YYYY-MM-DD HH:mm')}}</span>
                  </div>
                </div>
                <div class="article_right">
                  <img :src="items.img" alt />
                </div>
              </router-link>
            </li>
          </van-list>
        </ul>
      </div>
      <bottomNav></bottomNav>
    </div>
  </van-pull-refresh>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
import qs from "qs";
import { Dialog } from "vant";
import bottomNav from "./functionPage/bottomNav.vue";
// import moment from 'moment'
export default {
  name: "gene",
  data() {
    return {
      images: [],
      article: [],
      loading: false,
      finished: false,
      page: 1,
      pullingDown: false
    };
  },
  components: {
    bottomNav
  },
  computed: {
    ...mapGetters(["account", "isLogin"])
  },
  created() {
    //debugger;
    var heightRexg = /^[0-9]*/g;
    var topHeight = this.topHeight.match(heightRexg);
    this.height = parseInt(topHeight.join());
    console.log(this.height);
  },
  destroyed() {
    //debugger;
    console.log("destroyed");
  },
  beforeRouteLeave(to, from, next) {
    //debugger;
	this.scrollTop =document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
	if(!to.query.time || !from.query.time || to.query.time < from.query.time){
		 debugger
            if (this.$vnode && this.$vnode.data.keepAlive)
            {
                if (this.$vnode.parent && this.$vnode.parent.componentInstance && this.$vnode.parent.componentInstance.cache)
                {
                    if (this.$vnode.componentOptions)
                    {
                        var key = this.$vnode.key == null
                                    ? this.$vnode.componentOptions.Ctor.cid + (this.$vnode.componentOptions.tag ? `::${this.$vnode.componentOptions.tag}` : '')
                                    : this.$vnode.key;
                        var cache = this.$vnode.parent.componentInstance.cache;
                        var keys  = this.$vnode.parent.componentInstance.keys;
                        if (cache[key])
                        {
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
	  document.documentElement.scrollTop=document.body.scrollTop = vm.scrollTop;
	});
	
  },
  mounted() {
    //debugger;
    
    if (window.plus) {
      //plus.navigator.setStatusBarBackground("#ffffff");
      plus.navigator.setStatusBarStyle("dark");
    }
    this.initData();
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
      //轮播图图片路径请求
      this.$axios
        .get("/hospital/hospital-ads")
        .then(res => {
          for (let i in res.data.data.rows) {
            // console.log(res.data.data.rows[i])
            res.data.codeMsg ? this.$toast.fail(res.data.codeMsg) : "";
            switch (res.data.data.rows[i].type) {
              case 0:
                this.images.push({
                  cover: res.data.data.rows[i].cover,
                  url: ""
                });
                break;
              case 1:
                this.images.push({
                  cover: res.data.data.rows[i].cover,
                  url: res.data.data.rows[i].type1Url
                });
                break;
              case 2:
                this.images.push({
                  cover: res.data.data.rows[i].cover,
                  url: "caseDeatail"
                });
                break;
              case 3:
                this.images.push({
                  cover: res.data.data.rows[i].cover,
                  url: ""
                });
                break;
              case 4:
                this.images.push({
                  cover: res.data.data.rows[i].cover,
                  url: ""
                });
                break;
              case 5:
                this.images.push({
                  cover: res.data.data.rows[i].cover,
                  url: ""
                });
                break;
              case 6:
                this.images.push({
                  cover: res.data.data.rows[i].cover,
                  url: "hospitalImage"
                });
                break;
              case 7:
                this.images.push({
                  cover: res.data.data.rows[i].cover,
                  url: "hospital_expertsIntroduction"
                });
                break;
              case 8:
                this.images.push({
                  cover: res.data.data.rows[i].cover,
                  url: ""
                });
                break;
            }
          }
          // console.log(this.images.cover)
        })
        .catch(err => {
          // console.log(err);
          // Dialog({ message: '加载失败!' });
        });
      //文章请求
      this.getdata();
    },
    getdata(_data) {
      this.$axios
        .post(
          "/c2/article/items",
          qs.stringify({
            hospitalId: this.account.hospitalId,
            pn: this.page,
            ps: 10
          })
        )
        .then(res => {
          if (res.data.data.items.length != 0) {
            for (let i in res.data.data.items) {
              // console.log(res.data.data.items[i])
              if (res.data.data.items[i]) {
                this.article.push({
                  content: res.data.data.items[i].title,
                  img: res.data.data.items[i].cover,
                  time: res.data.data.items[i].alterTime,
                  itemId: res.data.data.items[i].itemId
                });
              } else {
                // this.$notify({
                // 	message: '数据已全部加载',
                // 	duration: 1000,
                // 	background:'#79abf9',
                // })
              }
            }
            this.loading = false;
          } else {
            // this.$notify({
            // 	message: '数据已全部加载',
            // 	duration: 1000,
            // 	background:'#79abf9',
            // })
            this.loading = false;
            this.finished = true;
          }
        })
        .catch(err => {
          console.log(err);
          //Dialog({ message: '加载失败!'});
        });
    },
    onLoad() {
      this.getdata();
    },
    noLinkFn() {
      this.$toast.setDefaultOptions({ duration: 1000 });
      this.$toast.fail("暂未开通");
    }
  }
};
</script>

<style scoped>
.hospital {
  height: 100%;
  width: 100%;
}
.navWarp {
  height: 2.26rem;
  width: 100%;
  background: url("../../assets/image/88-1.png") no-repeat;
  background-size: 100% 1.8rem;
  /* background: linear-gradient(#2B77EF,#2B77EF,  #FFFFFF); */
  background-color: #ffffff;
  padding-top: 0.12rem;
}
.navTitle {
  /* width: .88rem; */
  height: 0.25rem;
  line-height: 0.25rem;
  color: #686666;
  font-size: 0.14rem;
  /* font-weight: bolder; */
  text-align: center;
  margin: 0 auto;
}
.slider {
  width: 95.7%;
  height: 1.96rem;
  margin: 0rem auto;
  margin-top: 0.05rem;
  /* background-color: red; */
}
.slider a {
  width: 100%;
  height: 1.96rem;
  display: block;
}
>>> .van-swipe {
  position: relative;
  overflow: hidden;
  -webkit-user-select: none;
  user-select: none;
  /* box-shadow: darkgrey 0rem 0rem  .10rem 3px; */
  height: 100%;
}
>>> .van-swipe__indicators {
  position: absolute;
  bottom: 29px;
  left: 50%;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
}
.silder_img {
  width: 95.5%;
  height: 1.8rem;
  margin: 0rem 2.25%;
  /* box-shadow:0px 0px 30px 5px hsla(0, 0%, 0%, 10%); */
  box-shadow: hsla(0, 0%, 0%, 50%) 0rem 0rem 0.1rem 0rem;
  object-fit: cover;
}
.typeList {
  width: 100%;
  height: 1.7rem;
  margin-top: 0.12rem;
  margin-bottom: 0.15rem;
}
.typeList ul {
  width: 89.93%;
  height: 1.75rem;
  margin: 0rem auto;
  text-align: center;
}
.typeList ul li {
  float: left;
  width: 25%;
}
.typeList ul li:nth-child(5),
li:nth-child(6),
li:nth-child(7),
li:nth-child(8) {
  margin-top: 0.25rem;
}
.typeList ul li a img {
  width: 0.3rem;
  margin: 0rem auto;
  display: block;
}
.typeList ul li span {
  display: block;
  margin-top: -0.15rem;
}
.article {
  width: 91.5%;
  margin: 0rem auto;
  border-top: 1px solid #e5e5e5;
}
.articleTitle {
  height: 100%;
  width: 100%;
  margin-top: 0.2rem;
}
.articleTitle img {
  float: left;
  width: 0.18rem;
  height: 0.21rem;
  margin-right: 0.12rem;
}
.articleTitle h3 {
  font-weight: bolder;
  font-size: 0.16rem;
}
.article ul {
  margin-top: 0.2rem;
  width: 100%;
}
.article ul li {
  width: 100%;
  height: 0.97rem;
  border-bottom: 1px solid #d8d8d8;
  margin: 0.12rem 0;
}
.article ul li:last-child {
  border: none;
}
.article_left {
  float: left;
  width: 60.1%;
}
.article_left p {
  font-size: 0.14rem;
  font-weight: bold;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  height: 0.42rem;
}
.article_leftTime {
  margin-top: 0.23rem;
  height: 0.16rem;
  line-height: 0.16rem;
  position: relative;
}
.article_leftTime img {
  position: absolute;
  top: 0.02rem;
  width: 0.11rem;
  height: 0.11rem;
}
.article_leftTime span {
  margin-left: 0.17rem;
}
.article_right {
  float: left;
  margin-left: 7.8%;
  width: 32.1%;
}
.article_right img {
  width: 1.08rem;
  height: 0.85rem;
  object-fit: cover;
}
</style>
