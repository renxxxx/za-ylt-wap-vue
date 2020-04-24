<template>
    <div id="topSlot" ref="SlotNav">
        <slot name="returnTopSolt">
        </slot>
        <div class="returnTop" @click="returnTopFn" ref="returnTopRef" v-show="outpatientReturnTopPage">
            <img src="../../../assets/image/returnTop.png" alt />
            <span>顶部</span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'index',
    data () {
        return {

        }
    },
    created(){
    },
    watch:{
        $route(to,from){
            // console.log(to.path);
            window.removeEventListener("scroll", this.handleScroll, true);
        }
    },
    destroyed(){
    },
    mounted(){
        // console.log(document.getElementById("topSlot").getBoundingClientRect().height)
    },
    activated(){
        window.addEventListener("scroll", this.handleScroll, true);
		if(this.query != JSON.stringify(this.$route.query)){
			this.query = JSON.stringify(this.$route.query);
			if(window.plus){
				//plus.navigator.setStatusBarBackground("#ffffff");
				plus.navigator.setStatusBarStyle("dark")
			}
		}
    },
    computed:{
        outpatientReturnTopPage: {
            get: function() {
                // 
                return this.$store.state.outpatientReturnTopPage;
            },
            set: function(newValue) {
                this.$store.state.outpatientReturnTopPage = newValue;
           } 
        },
    },
    components:{},
    methods:{
        // 滑动一定距离出现返回顶部按钮
        handleScroll() {
            // console.log(document.getElementById("topSlot").getBoundingClientRect().height)
            // if(!this.$refs.SlotNav)
            //     return
            let scrollTop =
                this.$refs.SlotNav.scrollTop ||
                this.$refs.SlotNav.pageYOffset;
            let windowHeight =
                document.documentElement.clientHeight || this.$refs.SlotNav.clientHeight;
            let data =
                this.$refs.SlotNav.scrollHeight >
                (window.innerHeight || document.documentElement.clientHeight);
            let opacityValue =
                Math.round(
                ((scrollTop + windowHeight) / this.$refs.SlotNav.scrollHeight) * 100
                ) / 100;
            // 
            console.log(this.$refs.SlotNav.scrollTop);
            console.log(scrollTop)
            if (data && scrollTop > 800) {
                this.outpatientReturnTopPage = true;
                this.$refs.returnTopRef.style.opacity = 1;
                document.getElementById("returnHomePageId").style.bottom = '1.5rem';
            } else {
                debugger
                this.$refs.returnTopRef.style.opacity = 0;
                document.getElementById("returnHomePageId").style.bottom = '1rem';
                this.outpatientReturnTopPage = false;
            }
        },
        returnTopFn() {
            var scrollTop =
                this.$refs.SlotNav.scrollTop ||
                this.$refs.SlotNav.scrollTop ||
                this.$refs.SlotNav.pageYOffset;
            let windowHeight =
                document.documentElement.clientHeight || this.$refs.SlotNav.clientHeight;
            for (let i = 0; i < (scrollTop + windowHeight); i++) {
                var clearReturn = setTimeout(() => {
                this.$refs.SlotNav.scrollTop--;
                window.pageYOffset--;
                this.$refs.SlotNav.scroll--;
                document.documentElement.scrollTop--;
                }, 5);
            }
            document.getElementById("returnHomePageId").style.bottom = '.6rem';
            this.$refs.returnTopRef.style.opacity = 0;
            this.outpatientReturnTopPage = false;
        },

    },
}
</script>>


<style scoped>
#topSlot{
    height:100%;
    width :100%;
    touch-action: pan-y;
	-webkit-overflow-scrolling: touch;
    overflow: scroll;
    overflow-x: hidden;
     /* position: fixed; */
}
</style>